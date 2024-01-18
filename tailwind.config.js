/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      borderRadius:{
        '12':'5rem',
      },
      zIndex: {
        '100': '100',
        '90':'90'
      },
      colors:{
        'main':'#D92525 ',
        'custBlack':'#1F2024',
        'Cblue' :'#001022',
        'dashBlack':'#212529',
        'custGreen':'#0ab39c',
        'dashGreen':'#023535',
        'custBlue' : '#1B2C3F'
      },
      backgroundImage:{
        'banner':'url("/assets/images/banner.jpg")',
      },
      backgroundPosition: {
        bottom: 'bottom',
        'bottom-4': 'center bottom 0rem',
        center: 'center',
        left: 'left',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        right: 'right',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
        top: 'top',
        'top-4': 'center top 3rem',
      }
    },
  },
  plugins: []
}