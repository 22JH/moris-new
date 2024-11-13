import { getItems } from '@/src/lib/action/admin/items.action';
import { CATEGORIES } from '@/src/lib/constants/category';
import Image from 'next/image';
import Link from 'next/link';

export default async function Items({
  params,
}: {
  params: { category: (typeof CATEGORIES)[number] };
}) {
  const { category } = await params;
  const items = await getItems(category);

  return (
    <main className="max-w-maxSize mx-auto px-6">
      <h5 className="mb-4 font-medium">TOTAL {items.length} ITEMS</h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link
            href={`/items/${category}/${item._id}`}
            key={item._id}
            className="relative flex flex-col gap-2 items-center"
          >
            <div className="min-w-[150px] aspect-square w-full relative border-2 border-black">
              <Image
                src={item.thumbnails[0] as string}
                alt={item.thumbnails[0] as string}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {item.status !== 0 && (
                <div className="absolute w-full h-full top-0 left-0 bg-black/60 z-10 grid place-items-center">
                  <h3 className="text-brown-100 font-bold">SOLD OUT</h3>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">{item.title}</h4>
              <h5 className="font-medium">{item.price.toLocaleString()}</h5>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
