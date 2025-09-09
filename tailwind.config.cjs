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
      'primary': 'var(--primary)',
      'primary-transparent': 'var(--primary-transparent)',
      'glass-gradient-from': 'var(--glass-gradient-from)',
      'glass-gradient-to': 'var(--glass-gradient-to)',
      'circle-one': 'var(--circle-one)',
      'circle-two': 'var(--circle-two)',
      'circle-three': 'var(--circle-three)',
      'glass-button': 'var(--glass-button)',
      'white': 'white',
      'black': 'black',
      'dark': 'var(--dark)',
      'black-transparent': 'var(--black-transparent)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
