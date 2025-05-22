import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ServicesPanelProvider } from "@/lib/services-panel-context";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Welcome to Life Got Better Homecare!",
  description: "Experience professional, personalized care that helps seniors live independently and enables true peace of mind for their families.",
  keywords: "home care, elderly care, senior care, personal care, companion care, respite care, post-operative care",
  icons: {
    icon: [
      { url: '/LGBH_logo_solo.png', sizes: '32x32', type: 'image/png' },
      { url: '/LGBH_logo_solo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/LGBH_logo_solo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [{ url: '/LGBH_logo_solo.png' }],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Welcome to Life Got Better Homecare!',
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
        <link rel="icon" type="image/png" href="/LGBH_logo_solo.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9B59B6" />
        {/* Force favicon reload for production */}
        <link 
          rel="icon"
          href={`/LGBH_logo_solo.png?v=${new Date().getTime()}`}
          type="image/png"
        />
        {/* Add additional tags to ensure favicon loads in production */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <!-- Force favicon reload -->
              <link rel="shortcut icon" href="/LGBH_logo_solo.png" />
            `,
          }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased overflow-x-hidden`}>
        <ServicesPanelProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ServicesPanelProvider>
      </body>
    </html>
  );
}
