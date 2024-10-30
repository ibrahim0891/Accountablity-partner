/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'my-green': {
                    50: '#FFF0F4',
                    100: '#FFE5EE',
                    200: '#FFB8D2',
                    300: '#FF8CB6',
                    400: '#FF5C8F',
                    500: '#FF3366',
                    600: '#FF1A4D',
                    700: '#E60040',
                    800: '#CC0033',
                    900: '#B30029',
                    950: '#990022' 
                }
            }
        },
    },
    plugins: [],
}

//nord color palatte

// 50: '#ECEFF4',
//     100: '#E5E9F0',
//         200: '#D8DEE9',
//             300: '#4C566A',
//                 400: '#434C5E',
//                     500: '#3B4252',
//                         600: '#2E3440',
//                             700: '#5E81AC',
//                                 800: '#81A1C1',
//                                     900: '#88C0D0',
//                                         950: '#8FBCBB',   

// material you green

// 50: '#f6faf1',
//     100: '#e9f5e1',
//         200: '#d3eac4',
//             300: '#b2d89c',
//                 400: '#8ac06e',
//                     500: '#68a446',
//                         600: '#4f8434',
//                             700: '#3f682b',
//                                 800: '#355326',
//                                     900: '#2d4522',
//                                         950: '#13230e',