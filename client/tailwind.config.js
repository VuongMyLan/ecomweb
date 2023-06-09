/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                "hovermain": 'rgb(1, 147, 118)',
                "main": '#009f7f',
                "fb": '#3065c0',
                "twitter": '#3a80f8',
				"backgroundcolor": "#F1F5F9",
				"textmain":"#4b5563"
            },
			backgroundImage: {
				'loginBackground': "url('assets/img/loginbackground.jpg')",
			
			  }
           
        },
    },
    plugins: [],
};
