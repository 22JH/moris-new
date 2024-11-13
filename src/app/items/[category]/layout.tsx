import { menu } from '@/src/lib/constants/menu';
import CategoryBar from './_components/categoryBar';

export default async function ItemsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    category: (typeof menu)[number]['name'];
  };
}) {
  const { category } = await params;
  return (
    <>
      <CategoryBar category={category} />
      {children}
    </>
  );
}
