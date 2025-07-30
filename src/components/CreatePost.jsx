import React, { useState } from "react";

export default function CreatePost({
  handleSubmit,
  setShowModal,
  showModal,
  postContent,
  setPostContent,
  setPostLink,
  postLink,
}) {
  return (
    <>
      {/* Click-to-open input */}
      <div
        className="bg-white p-4 rounded-xl shadow-sm mb-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setShowModal(true)}
      >
        <div className="text-gray-500">Start a post...</div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Post</h2>

            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What do you want to talk about?"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Attach a link (optional)"
              value={postLink}
              onChange={(e) => setPostLink(e.target.value)}
              className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSubmit}
              className="mt-4 w-fit bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 w-full"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );
}
