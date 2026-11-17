import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cursor = document.getElementById("agencyCursor");
    if (!cursor) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        cursor.classList.add("is-visible");
        frame = 0;
      });
    };
    const hover = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle("is-hovering", Boolean(target?.closest("a, button, input, textarea, select, [role='button']")));
    };
    const hide = () => cursor.classList.remove("is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", hover, { passive: true });
    document.addEventListener("pointerout", hover, { passive: true });
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", hover);
      document.removeEventListener("pointerout", hover);
      window.removeEventListener("blur", hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div id="agencyCursor" className="agency-cursor" aria-hidden="true" />;
}
