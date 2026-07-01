const path = require("path");

// CRA doesn't resolve the "@/..." import alias that shadcn/ui components use.
// CRACO layers this webpack alias on top of react-scripts so "@" -> "src".
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
