interface ToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

export default function ToolbarButton({
  children,
  isActive,
  ...props
}: ToolbarButtonProps) {
  return (
    <button
      className={`${isActive ? 'translate-x-0 translate-y-0' : '-translate-x-1 -translate-y-1 shadow-[3px_3px_rgba(159,125,73,1)]'} border border-[rgba(159,125,73,0.5)] rounded-s p-1`}
      {...props}
    >
      {children}
    </button>
  );
}
