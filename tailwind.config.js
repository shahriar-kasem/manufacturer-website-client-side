module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'spring-background': "url('/src/images/background/Spring.png')",
        'banner-background': "url('/src/images/background/banner-bg.jpg')",
        'ocean-background': "url('/src/images/background/Ocean.png')",
        'business-summary': "url('/src/images/background/istockphoto-1025744818-170667a.jpg')",
        'beach-background': "url('/src/images/background/Beach.png')",
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a991f7",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      // "dark",
      // "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}
