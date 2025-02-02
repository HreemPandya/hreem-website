import React from 'react';
import { Linkedin, Github, Youtube, Instagram } from 'lucide-react';

const SocialMediaIcons = ({ isDarkMode, forceWhite = false }) => {
  // Use white if forceWhite is true, otherwise use theme-based color
  const iconColor = forceWhite ? '#FFFFFF' : isDarkMode ? '#000000' : '#000000';
  const iconSize = 24;

  return (
    <div className="flex justify-center md:justify-start my-10 gap-7">
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://www.linkedin.com/in/hreem-pandya-7b74a0275/"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin size={iconSize} color={iconColor} />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://github.com/HreemPandya"
        target="_blank"
        rel="noreferrer"
      >
        <Github size={iconSize} color={iconColor} />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://www.youtube.com/@hreempandya2596/videos"
        target="_blank"
        rel="noreferrer"
      >
        <Youtube size={iconSize} color={iconColor} />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://www.instagram.com/hreempandya"
        target="_blank"
        rel="noreferrer"
      >
        <Instagram size={iconSize} color={iconColor} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;