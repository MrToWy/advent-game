import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import { SiChakraui, SiNotion, SiNextdotjs } from "react-icons/si";

export const Footer = () => {
	return (
		<VStack padding={4} w="full">
			<Text fontSize="xs">Developed for Phie </Text>
			<HStack>
				<SiChakraui />
				<SiNotion />
				<SiNextdotjs />
			</HStack>
			<Text fontSize="xs">
				by{" "}
				<Link
					href="https://github.com/heyralfs"
					textDecor="underline"
					target="_blank"
				>
					heyralfs
				</Link> and {" "}
				<Link
					href="https://github.com/MrToWy"
					textDecor="underline"
					target="_blank"
				>
					Tobi
				</Link>
			</Text>
		</VStack>
	);
};
