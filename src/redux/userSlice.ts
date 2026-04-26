import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId: string;
  photoUrl?: string;
  age?: number;
  gender?: string;
  about?: string;
  skills?: string[];
  isPremium?: boolean;
  membershipType?: string;
}

const initialState: IUser | null = null as IUser | null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      return action.payload;
    },

    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
