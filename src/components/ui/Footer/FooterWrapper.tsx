'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  // ルート ("/") はログイン画面なので、フッターは表示しない
  if (pathname === '/') return null;
  return <Footer />;
}
