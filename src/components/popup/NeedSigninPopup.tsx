import { signIn } from 'next-auth/react';
import Button from '../ui/Button';
import PopupTemplate from './PopupTemplate';

interface NeedSigninPopupProps {
  closePopup: () => void;
}

export default function NeedSigninPopup({ closePopup }: NeedSigninPopupProps) {
  const handleSignin = () => {
    signIn('google');
  };
  return (
    <PopupTemplate close={closePopup}>
      <h1>로그인이 필요합니다.</h1>
      <Button color="darkBrown" onClick={handleSignin}>
        로그인
      </Button>
    </PopupTemplate>
  );
}
