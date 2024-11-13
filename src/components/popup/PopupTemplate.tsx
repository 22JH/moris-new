import { useEffect, useState } from 'react';

export default function PopupTemplate({
  children,
  close,
  shouldCloseOnOutsideClick = true,
}: {
  children?: React.ReactNode;
  close: () => void;
  shouldCloseOnOutsideClick?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('animationend', ({ animationName }) => {
      if (
        animationName === 'slideDown' ||
        animationName === 'slideDownWithOpacity'
      ) {
        close();
      }
    });
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('animationend', () => {});
    };
  }, []);

  return (
    <div
      className="fixed lg:flex lg:items-center lg:justify-center top-0 w-[100vw] h-[100dvh] bg-[rgba(33,33,33,0.3)] z-[999] max-w-maxSize"
      onClick={() => shouldCloseOnOutsideClick && setIsOpen(false)}
    >
      <div
        className={`fixed lg:relative lg:max-w-[800px] bottom-0 bg-white h-auto w-full rounded-t-2xl lg:rounded-b-2xl flex items-center flex-col max-w-maxSize ${
          !isOpen ? 'slide-down' : 'slide-up'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
