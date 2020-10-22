#!/usr/bin/env node
require("yargs")
	.command("add", "Adds to the workspace", (yargs) => {
		yargs.positional('workspace', {
			type: 'string',
			describe: "which workspace",
			alias: "s",
			demandOption: true
		})
		yargs.positional('package', {
			type: 'string',
			describe: 'package to download',
			alias: "p",
			demandOption: true
		});
	}, function (argv) {
		return `yarn workspace ${argv.s} add ${argv.p}`
	})
	.command("remove", "Removes from the workspace")
	.help()
	.alias("help", "h")
	.argv;