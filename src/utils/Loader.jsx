import React, { useRef, useEffect } from "react";

function Loader({ openLoader }) {
  const refLoader = useRef(null);

  useEffect(() => {
    const dialog = refLoader.current;

    if (openLoader && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!openLoader && dialog && dialog.open) {
      dialog.close();
    }
  }, [openLoader]);

  return (
    <dialog
      ref={refLoader}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop:bg-black/40"
    >
      <div className="bg-white w-52 py-8 px-6 rounded-xl shadow-xl text-center">
        <h3 className="text-base font-semibold mb-3">Please Wait...</h3>
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
      </div>
    </dialog>
  );
}

export default Loader;
