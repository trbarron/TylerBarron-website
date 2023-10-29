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
      backgroundImage: {
        'conic-gradient': 'conic-gradient(at top left, teal 0%, emerald 50%, gray 100%)',
        'gradient-to-red-clear': 'linear-gradient(to left, #018786DD, black)',
        'gradient-to-blue-gray': 'linear-gradient(to left, black, black)',
        'background': 'radial-gradient(circle at bottom left, #0F7676, #047857, #9CA3AF)',

      },
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