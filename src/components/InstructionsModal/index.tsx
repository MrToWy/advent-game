import {
	Heading,
	HStack,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FakeInput } from "./FakeInput";

interface InstructionsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const InstructionsModal = ({
	isOpen,
	onClose,
}: InstructionsModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent padding={6}>
				<VStack spacing={2} alignItems="flex-start">
					<Heading fontSize="lg">Liebe Phie</Heading>

					<Text fontSize="sm">
						du magst Rätsel und Musik und heute beginnt der Monat Dezember. Das ist die perfekte Gelegenheit für einen Adventskalender der das alles kombiniert.
					</Text>
					<Text fontSize="sm">
						Ich hoffe er gefällt dir.
					</Text>


					<Text fontSize="sm">
						Nachdem du 5 Songkarten gesammelt hast, befolge die Aufgabe oben auf der Seite & gebe die Lösung ein. Ähnlich wie bei Wordle, wird dir angezeigt, ob du richtig liegst.
					</Text>

					<HStack>
						<FakeInput value={1} status="correct" />
						<FakeInput value={2} status="incorrect" />
						<FakeInput value={3} status="incorrect" />
						<FakeInput value={4} status="incorrect" />
						<FakeInput value={5} status="incorrect" />
					</HStack>

					<Text fontSize="sm">
						Viel Spaß und sag Bescheid wenn du einen Tipp brauchst. Ich gehe aber fest davon aus, dass jedes Rätsel beim ersten Versuch so aussehen wird:
					</Text>


					<HStack>
						<FakeInput value={3} status="correct" />
						<FakeInput value={4} status="correct" />
						<FakeInput value={1} status="correct" />
						<FakeInput value={2} status="correct" />
						<FakeInput value={5} status="correct" />
					</HStack>

					<Text fontSize="sm">Liebe Grüße</Text>
					<Text fontSize="sm">Tobi</Text>
				</VStack>
			</ModalContent>
		</Modal>
	);
};
