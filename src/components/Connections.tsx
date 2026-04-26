import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../redux/conectionSlice";
import type { IUser } from "../redux/userSlice";

interface RootState {
  connections: IUser[] | null;
}

interface IConnectionsResponse {
  data: IUser[];
  message?: string;
}

const Connections: React.FC = () => {
  const connections = useSelector((store: RootState) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async (): Promise<void> => {
    try {
      const res = await axios.get<IConnectionsResponse>(
        `${BASE_URL}/user/connections`,
        {
          withCredentials: true,
        },
      );

      dispatch(addConnections(res.data.data));
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch connections:", error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null) return null;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-full md:w-1/2 mx-auto items-center shadow-md"
          >
            <div className="shrink-0">
              <img
                alt={`${firstName}'s profile`}
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl || "https://via.placeholder.com/150"}
              />
            </div>
            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm opacity-70">
                  {age}, {gender}
                </p>
              )}
              <p className="line-clamp-2">{about}</p>
            </div>
            <Link to={`/chat/${_id}`}>
              <button className="btn btn-primary btn-sm md:btn-md">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
