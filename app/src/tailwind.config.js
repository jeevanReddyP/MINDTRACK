  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // This scans all your components
    ],
    important: true, // <-- ADD THIS LINE
    theme: {
      extend: {},
    },
    plugins: [],
  }
