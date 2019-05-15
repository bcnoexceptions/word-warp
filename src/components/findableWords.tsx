import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../models/wwState";
import "./styles/findableWords.css";

interface FindableWordsProps {
	foundWords: string[];
	allWords: string[];
}

interface FindableWordsState {
	_unused: any;
}

class FindableWordsImpl extends React.Component<FindableWordsProps, FindableWordsState> {
	public render(): JSX.Element {
		let someAreLong = !!this.props.allWords.find(word => word.length > 10);

		let wordDisps: JSX.Element[] = [];
		for (let i = 0; i < this.props.allWords.length; i++) {
			let word = this.props.allWords[i];
			if (this.props.foundWords.indexOf(word) >= 0) {
				wordDisps.push(<FoundWord key={i} word={word} />);
			} else {
				wordDisps.push(<NotFoundWord key={i} word={word} />);
			}
		}

		let className = someAreLong ? "findableWords someAreLong" : "findableWords";

		return <ul className={className}>{wordDisps}</ul>;
	}
}

let FindableWords = connect(
	(state: AppState) => ({
		allWords: state.allSubWordsThisRound,
		foundWords: state.foundWords,
	}),
	{
		// Map dispatch to props
	}
)(FindableWordsImpl);

export { FindableWords };

interface IFoundWordProps {
	word: string;
}

const FoundWord: React.FunctionComponent<IFoundWordProps> = props => {
	return <li className="found">{props.word}</li>;
};

interface INotFoundWordProps {
	word: string;
}

const NotFoundWord: React.FunctionComponent<INotFoundWordProps> = props => {
	return <li className="notFound">{props.word.split("").map(char => "_")}</li>;
};
