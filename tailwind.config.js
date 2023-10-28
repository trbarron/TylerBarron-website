module.exports = {
  theme: {

    fontFamily: {
      body: ['Berkeley', 'system-ui']
    },

    extend: {
      spacing: {
        xl: "49rem",
        iauto: "0",
      },

      backgroundImage: theme => ({
        'background': "url('./assets/img/background.jpg')",
        'gradient-to-red-clear': 'linear-gradient(to left, white, #018786DD)',
        'gradient-to-blue-gray': 'linear-gradient(to left, #018786DD, #018786DD)',
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
          light: '#A4A4A4',
          DEFAULT: '#03DAC6',
          dark: '#018786',
          clear: "#018786DD",
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