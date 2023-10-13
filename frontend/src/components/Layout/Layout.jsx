import classNames from '@/utils/classNames';
import { Footer, Header } from '@/components/Layout';
import { AdminBar } from 'cloakwp';

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminBar />
      <Header />
      <main
        className={classNames(
          'min-h-[300px] w-full max-w-none overflow-hidden'
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
