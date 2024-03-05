'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  );
}
