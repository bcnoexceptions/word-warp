import * as React from "react";

import { MainGame } from "./components/mainGame";
import { Menu } from "./components/menu";

class App extends React.Component {
	public render() {
		return (
			<div>
				<Menu />
				<MainGame />
			</div>
		);
	}
}

export default App;
