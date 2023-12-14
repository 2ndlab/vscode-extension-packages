import type { Accessor, Component } from "solid-js";

interface ThemeNavButtonProps {
  onNavButtonClick: () => void;
  navTheme: Accessor<string>;
}

export const ThemeNavButton: Component<ThemeNavButtonProps> = (props) => {
  return (
    <button class="btn btn-xs btn-secondary mx-1" onClick={() => props.onNavButtonClick()}>
      {props.navTheme()}
    </button>
  );
};
