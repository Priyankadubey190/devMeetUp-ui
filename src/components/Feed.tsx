import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";
import type { IUser } from "../redux/userSlice";

interface RootState {
  feed: IUser[] | null;
}

interface IFeedResponse {
  data: IUser[];
}

const Feed: React.FC = () => {
  const feed = useSelector((store: RootState) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFeed = async (): Promise<void> => {
    if (feed && feed.length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get<IFeedResponse>(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch feed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-xl font-semibold">
        No new users found!
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
