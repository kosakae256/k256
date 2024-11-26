import DefaultLayout from "@/components/layout/layout";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DefaultLayout children={children} />
      </body>
    </html>
  );
}
