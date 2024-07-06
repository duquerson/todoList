/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            margin: "0px auto 0px auto",

        },
        extend: {
            fontFamily: {
                jakarta: ["Plus Jakarta Sans", "sans-serif"],
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'fade-out': { // Nueva animación fade-out
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-in forwards',
                'fade-out': 'fade-out 0.5s ease-out forwards', // Agrega la animación al objeto animation
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
