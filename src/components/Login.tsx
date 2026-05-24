import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addUser, type IUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

interface ILoginResponse {
  message: string;
  user: IUser;
}
interface ISignUpResponse {
  message: string;
  user: IUser;
}

const Login: React.FC = () => {
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    try {
      const res = await axios.post<ILoginResponse>(
        `${BASE_URL}/auth/login`,
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError<string>;
      setError(axiosError?.response?.data || "Login failed. Please try again.");
    }
  };

  const handleSignUp = async (): Promise<void> => {
    try {
      const res = await axios.post<ISignUpResponse>(
        `${BASE_URL}/auth/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      const axiosError = err as AxiosError<string>;
      setError(
        axiosError?.response?.data || "Signup failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFirstName(e.target.value)
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLastName(e.target.value)
                    }
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="email"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmailId(e.target.value)
                }
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </label>
          </div>

          {error && <p className="text-error text-sm text-center">{error}</p>}

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary w-full"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2 text-sm hover:underline"
            onClick={() => {
              setError(""); // Clear error when switching modes
              setIsLoginForm((value) => !value);
            }}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
