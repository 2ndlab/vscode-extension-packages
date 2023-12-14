/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        凝光: {
          primary: "#8A776B",
          secondary: "#C3AA80",
          accent: "#DBC898",
          neutral: "#E3D6BF",
          "base-100": "#FCF9F3",
        },
        胡桃: {
          primary: "#564441",
          secondary: "#C9715D",
          accent: "#CAA399",
          neutral: "#F4DAC7",
          "base-100": "#F0ECE8",
        },
        甘雨: {
          primary: "#8AB1DA",
          secondary: "#BFCEE4",
          accent: "#7B5E68",
          neutral: "#B1AABA",
          "base-100": "#F4F7FD",
        },
        刻晴: {
          primary: "#5B4877",
          secondary: "#B09DC8",
          accent: "#BBA1D1",
          neutral: "#9C93AB",
          "base-100": "#F3EAFB",
        },
        芙宁娜: {
          primary: "#3B467E",
          secondary: "#74ACD0",
          accent: "#91C7E7",
          neutral: "#BAD7E7",
          "base-100": "#FEFEFE",
        },
        纳西妲: {
          primary: "#AFC486",
          secondary: "#C5CAAB",
          accent: "#B5ABA3",
          neutral: "#D5D0C8",
          "base-100": "#F6F6F6",
        },
        珐露珊: {
          primary: "#416572",
          secondary: "#9BC5C2",
          accent: "#B4CFD1",
          neutral: "#C3CDD1",
          "base-100": "#F6F6F6",
        },
      },
    ],
  },
};
