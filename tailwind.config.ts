import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
        
            "primary": "#006bff",
                    
            "secondary": "#008400",
                    
            "accent": "#7b8200",
                    
            "neutral": "#0b0b0b",
                    
            "base-100": "#fffdff",
                    
            "info": "#00a2ff",
                    
            "success": "#659700",
                    
            "warning": "#e1a900",
                    
            "error": "#ff669f",
        },
      }
    ],
  },
};
export default config;
