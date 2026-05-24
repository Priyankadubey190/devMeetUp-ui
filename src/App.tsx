import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

import Body from "./components/Body";

const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./components/Profile"));
const Feed = lazy(() => import("./components/Feed"));
const Connections = lazy(() => import("./components/Connections"));
const Requests = lazy(() => import("./components/Requests"));
const Premium = lazy(() => import("./components/Premium"));
const Chat = lazy(() => import("./components/Chat"));

const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>
);

const App: React.FC = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="premium" element={<Premium />} />
              <Route path="chat/:targetUserId" element={<Chat />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
