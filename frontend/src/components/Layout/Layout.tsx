import { AdminBar } from '@cloakwp/react';
import { Footer, Header } from '@/components/Layout';
import { cx } from '@/lib/utils/cva';
import { fontSans, fontMono } from '@/lib/utils/fonts';

export function Layout({ children }) {
  return (
    <div
      className={cx(
        'flex min-h-screen flex-col font-sans antialiased',
        fontSans.variable,
        fontMono.variable
      )}
    >
      <AdminBar />
      <Header />
      <main className="min-h-[300px] w-full max-w-none overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
