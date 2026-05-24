import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../redux/requestSlice";
import type { IUser } from "../redux/userSlice";

interface IConnectionRequest {
  _id: string;
  status: "interested" | "ignored" | "accepted" | "rejected";
  fromUserId: IUser;
}

interface RootState {
  requests: IConnectionRequest[] | null;
}

interface IRequestResponse {
  data: IConnectionRequest[];
}

const Requests: React.FC = () => {
  const requests = useSelector((store: RootState) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (
    status: "accepted" | "rejected",
    _id: string,
  ): Promise<void> => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Failed to review request:", err);
    }
  };

  const fetchRequests = async (): Promise<void> => {
    try {
      const res = await axios.get<IRequestResponse>(
        `${BASE_URL}/user/requests/received`,
        { withCredentials: true },
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch requests:", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl">No Requests Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10 max-w-4xl mx-auto">
      <h1 className="font-bold text-white text-3xl mb-6">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex flex-col md:flex-row justify-between items-center m-4 p-4 rounded-lg bg-base-300 shadow-lg"
          >
            <div className="flex items-center w-full md:w-auto">
              <img
                alt={`${firstName}'s photo`}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                src={photoUrl || "https://via.placeholder.com/150"}
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm opacity-80">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-sm italic line-clamp-1">{about}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                className="btn btn-error btn-sm md:btn-md"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success btn-sm md:btn-md"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
