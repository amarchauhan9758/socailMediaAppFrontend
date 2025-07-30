import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/services";
import { ToastContainer, toast } from "react-toastify";

function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [openLoader, setOpenLoader] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skillsInput, setSkillsInput] = useState(
    user?.skills?.join(", ") || ""
  );
  const [profileURL, setProfileURL] = useState(user?.profileURL || "");
  const [error, setError] = useState(null);

  const handleUpdateProfile = async () => {
    setError(null);

    if (!firstName || !lastName || !age || !profileURL || !gender) {
      setError({ message: "Please fill in all fields." });
      return;
    }

    if (isNaN(age) || parseInt(age) <= 0) {
      setError({ message: "Please enter a valid age." });
      return;
    }

    const skills = skillsInput
      ?.split(",")
      ?.map((s) => s.trim())
      ?.filter(Boolean);

    try {
      setOpenLoader(true);
      const response = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          age,
          about,
          gender,
          profileURL,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response?.data));
      setOpenLoader(false);
      toast.success(response?.data?.message);
      console.log("Profile updated", response?.data);
    } catch (err) {
      setOpenLoader(false);
      toast.error(err.message || "Failed to update profile.");
    }
  };

  const inputStyles =
    "w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500";

  return (
    <div className="   flex items-center justify-center p-6">
      <div className="bg-gray-200  rounded-2xl shadow-md p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Edit Profile
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              First Name
            </label>
            <input
              className={inputStyles}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              type="text"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Last Name
            </label>
            <input
              className={inputStyles}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              type="text"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Age
            </label>
            <input
              className={inputStyles}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              type="number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Profile Image URL
            </label>
            <input
              className={inputStyles}
              value={profileURL}
              onChange={(e) => setProfileURL(e.target.value)}
              placeholder="https://yourphoto.jpg"
              type="text"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Gender
            </label>
            <select
              className={inputStyles}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Skills (comma separated)
            </label>
            <input
              className={inputStyles}
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="React, JavaScript, Tailwind"
              type="text"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              About
            </label>
            <textarea
              className={`${inputStyles} resize-none`}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
              placeholder="Tell us something about yourself..."
            ></textarea>
          </div>

          {error && (
            <p className="md:col-span-2 text-red-600 font-medium">
              {error?.message}
            </p>
          )}

          <div className="md:col-span-2 flex justify-center">
            <button
              disabled={openLoader}
              onClick={handleUpdateProfile}
              className={`flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition-all ${
                openLoader ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {openLoader ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
