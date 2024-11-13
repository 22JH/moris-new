/**
 * 상품 정보
 * @id 상품 고유 번호
 * @title 상품 이름
 * @price 상품 가격
 * @thumbnail 상품 썸네일
 * @status 0: 판매중, 1: 배송중, 2: 판매완료
 * @content 상품 설명
 * @category 상품 카테고리
 * @buyer 구매자 아이디
 */
export interface ItemType {
  _id?: string;
  title: string;
  price: number;
  thumbnails: string[] | File[];
  content: string;
  category: string;
  buyer?: string | null;
  status?: 0 | 1 | 2;
}
