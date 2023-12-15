import type { JSX, ParentComponent } from "solid-js";
import { For, Match, Switch } from "solid-js";

const ThemePreview: ParentComponent<{ children?: JSX.Element; animation?: boolean }> = (props) => {
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
        <For each={bgProps}>
          {(bgProp, index) => (
            <Switch fallback={<span class={`${bgProp} w-2 h-4 rounded-full`} />}>
              <Match when={props.animation && (index() === 0 || index() === 4)}>
                <span class={`${bgProp} trans-y-0 w-2 h-4 rounded-full`} />
              </Match>
              <Match when={props.animation && (index() === 2 || index() === 6)}>
                <span class={`${bgProp} trans-y-0 trans-y-0-reverse w-2 h-4 rounded-full`} />
              </Match>
              <Match when={props.animation && (index() === 1 || index() === 5)}>
                <span class={`${bgProp} trans-y-1 w-2 h-4 rounded-full`} />
              </Match>
              <Match when={props.animation && (index() === 3 || index() === 7)}>
                <span class={`${bgProp} trans-y-1-reverse w-2 h-4 rounded-full`} />
              </Match>
            </Switch>
          )}
        </For>
      </span>
    </>
  );
};

export default ThemePreview;
