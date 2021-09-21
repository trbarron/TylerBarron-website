module.exports = {
  theme: {

    fontFamily: {
      body: ['Armata', 'sans-serif'],
    },

    extend: {
      spacing: {
        xl: "49rem",
        iauto: "0",
      },

      backgroundImage: theme => ({
        'background': "url('./assets/img/background.jpg')",
      }),

      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },

      maxWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },

      colors: {
        red: {
          light: '#EA5449',
          DEFAULT: '#EA5449',
          dark: '#EA5449',
          clear: "#EA5449DD",
        },

        gray: {
          light: '#f2f2f2',
          DEFAULT: '#2E3532',
          dark: '#171717',
          clear: "#171717DD",
        },
      },
    }

  },
  variants: {

  },
  plugins: [],
}