/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#c2b5f4",
        
"secondary": "#ffc5ba",
        
"accent": "#8b18ce",
        
"neutral": "#181820",
        
"base-100": "#EEE8F3",
        
"info": "#49A7F3",
        
"success": "#2ABB5F",
        
"warning": "#CEAB0D",
        
"error": "#E1232D",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}