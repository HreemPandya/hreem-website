const LineGradient = ({ width = "w-full", isDarkMode = true }) => {
  return (
    <div
      className={`h-px ${width}`}
      style={{
        backgroundImage: isDarkMode
          ? 'linear-gradient(to right, rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.1), transparent)'
          : 'linear-gradient(to right, rgba(74, 107, 78, 0.45), rgba(74, 107, 78, 0.15), transparent)'
      }}
    />
  );
};

export default LineGradient;
