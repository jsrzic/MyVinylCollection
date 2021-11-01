import React from "react";

export function IsMobile() {
  const [width, setWidth] = React.useState(undefined);

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width < 768;
}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});
