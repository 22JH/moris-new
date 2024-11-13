import { getItem } from '@/src/lib/action/admin/items.action';
import Viewer from './_compoentns/Viewer';
import Thumbnails from './_compoentns/Thumbnails';
import ItemDetailButton from './_compoentns/ItemDetailButton';

export default async function ItemDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const item = await getItem(id);
  return (
    <main className="px-6 xl:px-0 pb-5">
      <div className="flex flex-col gap-4">
        <h3>{item.category}</h3>
        <section className="flex flex-col md:flex-row gap-4 w-full">
          <Thumbnails thumbnails={item.thumbnails as string[]} />
          <section className="flex flex-col flex-1 gap-2 min-w-[300px]">
            <h1 className="text-[20px] font-bold">{item.title}</h1>
            <h5 className="font-medium">{item.price.toLocaleString()}원</h5>
            <ItemDetailButton item={item} />
          </section>
        </section>
        <hr />
        <Viewer content={item.content} />
      </div>
    </main>
  );
}
