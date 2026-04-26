import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/feedSlice";

interface IUserProps {
  user: {
    _id: string;
    firstName: string;
    lastName?: string;
    photoUrl?: string;
    age?: number;
    gender?: string;
    about?: string;
  };
}

type RequestStatus = "ignored" | "interested";

const UserCard: React.FC<IUserProps> = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (
    status: RequestStatus,
    userId: string,
  ): Promise<void> => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err: any) {
      console.error(
        "Failed to send request:",
        err?.response?.data?.message || err.message,
      );
    }
  };

  return (
    <div className="card bg-base-300 w-full max-w-md shadow-xl">
      <figure>
        <img
          src={photoUrl || "https://via.placeholder.com/150"}
          alt={`${firstName}'s photo`}
          className="h-64 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p>
            {age}, {gender}
          </p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center my-4 flex flex-wrap gap-4">
          <button
            className="btn btn-primary min-w-[120px]"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary min-w-[120px]"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
