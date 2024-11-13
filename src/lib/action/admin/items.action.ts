'use server';

import { CATEGORIES } from '../../constants/category';
import Item from '../../models/admin/items.model';
import { connectToDB } from '../../mongoose';
import { ItemType } from '../../types/api/ItemType';
import { uploadImage } from './uploadImage';

export async function createItem(
  item: ItemType,
): Promise<Pick<ItemType, '_id' | 'category'>> {
  try {
    connectToDB();
    if (!item) throw new Error('잘못된 요청입니다.');
    const thumbnialsUrl = await Promise.all(
      item.thumbnails.map(async (thumbnail) => {
        const url = await uploadImage(thumbnail as File);
        return url;
      }),
    );
    const result = (await Item.create({
      ...item,
      thumbnails: thumbnialsUrl,
    })) as ItemType;
    return {
      _id: result._id!.toString(),
      category: result.category.toString(),
    };
  } catch (error) {
    throw new Error(`상품 등록에 실패하였습니다. ${error}`);
  }
}

export async function getItem(id: string): Promise<ItemType> {
  connectToDB();
  const { _id, ...item } = (await Item.findById(
    id,
  ).lean()) as unknown as ItemType;

  if (!_id) {
    throw new Error('Item not found');
  }

  return { _id: _id!.toString(), ...item };
}

export async function getItems(
  category: (typeof CATEGORIES)[number] | 'all',
): Promise<ItemType[]> {
  connectToDB();
  if (category === 'all') {
    const result = await Item.find();
    return result;
  }
  const result = await Item.find({ category });
  return result;
}
