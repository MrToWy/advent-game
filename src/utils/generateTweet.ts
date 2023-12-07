export function generateTweet(
	results: string[][],
	gameNumber: number,
	won: boolean
) {
	const validAttempts = results.filter((attempt) => attempt[0].length);

	const resultsInEmojis = validAttempts
		.map((attempt) => {
			return attempt
				.map((item) => {
					if (item === "correct") {
						return "🟩";
					}
					if (item === "partial") {
						return "🟨";
					}
					return "🟥";
				})
				.join("");
		})
		.join("\n");

	return `${gameNumber} ${
		won ? `${validAttempts.length}/5` : "☠️"
	}\n\n${resultsInEmojis}\n\nadvent.tobii.uber.space`;
}
