import MeLayout from '@/components/layout/me/layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="bg-gray-100">
      <MeLayout>{children}</MeLayout>
    </body>
  );
}
