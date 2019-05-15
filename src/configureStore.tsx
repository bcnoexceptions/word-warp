import { applyMiddleware, createStore } from "redux";
import { AppState } from "./models/wwState";
import rootReducer from "./reducers/main";

export const configureStore = (initialState?: AppState) => {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware()
		// middleware placeholder
	);

	if (module.hot && process.env.NODE_ENV !== "production") {
		module.hot.accept("./reducers/main", () => {
			const nextRootReducer = require("./reducers/main").default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};
