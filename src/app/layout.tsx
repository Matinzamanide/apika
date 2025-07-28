import ShoppingCartContextProvider from "@/context/ShoppingCartContext";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import AuthContextProvider from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthContextProvider>
        <ShoppingCartContextProvider>
          <Layout>{children}</Layout>
        </ShoppingCartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
