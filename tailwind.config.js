export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cocoa: '#4a2c1d',
        choco: '#734933',
        zest: '#fd5a01',
        burnt: '#ce5c03',
        caramel: '#d19975',
        cream: '#ffe6c1',
        vanilla: '#fff6e8',
        leaf: '#4a7324',
      },
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', 'sans-serif'],
        body: ['Nunito', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        'toon-sm': '2px 2px 0 0 #4a2c1d',
        toon: '4px 4px 0 0 #4a2c1d',
        'toon-lg': '8px 8px 0 0 #4a2c1d',
      },
      transitionTimingFunction: {
        toon: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
};
