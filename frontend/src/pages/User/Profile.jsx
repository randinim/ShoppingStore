import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Update Profile
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-black mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-input p-2 rounded-sm w-full text-black"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-input p-2 rounded-sm w-full text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-input p-2 rounded-sm w-full text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input p-2 rounded-sm w-full text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
            >
              Update
            </button>
            <Link
              to="/user-orders"
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
            >
              My Orders
            </Link>
          </div>
        </form>
      </div>
      {loadingUpdateProfile && <Loader />}
    </div>
  );
};

export default Profile;
