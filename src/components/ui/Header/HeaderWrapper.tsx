'use client';
import { usePathname } from 'next/navigation';
import ResponsiveHeader from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();
  // ルート ("/") はログイン画面なので、ヘッダーは表示しない
  if (pathname === '/') return null;
  return <ResponsiveHeader />;
}
