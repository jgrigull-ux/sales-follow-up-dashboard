import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import { AuthHeader } from '@/components/AuthHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sales Follow-Up',
  description: 'Follow-up resources for your calls',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | undefined;
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userEmail = user?.email ?? undefined;
  } catch {
    userEmail = undefined;
  }

  return (
    <html lang="en">
      <body>
        {userEmail && <AuthHeader email={userEmail} />}
        {children}
      </body>
    </html>
  );
}
