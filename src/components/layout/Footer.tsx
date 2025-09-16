import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-8" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div>
            <Link href="/" className="text-xl font-bold" style={{ color: 'var(--background)' }}>
              NEXIO
            </Link>
            <p className="mt-2 text-sm" style={{ color: 'var(--background)', opacity: 0.7 }}>
              © {new Date().getFullYear()} Nexio. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex space-x-8 justify-center items-center">
            <Link 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:opacity-70"
              style={{ color: 'var(--background)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:opacity-70"
              style={{ color: 'var(--background)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            
            <Link 
              href="https://wa.me/5500000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:opacity-70"
              style={{ color: 'var(--background)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;