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

type FeedState = IUser[] | null;

const initialState: FeedState = null;

const feedSlice = createSlice({
  name: "feed",
  initialState: initialState as FeedState,
  reducers: {
    addFeed: (state, action: PayloadAction<IUser[]>) => {
      void state;
      return action.payload;
    },

    removeUserFromFeed: (state, action: PayloadAction<string>) => {
      if (!state) return null;

      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
