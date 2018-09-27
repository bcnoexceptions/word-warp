import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/root";

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        {},
        applyMiddleware()
        // middleware placeholder
    );

    if (module.hot) {
        module.hot.accept("./reducers", () => {
            const nextRootReducer = require("./reducers").default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};
