import { SessionProvider } from 'next-auth/react';
import Topbar from '../components/navbar/Topbar';
import Popups from '../components/popup/popups';
import { PopupStoreProvider } from '../lib/stores/popup/PopupStoreProvider';
import './globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.subset.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.subset.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.subset.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="max-w-maxSize mx-auto">
        <SessionProvider>
          <PopupStoreProvider>
            <Topbar />
            {children}
            <Popups />
          </PopupStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
