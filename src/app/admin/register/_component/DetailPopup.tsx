import PopupTemplate from '@/src/components/popup/PopupTemplate';
import { useState } from 'react';
import Image from 'next/image';
import { createItem } from '@/src/lib/action/admin/items.action';
import { CATEGORIES } from '@/src/lib/constants/category';
import { useRouter } from 'next/navigation';

interface DetailPopupProps {
  close: () => void;
  title: string;
  content: string;
}

export default function DetailPopup({
  close,
  title,
  content,
}: DetailPopupProps) {
  const [images, setImages] = useState<{
    preview: string[];
    file: File[];
  }>({ preview: [], file: [] });
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && images.file.length < 3) {
      const imageUrl = URL.createObjectURL(files[0]);
      setImages((prev) => ({
        preview: [...prev.preview, imageUrl],
        file: [...prev.file, files[0]],
      }));
    }
  };

  const handleRegister = async () => {
    if (!title || !price || !category || images.file.length === 0) {
      alert('빈칸을 채워주세요.');
      return;
    }

    try {
      const { _id, category: _category } = await createItem({
        title,
        price: +price,
        content,
        category,
        thumbnails: images.file,
      });
      close();
      router.push(`/items/${_category}/${_id}`);
    } catch (error) {
      console.error(error);
      alert('상품 등록에 실패하였습니다.');
    }
  };

  return (
    <PopupTemplate close={close}>
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-bold mb-2">상품 이미지</h3>
          <div className="flex gap-2">
            {images.preview.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={img}
                  alt={`상품 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {images.file.length < 3 && (
              <label className="w-24 h-24 border-2 border-[rgb(159,125,73)] border-dashed flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span>+</span>
              </label>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">가격</h3>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="가격을 입력하세요"
          />
        </div>

        {/* 카테고리 선택 섹션 */}
        <div>
          <h3 className="text-lg font-bold mb-2">카테고리</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">카테고리 선택</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full p-2 bg-[rgb(159,125,73)] text-white rounded"
          onClick={handleRegister}
        >
          등록
        </button>
      </div>
    </PopupTemplate>
  );
}
