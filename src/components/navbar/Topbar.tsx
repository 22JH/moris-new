'use client';

import MenuIcon from '@/public/svg/menu.svg';
import { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import { menu } from '@/src/lib/constants/menu';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const [openLeftSidebar, setOpenLeftSidebar] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <nav className="md:h-desktopTopbar h-mobileTopbar relative border-b-[5px] border-b-[rgb(159,125,73)] px-6 flex flex-row items-center justify-end">
        {/* <button onClick={() => signOut()}>logout</button> */}
        <MenuIcon
          onClick={() => setOpenLeftSidebar((prev) => !prev)}
          className="md:hidden cursor-pointer"
        />
        <ul className="gap-4 hidden md:flex md:items-center md:justify-center h-full">
          <div>CART</div>
          <div>LOGIN</div>
        </ul>
        <section
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          onClick={() => router.push('/')}
        >
          아이콘
        </section>
      </nav>
      {openLeftSidebar && (
        <LeftSidebar setOpenLeftSidebar={setOpenLeftSidebar} />
      )}
    </>
  );
}
