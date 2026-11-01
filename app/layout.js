import './globals.css';

export const metadata = {
  title: 'Md. Shahedur Rahman (Shohagh) | International Sales & Client Success',
  description:
    'Sales executive working with international clients on Fiverr. Lead generation, proposals, deal closing, n8n AI automation and video content.',
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
