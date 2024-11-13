'use client';

import NeedSigninPopup from '@/src/components/popup/NeedSigninPopup';
import Button from '@/src/components/ui/Button';
import { usePopupStore } from '@/src/lib/stores/popup/PopupStoreProvider';
import { ItemType } from '@/src/lib/types/api/ItemType';
import { useSession } from 'next-auth/react';

interface ItemDetailButtonProps {
  item: ItemType;
}

export default function ItemDetailButton({ item }: ItemDetailButtonProps) {
  const { data: session } = useSession();

  const { openPopup } = usePopupStore((state) => state);
  const handleWishList = async () => {
    if (!session) {
      openPopup(NeedSigninPopup);
      return;
    }
    if (item.status !== 0) return;
    const existingWishList = localStorage.getItem('wishList');
    const wishList = existingWishList ? JSON.parse(existingWishList) : [];

    if (!Array.isArray(wishList)) {
      localStorage.setItem('wishList', JSON.stringify([wishList, item._id]));
    } else {
      wishList.push(item._id);
      localStorage.setItem('wishList', JSON.stringify(wishList));
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          color={item.status === 0 ? 'darkBrown' : 'lightBrown'}
          className="flex-1 rounded-md"
          // onClick={handleBuy}
        >
          {item.status === 0 ? '바로 구매하기' : 'SOLD OUT'}
        </Button>
        <Button
          color="lightBrown"
          className="w-12 rounded-md"
          onClick={handleWishList}
        >
          장
        </Button>
      </div>
    </>
  );
}
