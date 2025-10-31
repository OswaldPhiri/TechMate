import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '../components/ThemeToggle';

export default function HomePage() {
  return (
    <div className="container">
      <header>
        <div className="brand">TechMate</div>
        <ThemeToggle />
      </header>

      <section className="hero">
        <div className="copy">
          <h1>Laptop & Desktop Troubleshooter AI</h1>
          <p>
            Select your symptoms and get step-by-step solutions for hardware and software issues.
          </p>
          <div>
            <Link className="btn" href="/troubleshoot">Get Started</Link>
            <a className="btn secondary" href="#learn-more">Learn More</a>
          </div>
        </div>
        <div className="media">
          {/* Unsplash image - update URL as desired */}
          <Image
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop"
            alt="Laptop on desk"
            width={1600}
            height={1000}
            priority
          />
        </div>
      </section>

      <section id="learn-more" className="features">
        <div className="card">
          <h3>Guided Diagnosis</h3>
          <p>Pick symptoms like "PC won't boot", "Slow performance", or "Blue screen" and get likely causes.</p>
        </div>
        <div className="card">
          <h3>Actionable Steps</h3>
          <p>Follow clear, step-by-step solutions for both hardware and software issues.</p>
        </div>
        <div className="card">
          <h3>Chatbot Assistance</h3>
          <p>Ask questions using the integrated BotPenguin assistant.</p>
        </div>
      </section>

      <footer className="footer">
        Photo by <a href="https://unsplash.com/" target="_blank" rel="noreferrer noopener">Unsplash</a> photographers.
      </footer>
    </div>
  );
}


