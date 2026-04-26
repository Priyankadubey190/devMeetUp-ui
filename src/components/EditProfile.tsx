import React, { useState } from "react";
import UserCard from "./UserCard";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser, type IUser } from "../redux/userSlice";

interface EditProfileProps {
  user: IUser;
}

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState<string>(user.photoUrl || "");
  const [age, setAge] = useState<number | string>(user.age || "");
  const [gender, setGender] = useState<string>(user.gender || "");
  const [about, setAbout] = useState<string>(user.about || "");
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const dispatch = useDispatch();

  const saveProfile = async (): Promise<void> => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      const axiosError = err as AxiosError<string>;
      setError(axiosError.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center my-10 gap-10">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center font-bold">
                Edit Profile
              </h2>

              <div className="space-y-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Photo URL:</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <textarea
                    value={about}
                    className="textarea textarea-bordered h-24 w-full"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>

              {error && <p className="text-error text-sm mt-2">{error}</p>}

              <div className="card-actions justify-center mt-6">
                <button
                  className="btn btn-primary w-full"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Profile Preview</h2>
          <UserCard
            user={{
              _id: user._id,
              firstName,
              lastName,
              photoUrl,
              age: Number(age),
              gender,
              about,
            }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
