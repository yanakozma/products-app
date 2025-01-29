/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
    	extend: {
			backgroundImage: {
				'home-page': "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/background-image.png')"
			},
			colors: {
				gray: {
					0: "var(--gray-0)",
					5: "var(--gray-5)",
					10: "var(--gray-10)",
					25: "var(--gray-25)",
					50: "var(--gray-50)",
					70: "var(--gray-70)",
				},
				blue: {
					5: "var(--blue-5)",
					10: "var(--blue-10)",
					20: "var(--blue-20)",
					30: "var(--blue-30)",
					40: "var(--blue-40)",
				}

			},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
			boxShadow: {
				1: "0px 4px 17.1px 0px rgba(0, 0, 0, 0.05)",
			},
    	}
    },
    plugins: [require("tailwindcss-animate")],
}