import type { CustomTheme, Theme } from "daisyui";
import type { DaisyuiThemes } from "@types";

export const getThemeSettings = (daisyuiThemes: DaisyuiThemes) => {
  const themes: string[] = [];
  daisyuiThemes.forEach((theme) => {
    if (isCustomTheme(theme)) {
      themes.push(...Object.keys(theme));
    } else {
      themes.push(theme);
    }
  });
  const themeLength = themes.length - 1;
  const themeIndexDefault = JSON.stringify({
    index: "0",
    prevIndex: `${themeLength}`,
    nextIndex: "1",
  });
  const themeIndex = JSON.parse(localStorage.getItem("themeIndex") ?? themeIndexDefault);
  return { themes, themeIndex, themeLength };
};

const isCustomTheme = (theme: Theme | CustomTheme): theme is CustomTheme => {
  if (theme instanceof Object) {
    return true;
  } else {
    return false;
  }
};
