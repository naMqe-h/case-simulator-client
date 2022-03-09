module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        test1: {
          "primary": "#d1d5db",   
          "secondary": "#a21caf",    
          "accent": "#1FB2A6",   
          "neutral": "#191D24",     
          "base-100": "#2A303C",      
          "info": "#3ABFF8",       
          "success": "#36D399",    
          "warning": "#FBBD23",    
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}