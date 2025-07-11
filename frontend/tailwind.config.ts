/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
        'nubernext': ['var(--font-nubernext)', 'var(--font-ibm-plex-sans)', 'sans-serif'],
        'nubernext-extended': ['var(--font-nubernext)', 'var(--font-ibm-plex-sans)', 'sans-serif'],
        'nubernext-wide': ['var(--font-nubernext)', 'var(--font-ibm-plex-sans)', 'sans-serif'],
        'nubernext-condensed': ['var(--font-nubernext)', 'var(--font-ibm-plex-sans)', 'sans-serif'],
        'monument': ['var(--font-monument)', 'var(--font-ibm-plex-sans)', 'sans-serif'],
        'sharp-sans': ['Sharp Sans Extrabold', 'var(--font-ibm-plex-sans)', 'sans-serif'],
      },
      fontWeight: {
        'heavy': '900',
      },
    },
  },
  plugins: [],
  safelist: [
    'font-nubernext',
    'font-nubernext-extended', 
    'font-nubernext-wide',
    'font-nubernext-condensed',
    'font-heavy',
    'font-bold',
  ],
};

export default config; 