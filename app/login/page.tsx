'use client';

import { createClient } from '@/lib/supabase-browser';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');

  const handleSignIn = useCallback(async () => {
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
      },
    });
    if (signInError) {
      console.error(signInError);
      return;
    }
    router.refresh();
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 max-w-sm w-full text-center shadow-[var(--shadow)]">
        <h1 className="text-2xl font-semibold text-[var(--text)] mb-2">
          Sales Follow-Up
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-6">
          Sign in with your @anysphere.co account to continue.
        </p>
        {error === 'access_denied' && (
          <p className="text-amber-400 text-sm mb-4">
            Only @anysphere.co email addresses can access this app.
          </p>
        )}
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full py-3 px-4 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Loading…</p>
      </main>
    }>
      <LoginContent />
    </Suspense>
  );
}
