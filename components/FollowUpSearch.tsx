'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Call } from '@/components/CallCard';
import { getCallId, getStorageKey, readStoredStatus } from '@/lib/followUpStorage';

type SearchItem = { date: string; call: Call; index: number };

type Props = {
  allDaysData: { date: string; calls: Call[] }[];
  children: React.ReactNode;
};

function formatDateLabel(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  } catch {
    return iso;
  }
}

function matchesQuery(call: Call, q: string): boolean {
  if (!q || !q.trim()) return true;
  const lower = q.trim().toLowerCase();
  const fields = [
    call.eventTitle,
    call.email,
    call.displayName ?? '',
    call.summary ?? '',
  ].filter(Boolean);
  return fields.some((f) => f.toLowerCase().includes(lower));
}

export function FollowUpSearch({ allDaysData, children }: Props) {
  const [query, setQuery] = useState('');
  const [pendingOnly, setPendingOnly] = useState(false);
  const [toggleVersion, setToggleVersion] = useState(0);

  const flattened = useMemo(() => {
    return allDaysData.flatMap(({ date, calls }) =>
      calls.map((call, index) => ({ date, call, index }))
    );
  }, [allDaysData]);

  const results = useMemo(() => {
    let items: SearchItem[] = flattened.filter(({ call }) => matchesQuery(call, query));
    if (pendingOnly && typeof window !== 'undefined') {
      const byDate = new Map<string, Record<string, boolean>>();
      items = items.filter(({ date, call, index }) => {
        if (!byDate.has(date)) {
          byDate.set(date, readStoredStatus(date));
        }
        const stored = byDate.get(date)!;
        const id = getCallId(call, index);
        return !stored[id];
      });
    }
    return items;
  }, [flattened, query, pendingOnly, toggleVersion]);

  const hasQuery = query.trim().length > 0;

  const handleToggle = (date: string, call: Call, index: number) => {
    const id = getCallId(call, index);
    const stored = readStoredStatus(date);
    const next = { ...stored, [id]: !stored[id] };
    window.localStorage.setItem(getStorageKey(date), JSON.stringify(next));
    setToggleVersion((v) => v + 1);
  };

  const getCompleted = (date: string, call: Call, index: number): boolean => {
    if (typeof window === 'undefined') return false;
    return Boolean(readStoredStatus(date)[getCallId(call, index)]);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="flex-1 min-w-0">
          <span className="sr-only">Search tasks</span>
          <input
            type="search"
            placeholder="Search tasks by title, contact, or summary…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Search tasks"
          />
        </label>
        <label
          className="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:outline-none"
        >
          <input
            type="checkbox"
            checked={pendingOnly}
            onChange={(e) => setPendingOnly(e.target.checked)}
            className="h-4 w-4 shrink-0 rounded border-[var(--border)] bg-[var(--bg)] accent-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-0"
          />
          Pending only
        </label>
      </div>

      {hasQuery ? (
        <section aria-label="Search results">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
            Search results ({results.length})
          </h2>
          {results.length === 0 ? (
            <p className="text-[var(--text-muted)] py-6 text-center">
              No tasks match your search.
            </p>
          ) : (
            <ul className="space-y-4 list-none p-0 m-0">
              {results.map(({ date, call, index }) => {
                const isCompleted = getCompleted(date, call, index);
                return (
                  <li
                    key={`${date}-${call.email}-${call.start}-${index}`}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[var(--text-muted)]">
                          {formatDateLabel(date)}
                        </p>
                        <h3 className="text-lg font-semibold text-[var(--text)] mt-0.5">
                          {call.eventTitle}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] mt-1">
                          {formatTime(call.start)}
                          {call.displayName ? ` · ${call.displayName}` : ` · ${call.email}`}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggle(date, call, index)}
                          aria-pressed={isCompleted}
                          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                            isCompleted
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text)] hover:border-[var(--accent)]'
                          }`}
                        >
                          {isCompleted ? 'Follow-up completed' : 'Follow-up pending'}
                        </button>
                        <Link
                          href={`/day/${date}`}
                          className="text-sm font-medium text-[var(--accent)] hover:underline"
                        >
                          Open day
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ) : (
        children
      )}
    </div>
  );
}
