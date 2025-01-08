const SocialMediaIcons = () => {
  return (
    <div className="flex justify-center md:justify-start my-10 gap-7">
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://www.linkedin.com/in/hreem-pandya-7b74a0275/"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="linkedin-link" src="../assets/linkedin.png" />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://github.com/HreemPandya"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="git-link" src="../assets/gitlogo.png" />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://www.youtube.com/@hreempandya2596/videos"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="youtube-link" src="../assets/youtube.png" />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href="https://www.instagram.com/hreempandya"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="instagram-link" src="../assets/instagram.png" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
