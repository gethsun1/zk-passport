import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-6 px-6 sm:px-8 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
    } transition-colors duration-200`}>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm mb-4 sm:mb-0">
            © {currentYear} ZKPass Twitter Passport Demo
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://twitter.com/zkpass"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors duration-200`}
              aria-label="Twitter"
            >
              <Twitter size={18} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
            </a>
            
            <a 
              href="https://github.com/zkpass"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors duration-200`}
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;