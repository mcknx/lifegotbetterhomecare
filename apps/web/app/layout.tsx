import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ServicesPanelProvider } from "@/lib/services-panel-context";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Life Got Better Homecare | Professional Home Care Services",
  description: "Experience professional, personalized care that helps seniors live independently and enables true peace of mind for their families.",
  keywords: "home care, elderly care, senior care, personal care, companion care, respite care, post-operative care",
  icons: {
    icon: [
      { url: '/LGBH_logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/LGBH_logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/LGBH_logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [{ url: '/LGBH_logo.png' }],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Life Got Better Homecare',
  },
  themeColor: '#9B59B6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/LGBH_logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/LGBH_logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/LGBH_logo.png" />
        <link rel="shortcut icon" href="/LGBH_logo.png" />
        <meta name="theme-color" content="#9B59B6" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased overflow-x-hidden`}>
        <ServicesPanelProvider>
          {children}
        </ServicesPanelProvider>
      </body>
    </html>
  );
}
