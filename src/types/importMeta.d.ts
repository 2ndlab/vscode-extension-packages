// This file is an augmentation to the built-in ImportMeta interface
// Thus cannot contain any top-level imports
// <https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation>

interface ImportMetaEnv {
	[key: string]: any;
}

interface ImportMeta {
	/**
	 * @since Node 20
	 * @description Get env settings from workspace root `.env` file and process.env.
	 */
	env: ImportMetaEnv;
}
