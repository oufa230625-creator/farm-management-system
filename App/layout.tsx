import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Farm Management System (FMS)',
  description: 'نظام إدارة مزرعة التسمين',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}
