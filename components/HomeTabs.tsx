'use client';

import { useEffect, useState } from 'react';
import { DayDropdown } from '@/components/DayDropdown';
import { FollowUpSearch } from '@/components/FollowUpSearch';
import { PendingFollowUpTab } from '@/components/PendingFollowUpTab';
import type { Call } from '@/components/CallCard';
import type { DayWithPending } from '@/lib/data';
import { getCallId, readStoredStatus } from '@/lib/followUpStorage';

type TabId = 'day-view' | 'pending';

type HomeTabsProps = {
  dates: string[];
  daysWithPending: DayWithPending[];
  completeDates?: string[];
};

type AllDaysData = { date: string; calls: Call[] }[];

type HomeTabsWithStorageProps = {
  allDaysData: AllDaysData;
};

function computeFromStorage(allDaysData: AllDaysData): {
  dates: string[];
  completeDates: string[];
  daysWithPending: DayWithPending[];
} {
  const dates = allDaysData.map((d) => d.date);
  const completeDates: string[] = [];
  const daysWithPending: DayWithPending[] = [];

  for (const { date, calls } of allDaysData) {
    if (calls.length === 0) continue;
    const stored = readStoredStatus(date);
    const pendingCalls = calls.filter((call, i) => !stored[getCallId(call, i)]);
    if (pendingCalls.length === 0) {
      completeDates.push(date);
    } else {
      daysWithPending.push({ date, pendingCalls });
    }
  }

  return { dates, completeDates, daysWithPending };
}

export function HomeTabsWithStorage({ allDaysData }: HomeTabsWithStorageProps) {
  const [dates, setDates] = useState<string[]>(() => allDaysData.map((d) => d.date));
  const [completeDates, setCompleteDates] = useState<string[]>([]);
  const [daysWithPending, setDaysWithPending] = useState<DayWithPending[]>([]);

  useEffect(() => {
    const { dates: d, completeDates: c, daysWithPending: p } = computeFromStorage(allDaysData);
    setDates(d);
    setCompleteDates(c);
    setDaysWithPending(p);
  }, [allDaysData]);

  return (
    <FollowUpSearch allDaysData={allDaysData}>
      <HomeTabs
        dates={dates}
        daysWithPending={daysWithPending}
        completeDates={completeDates}
      />
    </FollowUpSearch>
  );
}

export function HomeTabs({ dates, daysWithPending, completeDates = [] }: HomeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('day-view');

  return (
    <div className="w-full max-w-2xl">
      <div
        className="flex rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 mb-8"
        role="tablist"
        aria-label="Main navigation"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'day-view'}
          onClick={() => setActiveTab('day-view')}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'day-view'
              ? 'bg-[var(--bg)] text-[var(--text)] shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Week day view
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pending'}
          onClick={() => setActiveTab('pending')}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'pending'
              ? 'bg-[var(--bg)] text-[var(--text)] shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Pending follow-up
          {daysWithPending.length > 0 && (
            <span className="ml-1.5 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
              {daysWithPending.reduce((n, d) => n + d.pendingCalls.length, 0)}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'day-view' && (
        <div className="flex flex-col items-center">
          <p className="text-[var(--text-muted)] mb-6">
            Pick a day to see call summaries and follow-up resources.
          </p>
          <DayDropdown dates={dates} completeDates={completeDates} />
        </div>
      )}

      {activeTab === 'pending' && (
        <PendingFollowUpTab daysWithPending={daysWithPending} />
      )}
    </div>
  );
}
