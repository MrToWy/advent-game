export interface LocalStorageObject {
	stats: {
		games: number;
		wins: number;
		histo: number[];
	};
	state: {
		lastGame: number;
		tries: string[][];
		gameOver: boolean;
		won: boolean;
	};
}

//--------------------------------------------------------------------------------------------------------
//	Cases to cover:
//	## READ
//	✅ Get local storage obj (as a helper method to the functions of this module)
//	## CREATE
//	✅ Create local storage obj
//	## UPDATE
// 	✅ Clean the state, when the player already has a local storage obj and is starting a new game
//	✅ Update tries (when player makes an attempt)
//	✅ Game over (wheter the player won or lost) // Update stats, when the game is over
//--------------------------------------------------------------------------------------------------------

export function getLocalStorageObject(): LocalStorageObject {
	return JSON.parse(localStorage.getItem("sequence-game") || "{}");
}

export function createLocalStorageObject(gameNumber: number): void {
	const localStorageObject: LocalStorageObject = {
		stats: {
			games: 0,
			wins: 0,
			histo: [],
		},
		state: {
			lastGame: gameNumber,
			tries: [],
			gameOver: false,
			won: false,
		},
	};
	localStorage.setItem("sequence-game", JSON.stringify(localStorageObject));
}

export function updateTries(currentTry: string[]): void {
	const localStorageObject = getLocalStorageObject();
	localStorageObject.state.tries.push(currentTry);
	localStorage.setItem("sequence-game", JSON.stringify(localStorageObject));
}

export function clearLocalStorageState(gameNumber: number): void {
	const localStorageObject = getLocalStorageObject();
	localStorageObject.state = {
		lastGame: gameNumber,
		tries: [],
		gameOver: false,
		won: false,
	};
	localStorage.setItem("sequence-game", JSON.stringify(localStorageObject));
}

type GameOverParams = {
	lastAttemptNumber: number;
	lastTry: string[];
	won: boolean;
};

export function gameOver({
	lastAttemptNumber,
	lastTry,
	won,
}: GameOverParams): void {
	const localStorageObject = getLocalStorageObject();
	const { stats, state } = localStorageObject;

	localStorageObject.stats = {
		...stats,
		games: stats.games + 1,
		wins: won ? stats.wins + 1 : stats.wins,
	};
	localStorageObject.stats.histo[lastAttemptNumber - 1]++;

	state.tries.push(lastTry);
	localStorageObject.state = {
		...state,
		gameOver: true,
		won,
		tries: state.tries,
	};

	localStorage.setItem("sequence-game", JSON.stringify(localStorageObject));
}