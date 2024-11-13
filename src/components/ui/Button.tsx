import Link from 'next/link';
import { UrlObject } from 'url';

interface ButtonProps {
  children: React.ReactNode;
  color: 'darkBrown' | 'lightBrown';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: UrlObject;
}

export default function Button({
  children,
  color,
  size = 'md',
  className,
  onClick,
  href,
}: ButtonProps) {
  const bgClass = {
    darkBrown: 'bg-brown-500',
    lightBrown: 'bg-brown-300',
  };

  const sizeClass = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };
  if (href)
    return (
      <Link
        href={href}
        className={`${bgClass[color]} ${sizeClass[size]} ${className}`}
        onClick={onClick}
      >
        <h5 className="text-white font-medium">{children}</h5>
      </Link>
    );
  return (
    <button
      className={`${bgClass[color]} ${sizeClass[size]} ${className}`}
      onClick={onClick}
    >
      <h5 className="text-white font-medium">{children}</h5>
    </button>
  );
}
