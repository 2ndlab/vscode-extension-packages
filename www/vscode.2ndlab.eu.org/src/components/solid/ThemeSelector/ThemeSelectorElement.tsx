import ThemePreview from "@components/solid/ThemePreview";
import ThemePreviewButton from "@components/solid/ThemePreview/ThemePreviewButton";
import type { Accessor, Component } from "solid-js";
import { ThemeNavButton } from "./ThemeNavButton";

interface ThemeSelectorJSXProps {
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  prevTheme: Accessor<string>;
  nextTheme: Accessor<string>;
  theme: Accessor<string>;
}

export const ThemeSelectorElement: Component<ThemeSelectorJSXProps> = (props) => {
  return (
    <div class="flex mx-2 items-center">
      <ThemeNavButton onNavButtonClick={props.onPrevButtonClick} navTheme={props.prevTheme} />
      <ThemePreviewButton theme={props.theme()} />
      <ThemePreview />
      <ThemeNavButton onNavButtonClick={props.onNextButtonClick} navTheme={props.nextTheme} />
    </div>
  );
};
