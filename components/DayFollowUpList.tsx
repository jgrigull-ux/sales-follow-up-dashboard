'use client';

import { useEffect, useMemo, useState } from 'react';
import { CallCard, type Call } from '@/components/CallCard';

type Props = {
  date: string;
  calls: Call[];
};

function getStorageKey(date: string): string {
  return `follow-up-status:${date}`;
}

function getCallId(call: Call, index: number): string {
  return `${call.email}|${call.start}|${call.eventTitle}|${index}`;
}

function readStoredStatus(date: string): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(getStorageKey(date));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const statusById: Record<string, boolean> = {};
    for (const [id, value] of Object.entries(parsed)) {
      statusById[id] = value === true;
    }
    return statusById;
  } catch {
    return {};
  }
}

export function DayFollowUpList({ date, calls }: Props) {
  const callIds = useMemo(() => calls.map((call, i) => getCallId(call, i)), [calls]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [completedById, setCompletedById] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = readStoredStatus(date);
    const next: Record<string, boolean> = {};
    for (const id of callIds) {
      if (stored[id]) next[id] = true;
    }
    setCompletedById(next);
    setIsHydrated(true);
  }, [date, callIds]);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(getStorageKey(date), JSON.stringify(completedById));
  }, [date, completedById, isHydrated]);

  const completedCount = callIds.reduce((count, id) => (completedById[id] ? count + 1 : count), 0);
  const totalCount = calls.length;

  const toggleFollowUp = (id: string) => {
    setCompletedById((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 mb-6">
        <p className="text-sm text-[var(--text-muted)]">Daily progress</p>
        <p className="text-lg font-semibold text-[var(--text)]">
          {completedCount}/{totalCount} follow-ups completed
        </p>
      </div>

      <ul className="space-y-6 list-none p-0 m-0">
        {calls.map((call, i) => {
          const id = getCallId(call, i);
          const isCompleted = Boolean(completedById[id]);
          return (
            <li key={`${call.email}-${call.start}-${i}`}>
              <CallCard
                call={call}
                isFollowUpCompleted={isCompleted}
                onToggleFollowUpCompleted={() => toggleFollowUp(id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
