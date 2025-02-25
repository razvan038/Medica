import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from '@/components/home/navbar'

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Medica",
    template: "%s | Medica",
  },
  description:
    "Here is the description for Medica website",
  metadataBase: new URL("https://example.com"),
  keywords: ["Medica"],
  authors: [{ name: "Your Name" }],
  creator: "Khromera",
  publisher: "Khromera",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    title: "Medica",
    description: "Medica website description",
    siteName: "Your Site Name",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Site preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medica",
    description: "Medica Website",
    creator: "@medica",
    images: ["https://example.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <Navbar/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
