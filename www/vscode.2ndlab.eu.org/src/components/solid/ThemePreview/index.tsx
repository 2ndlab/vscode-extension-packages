import type { JSX, ParentComponent } from "solid-js";
import { For } from "solid-js";

const ThemePreview: ParentComponent<{ children?: JSX.Element }> = (props) => {
  const bgProps = [
    "bg-primary",
    "bg-secondary",
    "bg-accent",
    "bg-neutral",
    "bg-info",
    "bg-success",
    "bg-warning",
    "bg-error",
  ];
  return (
    <>
      <span class="flex justify-center items-center bg-base-100 rounded-btn shrink-0 flex-wrap gap-1 p-1 m-1">
        {props.children}
        <For each={bgProps}>{(bgProp) => <span class={`${bgProp} w-2 h-4 rounded-full`} />}</For>
      </span>
    </>
  );
};

export default ThemePreview;
