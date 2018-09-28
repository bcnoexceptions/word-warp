import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/main";

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        {},
        applyMiddleware()
        // middleware placeholder
    );

    if (module.hot) {
        module.hot.accept("./reducers/main", () => {
            const nextRootReducer = require("./reducers/main").default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};
