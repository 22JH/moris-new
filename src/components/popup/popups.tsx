'use client';

import { usePopupStore } from '@/src/lib/stores/popup/PopupStoreProvider';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Popups() {
  const { popups, clearPopupExcept } = usePopupStore((state) => state);
  const pathname = usePathname();
  useEffect(() => {
    return () => clearPopupExcept();
  }, [pathname]);
  return (
    <>
      {popups.map(({ Component, props }) => (
        <div id={`popup-${Component.name}`} key={Component.name}>
          <Component {...props} />
        </div>
      ))}
    </>
  );
}
