'use client';

import { useState, useCallback } from 'react';
import { DayFollowUpList } from '@/components/DayFollowUpList';
import type { Call } from '@/components/CallCard';

type Props = {
  date: string;
  dateTitle: string;
  calls: Call[];
};

export function DayViewContent({ date, dateTitle, calls }: Props) {
  const [allButtonsComplete, setAllButtonsComplete] = useState(false);
  const handleAllCompleteChange = useCallback((value: boolean) => {
    setAllButtonsComplete(value);
  }, []);

  return (
    <>
      {allButtonsComplete ? (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/20 dark:border-emerald-400/30 px-5 py-4 mb-6">
          <p className="text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-2">
            <span aria-hidden>🎉</span>
            All follow-ups completed!
          </p>
        </div>
      ) : null}
      <h1
        className={`text-2xl font-semibold mb-8 ${
          allButtonsComplete ? 'text-emerald-800 dark:text-emerald-200' : 'text-[var(--text)]'
        }`}
      >
        {dateTitle}
      </h1>
      <DayFollowUpList
        date={date}
        calls={calls}
        onAllCompleteChange={handleAllCompleteChange}
      />
    </>
  );
}
