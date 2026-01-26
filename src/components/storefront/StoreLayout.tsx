import { ReactNode } from 'react';
import { StoreHeader } from './StoreHeader';
import { StoreFooter } from './StoreFooter';

interface StoreLayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

export function StoreLayout({ children, onSearch }: StoreLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader onSearch={onSearch} />
      <main className="flex-1">
        {children}
      </main>
      <StoreFooter />
    </div>
  );
}
