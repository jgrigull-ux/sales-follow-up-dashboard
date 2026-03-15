import { HomeTabsWithStorage } from '@/components/HomeTabs';
import { getAvailableDates } from '@/lib/dates';
import { getDayData } from '@/lib/data';

export default async function HomePage() {
  const dates = await getAvailableDates();
  const allDaysData = await Promise.all(
    dates.map(async (date) => ({
      date,
      calls: (await getDayData(date))?.calls ?? [],
    }))
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-semibold text-[var(--text)] mb-8">
        Sales Follow-Up
      </h1>
      <HomeTabsWithStorage allDaysData={allDaysData} />
    </main>
  );
}
