import { SignOutButton } from './SignOutButton';

type AuthHeaderProps = {
  email: string | undefined;
};

export function AuthHeader({ email }: AuthHeaderProps) {
  return (
    <header className="w-full flex items-center justify-end gap-3 py-2 px-4 text-sm">
      {email && (
        <span className="text-[var(--text-muted)] truncate max-w-[200px]">
          {email}
        </span>
      )}
      <SignOutButton />
    </header>
  );
}
