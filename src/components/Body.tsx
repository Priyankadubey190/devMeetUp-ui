import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, type IUser } from "../redux/userSlice";
import React, { useEffect, useState } from "react";

interface RootState {
  user: IUser | null;
}

const Body: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((store: RootState) => store.user);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  const fetchUser = async (): Promise<void> => {
    // If user already in redux, no need to fetch
    if (userData) {
      setIsCheckingAuth(false);
      return;
    }

    // Don't check auth if already on login page
    if (location.pathname === "/login") {
      setIsCheckingAuth(false);
      return;
    }

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
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Show full-page loader while checking auth
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

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
