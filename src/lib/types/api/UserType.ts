export interface UserType {
  _id?: string;
  name: string;
  email: string;
  role: string;
  totalPurchaseAmount: number;
  phone?: string;
  address?: string;
  addressDetail?: string;
  postCode?: string;
}
