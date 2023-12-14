export const updateMetaThemeColor = () => {
  const themeColor = window.getComputedStyle(document.querySelector(":root")!).getPropertyValue("--p");

  if (document.querySelectorAll('meta[name="theme-color"]').length > 0) {
    var metaThemeColor = document.querySelector("meta[name=theme-color]")!;
    metaThemeColor.setAttribute("content", `oklch(${themeColor})`);
  } else {
    var link = document.createElement("meta");
    link.setAttribute("name", "theme-color");
    link.content = `oklch(${themeColor})`;
    document.getElementsByTagName("head")[0].appendChild(link);
  }
};
