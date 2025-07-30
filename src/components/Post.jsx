import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/services";
import { formatDistanceToNow } from "date-fns";
import CreatePost from "./CreatePost";
import Loader from "../utils/loader";
import ApiErrorMessage from "../utils/ApiErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function Post() {
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [openLoader, setOpenLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openApiModel, setOpenApiModel] = useState(false);
  const [postLink, setPostLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [getAllPost, setGetAllPost] = useState([]);

  const filteredPosts = getAllPost.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSubmit = async () => {
    setShowModal(true);
    try {
      setOpenLoader(true);
      const content = postContent;
      const response = await axios.post(
        BASE_URL + "/post",
        {
          content,
        },
        {
          withCredentials: true,
        }
      );
      setShowModal(false);
      toast.success(response?.data?.message);
      setPostContent("");
    } catch (error) {
      //   setOpenLoader(false);

      toast(error.message);
      setErrorMessage(error?.message);
    }
  };

  const postData = async () => {
    const resposneData = await axios.get(BASE_URL + "/getAllPost", {
      withCredentials: true,
    });
    setGetAllPost(resposneData.data);
  };

  useEffect(() => {
    postData();
  }, [postContent]);

  //
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row p-4 gap-4">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-1/4">
          {/* Left content like profile summary etc. */}
        </aside>

        {/* Center Feed */}
        <main className="w-full ">
          <CreatePost
            postLink={postLink}
            postContent={postContent}
            setPostLink={setPostLink}
            setPostContent={setPostContent}
            handleSubmit={handleSubmit}
            showModal={showModal}
            setShowModal={setShowModal}
          />

          {filteredPosts.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              No matching posts found.
            </p>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-8 rounded-xl shadow-sm mb-4"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold uppercase">
                    {post?.owner?.firstName?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{post?.owner?.firstName}</p>
                    <p className="text-sm text-gray-500">{post.title}</p>
                    <p className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-800 mb-3">{post.content}</p>

                {/* Horizontal Action Bar */}
                <div className="border-t pt-2 flex justify-between items-center text-sm text-gray-600">
                  <button className="flex items-center  font-semibold  gap-1 hover:text-blue-600 transition">
                    <i className="ri-thumb-up-line"></i>
                    Like
                  </button>
                  <button className="flex items-center font-semibold  gap-1 hover:text-blue-600 transition">
                    <i className="ri-chat-3-line"></i>
                    Comment
                  </button>
                  <button className="flex items-center font-semibold  gap-1 hover:text-blue-600 transition">
                    <i className="ri-share-forward-line"></i>
                    Share
                  </button>
                  <button className="flex items-center font-semibold  gap-1 hover:text-blue-600 transition">
                    <i className="ri-flag-line"></i>
                    Report
                  </button>
                </div>
              </div>
            ))
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden md:block w-1/4">
          {/* Suggestions, ads, etc. */}
        </aside>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Post;
