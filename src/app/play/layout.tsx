import PlayLayout from '@/components/layout/play/layout';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PlayLayout>{children}</PlayLayout>;
}
