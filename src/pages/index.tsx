import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { IoInformationCircle } from "react-icons/io5";

import { AttemptField } from "../components/AttemptField";
import { Button } from "../components/Button";
import { Instructions } from "../components/Instructions";
import { Results } from "../components/Results";
import { useSequenceContext } from "../contexts/SequenceContext";
import { createSequence } from "../utils/createSequence";

interface HomeProps {
	sequence: string[];
}

const Home: NextPage<HomeProps> = ({ sequence: ssrSequence }) => {
	const { currentAttempt, playedToday, setSequence } = useSequenceContext();
	const [openInstructions, setOpenInstructions] = useState(false);

	const attemptRef1 = useRef<HTMLButtonElement>(null);
	const attemptRef2 = useRef<HTMLButtonElement>(null);
	const attemptRef3 = useRef<HTMLButtonElement>(null);
	const attemptRef4 = useRef<HTMLButtonElement>(null);
	const attemptRef5 = useRef<HTMLButtonElement>(null);

	const attempts = [
		attemptRef1,
		attemptRef2,
		attemptRef3,
		attemptRef4,
		attemptRef5,
	];

	const handleAttempt = () => {
		attempts[currentAttempt - 1].current?.click();
	};

	useEffect(() => {
		const sequenceLocalItem = localStorage.getItem("sequence-game");

		if (!sequenceLocalItem) {
			localStorage.setItem("sequence-game", "{}");
			setOpenInstructions(true);
		}

		setSequence(ssrSequence);
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div style={{ width: "420px", margin: "auto" }}>
				<h1 style={{ textAlign: "center", fontSize: "3rem" }}>
					SEQUENCE #1
				</h1>

				<AttemptField attemptNumber={1} ref={attemptRef1} />

				<AttemptField attemptNumber={2} ref={attemptRef2} />

				<AttemptField attemptNumber={3} ref={attemptRef3} />

				<AttemptField attemptNumber={4} ref={attemptRef4} />

				<AttemptField attemptNumber={5} ref={attemptRef5} />

				<Button
					text="SUBMIT"
					type="button"
					onClick={handleAttempt}
					disabled={currentAttempt > 5}
				/>
			</div>

			<IoInformationCircle
				color="var(--off-white)"
				onClick={() => setOpenInstructions(true)}
				title="Show instructions"
				size={20}
				style={{
					position: "absolute",
					top: "16px",
					left: "16px",
					cursor: "pointer",
				}}
			/>

			<Modal
				isOpen={!!playedToday}
				className="modal"
				overlayClassName="modal-overlay"
			>
				<Results />
			</Modal>

			<Modal
				isOpen={openInstructions}
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
				onRequestClose={() => setOpenInstructions(false)}
				className="modal"
				overlayClassName="modal-overlay"
			>
				<Instructions />
			</Modal>
		</>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	return {
		props: {
			sequence: createSequence(),
		},
	};
};
