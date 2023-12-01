import { HStack, VStack } from "@chakra-ui/react";
import { KeyboardButton } from "./KeyboardButton";
import { BsBackspaceFill } from "react-icons/bs";
import { useGameController } from "../../contexts";

export const Keyboard = () => {
	const {
		onNumberClick,
		onBackspaceClick,
		onSubmit,
		attemptNumber,
		showResults,
	} = useGameController();
	const isGameOver = attemptNumber > 5;

	return (
		<VStack spacing={2}>
			<HStack spacing={2}>
				{[2, 3, 4, 5, 6].map((n) => (
					<KeyboardButton key={n} onClick={() => onNumberClick(n-1)}>
						{n}
					</KeyboardButton>
				))}
			</HStack>
			<HStack spacing={2}>
				{[8, 9, 10, 11, 12].map((n) => (
					<KeyboardButton key={n} onClick={() => onNumberClick(n-7)}>
						{n}
					</KeyboardButton>
				))}
			</HStack>
			<HStack spacing={2}>
				{[14, 15, 16, 17, 18].map((n) => (
					<KeyboardButton key={n} onClick={() => onNumberClick(n-13)}>
						{n}
					</KeyboardButton>
				))}
			</HStack>
			<HStack spacing={2}>
				{[20, 21, 22, 23, 24].map((n) => (
					<KeyboardButton key={n} onClick={() => onNumberClick(n-19)}>
						{n}
					</KeyboardButton>
				))}
			</HStack>
			<HStack width="100%">
				<KeyboardButton onClick={onBackspaceClick}>
					<BsBackspaceFill />
				</KeyboardButton>
				<KeyboardButton
					full
					onClick={isGameOver ? showResults : onSubmit}
				>
					{isGameOver ? "Absenden" : "Enter"}
				</KeyboardButton>
			</HStack>
		</VStack>
	);
};
