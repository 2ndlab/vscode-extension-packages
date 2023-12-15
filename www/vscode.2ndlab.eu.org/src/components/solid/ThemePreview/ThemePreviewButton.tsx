import type { JSX, ParentComponent } from "solid-js";

const ThemePreviewButton: ParentComponent<{ theme: string; children?: JSX.Element }> = (props) => {
  return (
    <>
      <input
        id="theme-button"
        type="radio"
        name="theme-button"
        class="btn btn-xs btn-ghost theme-controller"
        aria-label={props.theme}
        value={props.theme}
      >
        {props.children}
      </input>
    </>
  );
};
export default ThemePreviewButton;
