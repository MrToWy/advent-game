export interface LocalStorageObject {
	stats: {
		games: number;
		wins: number;
		histo: number[];
	};
	state: {
		lastGame: number;
		tries: number[][];
		gameOver: boolean;
		won: boolean;
	};
}

type GameOverParams = {
	lastAttemptNumber: number;
	lastTry: number[];
	won: boolean;
};

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

const localItemName = "sequence-game";

function getLocalStorageObject(): LocalStorageObject | undefined {
	const localStorageObject = localStorage.getItem(localItemName);
	if (!localStorageObject) return undefined;
	return JSON.parse(localStorageObject);
}

function createLocalStorageObject(gameNumber: number): void {
	const localStorageObject: LocalStorageObject = {
		stats: {
			games: 0,
			wins: 0,
			histo: [0, 0, 0, 0, 0, 0],
		},
		state: {
			lastGame: gameNumber,
			tries: [],
			gameOver: false,
			won: false,
		},
	};
	localStorage.setItem(localItemName, JSON.stringify(localStorageObject));
}

function updateTries(currentTry: number[]): void {
	const localStorageObject = getLocalStorageObject();
	if (!localStorageObject) return;

	localStorageObject.state.tries.push(currentTry);
	localStorage.setItem(localItemName, JSON.stringify(localStorageObject));
}

function clearLocalStorageState(gameNumber: number): void {
	const localStorageObject = getLocalStorageObject();
	if (!localStorageObject) return;

	localStorageObject.state = {
		lastGame: gameNumber,
		tries: [],
		gameOver: false,
		won: false,
	};
	localStorage.setItem(localItemName, JSON.stringify(localStorageObject));
}

function setGameOver({
	lastAttemptNumber,
	lastTry,
	won,
}: GameOverParams): void {
	const localStorageObject = getLocalStorageObject();
	if (!localStorageObject) return;

	const { stats, state } = localStorageObject;

	localStorageObject.stats = {
		...stats,
		games: stats.games + 1,
		wins: won ? stats.wins + 1 : stats.wins,
	};
	if (won) {
		localStorageObject.stats.histo[lastAttemptNumber - 1]++;
	} else {
		localStorageObject.stats.histo[5]++;
	}

	state.tries.push(lastTry);
	localStorageObject.state = {
		...state,
		gameOver: true,
		won,
		tries: state.tries,
	};

	localStorage.setItem(localItemName, JSON.stringify(localStorageObject));
}

export const localStorageHandlers = {
	get: getLocalStorageObject,
	create: createLocalStorageObject,
	updateTries,
	setGameOver,
	clearGameData: clearLocalStorageState,
};
