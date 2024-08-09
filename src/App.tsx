import { useEffect, useState } from "react";
import { NoMind } from "./nomind";
import { usePageSize } from "./effect";

export default function MindPage() {
  const [nomind, setNomind] = useState<NoMind>()

  const pageClientSize = usePageSize();

  useEffect(() => {
    const _nomind = new NoMind({
      el: document.getElementById("dom")!,
    });

    

    _nomind.render();

    setNomind(nomind)
    return () => {

      _nomind.destroy();
    };
  }, []);

  if (!pageClientSize) {
    return null;
  }

  return (
    <>
      <div
        id="dom"
        style={{
          width: pageClientSize.width,
          height: pageClientSize.height,
          position: "relative",
        }}
      ></div>
    </>
  );
}
