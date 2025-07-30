import React, { useEffect, useRef } from "react";

function ApiErrorMessage({ setOpenApiModel, openApiModel, errorMessage }) {
  const refLoader = useRef();

  useEffect(() => {
    if (openApiModel) {
      refLoader.current?.showModal();
    } else {
      refLoader.current?.close();
    }
  }, [openApiModel]);

  return (
    <dialog
      ref={refLoader}
      className="fixed inset-0 shadow-xl border-2 rounded-xl flex items-center justify-center  z-50"
    >
      <div className="bg-white w-80 max-w-full p-8  rounded-lg ">
        <h3 className="font-semibold text-lg text-center text-red-600 mb-4">
          {errorMessage || "Something went wrong!"}
        </h3>
        <div className="text-right">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={() => setOpenApiModel(false)}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ApiErrorMessage;
