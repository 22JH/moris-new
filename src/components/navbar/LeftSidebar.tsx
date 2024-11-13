import CloseIcon from '@/public/svg/close.svg';
import { menu } from '@/src/lib/constants/menu';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LeftSidebarProps {
  setOpenLeftSidebar: (value: boolean) => void;
}

export default function LeftSidebar({ setOpenLeftSidebar }: LeftSidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('animationend', ({ animationName }) => {
        if (animationName === 'slideOut') {
          setOpenLeftSidebar(false);
        }
      });
    }
    return () => {
      document.removeEventListener('animationend', () => {});
    };
  }, []);

  return (
    <section
      className="w-[100vw] h-[100dvh] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] md:hidden fade-in z-[999]"
      onClick={() => setIsOpen(false)}
    >
      <section
        className={`bg-white w-1/2 h-full min-w-[250px] relative ${isOpen ? 'slide-in' : 'slide-out'}`}
      >
        <CloseIcon
          onClick={() => setIsOpen(false)}
          className="absolute right-6 top-6 cursor-pointer"
        />
        <section className="flex flex-col gap-4 p-4">
          {menu.map((item) => (
            <Link href={item.path} key={item.name}>
              {item.name}
            </Link>
          ))}
        </section>
      </section>
    </section>
  );
}
