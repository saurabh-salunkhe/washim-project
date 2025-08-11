// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",      // App Router   // Pages Router
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skycustom: '#A5E3FF',
      }
    },
  },
  plugins: [],
};

