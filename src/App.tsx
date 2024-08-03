import { useEffect, useRef, useState } from "react";
import { NetaGraph, RendererType } from "neta-render/es";
import { NoMind } from "./nomind";
import { usePageSize } from "./effect";

export default function MindPage() {
  const appRef = useRef<NoMind>();

  const pageClientSize = usePageSize();

  useEffect(() => {
    appRef.current = new NoMind({
      el: document.getElementById("dom")!,
    });

    appRef.current.render();

    return () => {
      appRef.current!.destroy();
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
