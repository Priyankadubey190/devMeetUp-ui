import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, type IUser } from "../redux/userSlice"; // Check path consistency
import React, { useEffect } from "react";

interface RootState {
  user: IUser | null;
}

const Body: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store: RootState) => store.user);

  const fetchUser = async (): Promise<void> => {
    if (userData) return;

    try {
      const res = await axios.get<IUser>(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Fetch user failed:", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow overflow-auto pb-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
