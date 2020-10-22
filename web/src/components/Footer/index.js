import { Box, Text } from "grommet";
import React from "react";

const Footer = () => (
	<footer>
		<Box
			direction="row"
			justify="center"
			margin={{ top: "medium", bottom: "small" }}
		>
			<Text as="p">
				MicroFails is Discarded Floppy Disk{" "}
				<span role="img" aria-label="Floppy Disk and Trash bin emoji">
					💾 ➜ 🗑
				</span>
			</Text>
		</Box>
	</footer>
);

export default Footer;