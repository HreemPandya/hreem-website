import SocialMediaIcons from "../components/SocialMediaIcons";

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`h-64 pt-10 transition-colors duration-300 ${isDarkMode ? 'bg-green-600' : 'bg-[#E76F51]'}`}>
      <div className="w-10/12 mx-auto">
        <SocialMediaIcons isDarkMode={isDarkMode} />
        <div className="md:flex justify-center md:justify-between text-center">
          <p className="font-playfair font-semibold text-2xl text-deep-blue">
            HREEM PANDYA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
