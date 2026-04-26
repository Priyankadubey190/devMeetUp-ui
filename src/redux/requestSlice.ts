import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "./userSlice";

export interface IConnectionRequest {
  _id: string;
  status: "interested" | "ignored" | "accepted" | "rejected";
  fromUserId: IUser;
}

type RequestState = IConnectionRequest[] | null;

const initialState: RequestState = null;

const requestSlice = createSlice({
  name: "requests",
  initialState: initialState as RequestState,
  reducers: {
    addRequests: (state, action: PayloadAction<IConnectionRequest[]>) => {
      return action.payload;
    },

    removeRequest: (state, action: PayloadAction<string>) => {
      if (!state) return null; // Safety check
      return state.filter((r) => r._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
