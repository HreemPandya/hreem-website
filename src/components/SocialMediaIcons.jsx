import React from 'react';
import { Linkedin, Github, Youtube, Instagram } from 'lucide-react';

const SocialMediaIcons = ({ isDarkMode, forceWhite = false }) => {
  // Use white if forceWhite is true, otherwise use theme-based color
  const iconColor = forceWhite ? '#FFFFFF' : isDarkMode ? '#000000' : '#2A2A2A';
  const iconSize = 24;

  return (
    <div className="flex flex-wrap justify-center md:justify-start my-6 md:my-10 gap-2 sm:gap-7">
      <a
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg hover:opacity-50 transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        href="https://www.linkedin.com/in/hreem-pandya-7b74a0275/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin size={iconSize} color={iconColor} />
      </a>
      <a
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg hover:opacity-50 transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        href="https://github.com/HreemPandya"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <Github size={iconSize} color={iconColor} />
      </a>
      <a
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg hover:opacity-50 transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        href="https://www.youtube.com/@hreempandya2596/videos"
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube"
      >
        <Youtube size={iconSize} color={iconColor} />
      </a>
      <a
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg hover:opacity-50 transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        href="https://www.instagram.com/hreempandya"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <Instagram size={iconSize} color={iconColor} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
