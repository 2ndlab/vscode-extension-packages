import type { DaisyuiThemes } from "@types";
import { getThemeSettings } from "@utils/getThemeSettings";
import { updateMetaThemeColor } from "@utils/updateMetaThemeColor";
import type { Accessor, Component, Setter } from "solid-js";
import { batch, createEffect, createSignal } from "solid-js";
import { ThemeSelectorElement } from "./ThemeSelectorElement";
const ThemeSelector: Component<{ themes: DaisyuiThemes }> = (props) => {
  const { themes, themeIndex, themeLength } = getThemeSettings(props.themes);

  const [index, setIndex] = createSignal(themeIndex.index);
  const [prevIndex, setPrevIndex] = createSignal(themeIndex.prevIndex);
  const [nextIndex, setNextIndex] = createSignal(themeIndex.nextIndex);

  const [theme, setTheme] = createSignal(themes[index()]);
  const [prevTheme, setPrevTheme] = createSignal(themes[prevIndex()]);
  const [nextTheme, setNextTheme] = createSignal(themes[nextIndex()]);

  createEffect(() => {
    batch(() => {
      setTheme(themes[index()]);
      setPrevTheme(themes[prevIndex()]);
      setNextTheme(themes[nextIndex()]);
      document.getElementById("theme-button")!.click();
      updateMetaThemeColor();
    });
    localStorage.setItem(
      "themeIndex",
      JSON.stringify({
        index: index().toString(),
        prevIndex: prevIndex().toString(),
        nextIndex: nextIndex().toString(),
      }),
    );
  });

  const onPrevButtonClick = prevButtonClick(themeLength, index, setPrevIndex, setIndex, setNextIndex);

  const onNextButtonClick = nextButtonClick(themeLength, index, setPrevIndex, setIndex, setNextIndex);

  return (
    <ThemeSelectorElement
      theme={theme}
      prevTheme={prevTheme}
      nextTheme={nextTheme}
      onPrevButtonClick={onPrevButtonClick}
      onNextButtonClick={onNextButtonClick}
    />
  );
};

const nextButtonClick = (
  length: number,
  index: Accessor<number>,
  setPrevIndex: Setter<number>,
  setIndex: Setter<number>,
  setNextIndex: Setter<number>,
) => {
  return () => {
    if (index() < length) {
      setPrevIndex(index());
      setIndex(index() + 1);
      // (0, ..., length]
      setNextIndex(index() + 1 <= length ? index() + 1 : 0);
    } else {
      // reset
      setPrevIndex(length);
      setIndex(0);
      setNextIndex(index() + 1);
    }
  };
};

const prevButtonClick = (
  length: number,
  index: Accessor<number>,
  setPrevIndex: Setter<number>,
  setIndex: Setter<number>,
  setNextIndex: Setter<number>,
) => {
  return () => {
    if (index() > 0) {
      setNextIndex(index());
      setIndex(index() - 1);
      // (0, ..., length]
      setPrevIndex(index() - 1 > 0 ? index() - 1 : length);
    } else {
      // reset
      setNextIndex(0);
      setIndex(length);
      setPrevIndex(index() - 1);
    }
  };
};

export default ThemeSelector;
