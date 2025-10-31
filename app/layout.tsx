import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TechMate – Laptop & Desktop Troubleshooter AI',
  description: 'Select your symptoms and get step-by-step solutions for hardware and software issues.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        {children}

        {/* BotPenguin Widget: Replace with your official embed code from BotPenguin dashboard */}
        {/* Example placeholder:
        <script
          dangerouslySetInnerHTML={{ __html: `
            window.botpenguinSettings = { botId: 'YOUR_BOTPENGUIN_BOT_ID' };
            (function(){ var s=document.createElement('script'); s.src='https://cdn.botpenguin.com/widget.js'; s.async=true; document.body.appendChild(s); })();
          `}}
        />
        */}
      </body>
    </html>
  );
}


