import { menu } from '@/src/lib/constants/menu';
import Link from 'next/link';

interface CategoryBarProps {
  category: (typeof menu)[number]['name'];
}

export default function CategoryBar({ category }: CategoryBarProps) {
  return (
    <nav className="flex flex-row w-full justify-around py-5 max-w-[550px] mx-auto">
      {menu.map((item) => (
        <section key={item.path} className="relative">
          <Link
            href={item.path}
            key={item.name}
            className={`c1 min-[400px]:p1 min-[500px]:text-h5 lg:text-h4 ${category !== item.name.toLowerCase() ? 'translate-x-0 translate-y-0' : 'button-up'} font-bold px-2 py-1 border-2 rounded-lg border-black transition-all duration-300 relative inline-block z-10 bg-white`}
          >
            {item.name}
          </Link>
          <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-brown-400 border-2 border-black" />
        </section>
      ))}
    </nav>
  );
}
