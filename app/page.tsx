import { cookies } from 'next/headers';
import Link from 'next/link';

export default function Home() {
  // Keep a minimal landing that is effectively not used; protected routes will redirect anyway
  return (
    <div className="p-6 text-sm text-muted-foreground">
      <p>
        Go to <Link className="underline" href="/login">Login</Link> or <Link className="underline" href="/signup">Signup</Link>.
      </p>
    </div>
  );
}
