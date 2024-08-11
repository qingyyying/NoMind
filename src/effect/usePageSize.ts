import { useEffect, useState } from "react";

export function usePageSize() {
  const [state, setState] = useState(() => {
    const el = document.getElementById("root")!;
    return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
  });


  useEffect(() => {
    const el = document.getElementById("root")!;
    if (!el) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target;
        setState({ width: clientWidth, height: clientHeight });
      });
    });
    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return state;
}
