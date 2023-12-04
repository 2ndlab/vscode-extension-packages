// ESM
import fs from "node:fs/promises";
import { licenseName, packageJSONName } from "./src/constants.js";
import {
	PackageJSON,
	checkFolderAccess,
	exec,
	getFullPath,
	outputFolder,
	packagesFolder,
	updateLicense,
	updatePackageJSON,
	workspaceFolder,
} from "./src/utils.js";

async function packageExtensionPack(
	packagesFolder: string,
	outputFolder: string,
) {
	try {
		await checkFolderAccess([outputFolder, packagesFolder]);
		for await (const folderName of await fs.readdir(packagesFolder)) {
			const folder = getFullPath(packagesFolder, folderName);
			await updateLicense(folder, licenseName);
			await updatePackageJSON(folder, packageJSONName);

			const file = await fs.readFile(getFullPath(folder, packageJSONName));
			const { displayName } = JSON.parse(file.toString()) as PackageJSON;
			const { stdout, stderr } = await exec(
				`vsce package --out ${outputFolder}`,
				{
					cwd: folder,
				},
			);

			console.log(`Processing: ${displayName}`);
			console.log(stdout);
			console.log(stderr);
		}
	} catch (error) {
		console.error(error);
	}
}

await updateLicense(workspaceFolder, licenseName);

await packageExtensionPack(packagesFolder, outputFolder);
