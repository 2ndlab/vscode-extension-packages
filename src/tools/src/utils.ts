import child_process from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import util from "node:util";
import packageJSON from "../../../data/data.json";
import { outputFolderName, packagesFolderName } from "./constants.js";
import settings from "./settings.js";

import.meta.env = process.env;

export const getFullPath = (parentPath: string, name: string): string =>
	path.join(parentPath, path.sep, name);

/**
 * @description Create folder and check folder access
 */
export const checkFolderAccess = async (folderPathArray: string[]) => {
	try {
		for await (const folderPath of folderPathArray) {
			await fs.mkdir(folderPath, { recursive: true });
			await fs.access(folderPath, fs.constants.R_OK | fs.constants.W_OK);
		}
	} catch (error) {
		console.error(error);
	}
};

export const updateLicense = async (
	licensePath: string,
	licenseName: string,
) => {
	try {
		const license = getFullPath(licensePath, licenseName);
		const file = await fs.readFile(license);
		const string = `${file.toString()}`.replace(
			/(^Copyright.*)\s(\d+)\s(.*)/m,
			`$1 ${new Date().getFullYear()} $3`,
		);
		await fs.writeFile(license, string);
	} catch (error) {
		console.error(error);
	}
};

export type PackageJSON = typeof packageJSON;

export const exec = util.promisify(child_process.exec);

export const workspaceFolder = path.resolve(
	path.dirname(url.fileURLToPath(import.meta.url)),
	"../../..",
);

export const packagesFolder = getFullPath(workspaceFolder, packagesFolderName);

export const outputFolder = getFullPath(workspaceFolder, outputFolderName);
export const updatePackageJSON = async (
	packageJSONPath: string,
	packageJSONName: string,
) => {
	try {
		const packageJSON = getFullPath(packageJSONPath, packageJSONName);

		await updateJSON(packageJSON);

		const { stdout, stderr } = await exec(
			`pnpm exec prettier ${packageJSON} --write`,
			{
				cwd: packageJSONPath,
			},
		);

		console.log(`Lint file: ${packageJSON}`);
		console.log(stdout);
		console.log(stderr);
	} catch (error) {
		console.error(error);
	}
};

const updateJSON = async (packageJSON: string) => {
	try {
		const file = await fs.readFile(packageJSON);
		const data = JSON.parse(file.toString()) as PackageJSON;

		data.author = settings.author;
		data.homepage = settings.homepage;
		data.repository = settings.repository;
		data.publisher = settings.publisher;
		data.license = settings.license;
		data.extensionPack = normalizeIdentifiers(data.extensionPack);

		if (Array.isArray(data.extensionDependencies)) {
			data.extensionDependencies = normalizeIdentifiers(
				data.extensionDependencies,
			);
		}
		// TODO: update engines from `extensions.json`.
		await fs.writeFile(packageJSON, JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
};

/**
 * @description Normalize vscode extension identifiers list
 * @param identifiers vscode extension identifiers
 * @returns normalized identifiers list
 */
const normalizeIdentifiers = (identifiers: string[]) =>
	identifiers.map((identifier) => identifier.toLowerCase());
