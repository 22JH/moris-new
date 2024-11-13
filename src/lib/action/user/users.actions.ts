'use server';

import User from '@/src/lib/models/user/user.model';
import { connectToDB } from '@/src/lib/mongoose';
import { UserType } from '@/src/lib/types/api/UserType';
import { type User as NextAuthUserType } from 'next-auth';

export async function getUserByEmail({
  email,
}: {
  email: UserType['email'];
}): Promise<UserType> {
  const user: UserType | null = (await User.findOne({
    email,
  }).lean()) as unknown as UserType;
  if (!user) throw new Error('유저를 찾을 수 없습니다.');
  return user;
}

export async function createUser({ name, email }: NextAuthUserType) {
  try {
    connectToDB();
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      User.create({ name, email });
    }
  } catch (err) {
    throw new Error(`유저 로그인 실패 ${err}`);
  }
}

export async function updateUser(userInfo: UserType) {
  try {
    connectToDB();
    const { name, phone, email, address, addressDetail, postCode } = userInfo;
    await User.findOneAndUpdate(
      { email: userInfo.email },
      { $set: { name, phone, email, address, addressDetail, postCode } },
    );
  } catch (err) {
    throw new Error(
      `유저 정보 수정에 실패했습니다. 다시 시도해 주세요: ${err}`,
    );
  }
}
