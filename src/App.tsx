import { useEffect, useRef, useState } from "react";
import { NetaGraph, RendererType } from "neta-render/es";
import { XsMind } from "./xsmind";
import { usePageSize } from "./effect";

export default function MindPage() {
  const appRef = useRef<XsMind>();

  const pageClientSize = usePageSize();

  useEffect(() => {
    appRef.current = new XsMind({
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
