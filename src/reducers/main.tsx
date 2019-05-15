import { WWAction } from "../actions/main";
import { AppState } from "../models/wwState";
import lettersReducer from "./letters";
import menuReducer from "./menu";

export default function rootReducer(state: AppState = new AppState(), action: WWAction) {
	state = lettersReducer(state, action);
	state = menuReducer(state, action);
	return state;
}
