const LineGradient = ({ width = "w-full" }) => {
  return <div className={`h-px ${width} bg-gradient-to-r from-violet-600/50 via-cyan-400/20 to-transparent`} />;
};

export default LineGradient;
