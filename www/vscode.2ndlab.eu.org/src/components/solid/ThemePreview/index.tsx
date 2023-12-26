import type { JSX, ParentComponent } from "solid-js";
import { For, Match, Switch, createEffect } from "solid-js";
import { animate, stagger } from "motion";

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
  const seed = (Math.sqrt(5) - 1) / 2;
  createEffect(() => {
    animate(
      ".loop-alternate-infinity",
      { y: 10 },
      {
        delay: stagger(seed),
        duration: seed * 2,
        direction: "alternate-reverse",
        easing: "ease-in-out",
        repeat: Infinity,
      },
    );
  });
  return (
    <>
      <span class="flex justify-center items-center bg-base-100 rounded-btn shrink-0 flex-wrap gap-1 p-1 m-1">
        {props.children}
        <For each={bgProps}>
          {(bgProp) => (
            <Switch fallback={<span class={`${bgProp} w-2 h-4 rounded-full`} />}>
              <Match when={props.animation}>
                <span class={`${bgProp} loop-alternate-infinity w-2 h-4 rounded-full`} />
              </Match>
            </Switch>
          )}
        </For>
      </span>
    </>
  );
};

export default ThemePreview;
