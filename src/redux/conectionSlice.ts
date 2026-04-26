import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  firstName: string;
  lastName?: string;
  photoUrl?: string;
  age?: number;
  gender?: string;
  about?: string;
}

type ConnectionState = IUser[] | null;

const initialState: ConnectionState = null;

const connectionSlice = createSlice({
  name: "connection",
  initialState: initialState as ConnectionState,
  reducers: {
    addConnections: (state, action: PayloadAction<IUser[]>) => {
      return action.payload;
    },

    removeConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
