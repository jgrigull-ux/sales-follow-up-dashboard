'use client';

import Link from 'next/link';
import type { DayWithPending } from '@/lib/data';

type Props = {
  daysWithPending: DayWithPending[];
};

function formatDateLabel(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
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

export function PendingFollowUpTab({ daysWithPending }: Props) {
  if (daysWithPending.length === 0) {
    return (
      <p className="text-[var(--text-muted)] text-center py-8">
        No pending follow-ups. All follow-ups are marked complete.
      </p>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <p className="text-[var(--text-muted)] text-sm">
        Days with at least one follow-up not marked complete. Open a day to mark them done.
      </p>
      {daysWithPending.map(({ date, pendingCalls }) => (
        <section
          key={date}
          className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-[var(--shadow)]"
        >
          <Link
            href={`/day/${date}`}
            className="block px-5 py-4 hover:bg-[var(--bg)]/50 transition-colors border-b border-[var(--border)]"
          >
            <h2 className="text-lg font-semibold text-[var(--text)]">
              {formatDateLabel(date)}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              {pendingCalls.length} pending follow-up{pendingCalls.length !== 1 ? 's' : ''}
            </p>
          </Link>
          <ul className="divide-y divide-[var(--border)]">
            {pendingCalls.map((call, i) => (
              <li key={`${call.email}-${call.start}-${i}`}>
                <Link
                  href={`/day/${date}`}
                  className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 hover:bg-[var(--bg)]/50 transition-colors text-left"
                >
                  <span className="font-medium text-[var(--text)]">
                    {call.eventTitle}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    {formatTime(call.start)}
                    {call.displayName ? ` · ${call.displayName}` : ` · ${call.email}`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
