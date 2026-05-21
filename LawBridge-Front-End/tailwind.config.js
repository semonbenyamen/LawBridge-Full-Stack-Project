// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
        // Dark brown color for buttons and titles    
          'brown': '#3F2C2C',
        // Beige color for the logo and active borders  
          'beige': '#C1A172',
        // The text color is sub-gray
          'text-gray': '#7C7C7C',
        // The background color is very light gray.
          'bg-gray': '#F7F7F7',
        }
      },
    },
  },
  plugins: [],
}