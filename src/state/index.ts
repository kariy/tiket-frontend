import { configureStore } from "@reduxjs/toolkit";

import { themeReducer } from "./Theme";
import { userReducer } from "./User/slice";
import { toggleableReducer } from "./Toggle/slice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		theme: themeReducer,
		toggleable: toggleableReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
