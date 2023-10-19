/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.{html,js,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            'redcollar': ["Red collar"],
            'ttcommons': ["TT Commons"]
        },
        truncate: {
                // width: ['100%'],
                // ['white-space']: ['nowrap'],
                display: ['-webkit-box'],
                WebkitBoxOrient: ['vertical'],
                WebkitLineClamp: ['1'],
                ['text-overflow']: ['hidden'],
        },
    },
    plugins: [],
};
