
tailwind.config = {
  theme: {
    extend: {
      colors: {
        lime: {
          

       
          100: 'hsl(61, 70%, 90%)',  // very light (what you want)
          200: 'hsl(61, 70%, 80%)',
          300: 'hsl(61, 70%, 70%)',
          400: 'hsl(61, 70%, 60%)',
          500: 'hsl(61, 70%, 52%)'   // your original color
        },
        slate_900: 'hsl(202, 55%, 16%)',
        slate_700: 'hsl(200, 24%,40%)',
        slate_500: 'hsl(200, 26%, 54%)',
        slate_300: 'hsl(203, 41%, 72%)',
        slate_100: 'hsl(202, 86%, 94%)',
         shadowBlack: 'hsla(0, 0%, 0%, 0.25)',
        white: 'hsl(0, 0%, 100%)',
        red: 'hsl(4, 69%, 50%)'
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif']
      }
      
    }
  }
}