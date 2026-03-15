import ReactMarkdown from 'react-markdown';

export type Call = {
  email: string;
  displayName?: string;
  eventTitle: string;
  start: string;
  end?: string | null;
  summary: string;
};

type CallCardProps = {
  call: Call;
  isFollowUpCompleted?: boolean;
  onToggleFollowUpCompleted?: () => void;
};

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  } catch {
    return iso;
  }
}

/** Replace Links section labels with favicon + shortened text so markdown renders icon inline. */
function preprocessSummaryForFavicons(summary: string): string {
  return summary
    .replace(/\*\*Salesforce Account:\*\*/g, '![Salesforce](/favicons/salesforce.png) **Account:**')
    .replace(/\*\*Gong Call:\*\*/g, '![Gong](/favicons/gong.png) **Call:**')
    .replace(/\*\*Any Usage \(last 30 days\):\*\*/g, '![Cursor](/favicons/cursor.png) **Usage (last 30 days):**')
    .replace(/\*\*Any Usage:\*\*/g, '![Cursor](/favicons/cursor.png) **Usage:**');
}

export function CallCard({
  call,
  isFollowUpCompleted = false,
  onToggleFollowUpCompleted,
}: CallCardProps) {
  const hasSummary = call.summary && call.summary.trim().length > 0;

  return (
    <article
      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]"
      style={{ boxShadow: 'var(--shadow)' }}
    >
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {call.eventTitle}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {formatTime(call.start)}
            {call.end ? ` – ${formatTime(call.end)}` : ''}
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {call.displayName ? `${call.displayName} · ${call.email}` : call.email}
          </p>
        </div>
        {onToggleFollowUpCompleted && (
          <button
            type="button"
            onClick={onToggleFollowUpCompleted}
            aria-pressed={isFollowUpCompleted}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              isFollowUpCompleted
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text)] hover:border-[var(--accent)]'
            }`}
          >
            {isFollowUpCompleted ? 'Follow-up completed' : 'Follow-up pending'}
          </button>
        )}
      </header>

      {hasSummary ? (
        <div className="markdown-body relative z-0">
          <ReactMarkdown
            urlTransform={(url) => {
              if (!url || typeof url !== 'string') return undefined;
              const trimmed = url.trim();
              if (/^https?:\/\//i.test(trimmed)) return trimmed;
              if (trimmed.startsWith('/')) return trimmed;
              return undefined;
            }}
            components={{
              a: ({ href, children, ...props }) => {
                const safeHref = href && typeof href === 'string' && href.startsWith('http') ? href : undefined;
                if (!safeHref) {
                  return <span className="markdown-link-inactive">{children}</span>;
                }
                return (
                  <a
                    {...props}
                    href={safeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="markdown-link"
                  >
                    {children}
                  </a>
                );
              },
              img: ({ src, alt, ...props }) => {
                const isFavicon = src?.includes('/favicons/');
                return (
                  <img
                    {...props}
                    src={src}
                    alt={alt ?? ''}
                    className={isFavicon ? 'markdown-favicon' : undefined}
                  />
                );
              },
            }}
          >
            {preprocessSummaryForFavicons(call.summary)}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="text-sm text-[var(--text-muted)] italic">
          No follow-up summary yet. Run “Post call follow up for {call.email}” in Cursor and add the result to the day’s data.
        </p>
      )}
    </article>
  );
}
