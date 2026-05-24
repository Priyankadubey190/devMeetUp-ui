import { io, type Socket } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = (): Socket => {
  return io(BASE_URL, {
    withCredentials: true,
  });
};
