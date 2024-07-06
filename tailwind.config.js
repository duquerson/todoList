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
            },
            animation: {
                'fade-in': 'fade-in 0.8s ease-in forwards',
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
