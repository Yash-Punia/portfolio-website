module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['"Work Sans"', 'Roboto', '"Source Sans Pro"'],
    },
    colors: {
      'transparent': 'transparent',
      'primary': '#1ee8b7',
      'primary-transparent': '#1ee8b788',
      'glass-gradient-from': '#1ee8b766',
      'glass-gradient-to': '#7a88d866',    
      'circle-one': '#25e0ba',
      'circle-two': '#7a88d8',
      'circle-three': '#c362f6',
      'glass-button': '#1ee8b722',
      'glass-container': "#0e1117aa",
      'white': "#ffffff",
      'black': '#000000',
      'dark': "#1a1a1a",
      'black-transparent': '#00000055',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
