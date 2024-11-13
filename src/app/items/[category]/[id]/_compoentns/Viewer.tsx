'use client';

interface ViewerProps {
  content: TrustedHTML | string;
}

export default function Viewer({ content }: ViewerProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
