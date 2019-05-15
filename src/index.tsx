import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "./configureStore";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

export function mainRender() {
	const App = require("./App").default;
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById("root") as HTMLElement
	);
}

function errorRender(error: any) {
	const RedBox = require("redbox-react").default;
	ReactDOM.render(<RedBox error={error} />, document.getElementById("root") as HTMLElement);
}

registerServiceWorker();

if (module.hot && process.env.NODE_ENV !== "production") {
	const renderWithErrorCheck = () => {
		try {
			mainRender();
		} catch (error) {
			// tslint:disable-next-line:no-console
			console.error(error);
			errorRender(error);
		}
	};
	module.hot.accept("./App", () => {
		setTimeout(renderWithErrorCheck);
	});
}

mainRender();
