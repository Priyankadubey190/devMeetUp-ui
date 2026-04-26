import { io, type Socket } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = (): Socket => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", {
      path: "/api/socket.io",
    });
  }
};
