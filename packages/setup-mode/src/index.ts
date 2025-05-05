#!/usr/bin/env node
import * as fs from 'fs-extra';
import * as path from 'node:path';
import fetch from 'node-fetch'; // Use node-fetch v3 which supports ESM

// --- Constants ---
const GITHUB_REPO_OWNER = 'sylphlab';
const GITHUB_REPO_NAME = 'Playbook';
const GITHUB_FILE_PATH = 'docs/ai/custom_instructions_core.md';
const GITHUB_BRANCH = 'main';
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`;

const CUSTOM_MODES_FILENAME = 'custom_modes.json';
// TODO: Implement portable path detection for different OS (Windows, macOS, Linux)
// Potential libraries: 'env-paths', 'os' module checks
const ROO_EXTENSION_ID = 'rooveterinaryinc.roo-cline';
// For now, using the provided Windows path. This WILL break on other systems.
// biome-ignore lint/style: Required by TS's noUncheckedIndexedAccess for process.env
const CUSTOM_MODES_DIR_WINDOWS = path.join(process.env['APPDATA'] || '', 'Code', 'User', 'globalStorage', ROO_EXTENSION_ID, 'settings');
const CUSTOM_MODES_PATH = path.join(CUSTOM_MODES_DIR_WINDOWS, CUSTOM_MODES_FILENAME); // Adjust this based on OS detection later

const SYLPHX_MODE_SLUG = 'sylphx';
const SYLPHX_MODE_NAME = '🪽 Sylphx';
const SYLPHX_MODE_GROUPS = ["read", "edit", "browser", "command", "mcp"];
const SYLPHX_MODE_SOURCE = 'global'; // Assuming 'global' is correct

/**
 * Represents the response structure from the GitHub Contents API.
 */
interface GitHubContentResponse {
	/** Base64 encoded content of the file. */
	content?: string;
	/** Encoding type (should be 'base64'). */
	encoding?: string;
	/** Error message if the request failed. */
	message?: string;
}

/**
 * Represents the structure of a single custom mode definition.
 */
interface CustomMode {
	/** Unique identifier for the mode. */
	slug: string;
	/** Display name of the mode. */
	name: string;
	/** The core instructions or prompt defining the mode's behavior. */
	roleDefinition: string;
	/** List of capability groups enabled for the mode. */
	groups: string[];
	/** Source of the mode definition (e.g., 'global', 'user'). */
	source: string;
}

/**
 * Represents the structure of the custom_modes.json file.
 */
interface CustomModesFile {
	/** An array containing all custom mode definitions. */
	customModes: CustomMode[];
}

// --- Helper Functions ---

/**
 * Fetches the raw content of the custom instructions markdown file from GitHub.
 * @returns A promise that resolves with the raw markdown content as a string.
 * @throws Throws an error if the fetch request fails, the API returns an error, or the content is invalid.
 */
export async function fetchLatestInstructions(): Promise<string> {
    console.log(`Fetching latest instructions from ${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}...`);
    try {
        const response = await fetch(GITHUB_API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                // Add 'Authorization': `token YOUR_GITHUB_TOKEN` if hitting rate limits
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json() as GitHubContentResponse;

        if (data.message) {
            throw new Error(`GitHub API error: ${data.message}`);
        }

        if (!data.content || data.encoding !== 'base64') {
            throw new Error('Invalid content received from GitHub API.');
        }

        const decodedContent = Buffer.from(data.content, 'base64').toString('utf-8');
        console.log('Successfully fetched instructions.');
        return decodedContent;
    } catch (error) {
        console.error('Error fetching from GitHub:', error);
        throw new Error(`Failed to fetch instructions from GitHub: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Reads and parses the custom_modes.json file from the Roo extension settings directory.
 * Creates the directory and file with an empty structure if they don't exist.
 * Handles potential JSON parsing errors by returning a default structure.
 * @returns A promise that resolves with the parsed content of the custom modes file.
 * @throws Throws an error if reading the file fails (excluding file not found or parse errors, which are handled).
 */
export async function readCustomModes(): Promise<CustomModesFile> {
    console.log(`Reading custom modes file: ${CUSTOM_MODES_PATH}`);
    try {
        // Ensure the directory exists
        await fs.ensureDir(path.dirname(CUSTOM_MODES_PATH));

        if (!(await fs.pathExists(CUSTOM_MODES_PATH))) {
            console.log('custom_modes.json not found. Creating a new one.');
            const initialData: CustomModesFile = { customModes: [] };
            await fs.writeJson(CUSTOM_MODES_PATH, initialData, { spaces: 2 });
            return initialData;
        }

        const fileContent = await fs.readJson(CUSTOM_MODES_PATH);
        // Basic validation
        if (!fileContent || !Array.isArray(fileContent.customModes)) {
             console.warn('custom_modes.json seems malformed. Resetting to default structure.');
             return { customModes: [] }; // Return default structure if format is wrong
        }
        console.log('Successfully read custom modes file.');
        return fileContent as CustomModesFile;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error(`Error parsing JSON in ${CUSTOM_MODES_PATH}:`, error);
            console.warn('File content might be corrupted. Attempting to reset.');
             return { customModes: [] }; // Return default structure on parse error
        }
        console.error('Error reading custom modes file:', error);
        throw new Error(`Failed to read or parse ${CUSTOM_MODES_PATH}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Updates or adds the Sylphx mode definition within the custom modes data immutably.
 * If the mode exists, it's updated; otherwise, it's added.
 * @param modesData The current custom modes data object.
 * @param instructions The latest role definition (instructions) for the Sylphx mode.
 * @returns A new CustomModesFile object with the updated/added Sylphx mode.
 */
export function updateModesData(
	modesData: CustomModesFile,
	instructions: string,
): CustomModesFile {
	const existingModeIndex = modesData.customModes.findIndex(
		(mode) => mode.slug === SYLPHX_MODE_SLUG,
	);

	const newMode: CustomMode = {
		slug: SYLPHX_MODE_SLUG,
		name: SYLPHX_MODE_NAME,
		roleDefinition: instructions,
		groups: SYLPHX_MODE_GROUPS,
		source: SYLPHX_MODE_SOURCE,
	};

	if (existingModeIndex !== -1) {
		console.log(`Updating existing '${SYLPHX_MODE_SLUG}' mode definition.`);
		// Create a new array with the updated mode
		const updatedCustomModes = modesData.customModes.map((mode, index) =>
			index === existingModeIndex ? newMode : mode,
		);
		return {
			...modesData, // Spread other potential properties if any
			customModes: updatedCustomModes,
		};
	}
	console.log(`Adding new '${SYLPHX_MODE_SLUG}' mode definition.`);
	// Create a new array with the new mode added
	return {
		...modesData,
		customModes: [...modesData.customModes, newMode],
	};
}

/**
 * Writes the updated custom modes data back to the custom_modes.json file.
 * Ensures the directory exists before writing.
 * @param modesData The CustomModesFile object containing the data to write.
 * @returns A promise that resolves when the file has been written successfully.
 * @throws Throws an error if writing the file fails.
 */
export async function writeCustomModes(modesData: CustomModesFile): Promise<void> {
    console.log(`Writing updated modes to ${CUSTOM_MODES_PATH}`);
    try {
        await fs.writeJson(CUSTOM_MODES_PATH, modesData, { spaces: 2 });
        console.log('Successfully updated custom_modes.json.');
    } catch (error) {
        console.error('Error writing custom modes file:', error);
        throw new Error(`Failed to write updates to ${CUSTOM_MODES_PATH}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// --- Main Execution ---
async function main() {
    console.log('Starting @sylphx/setup_mode...');
    try {
        // 1. Fetch latest instructions
        const latestInstructions = await fetchLatestInstructions();

        // 2. Read existing custom modes file (or create if needed)
        let customModesData = await readCustomModes();

        // 3. Update the data with the new/updated Sylphx mode
        customModesData = updateModesData(customModesData, latestInstructions);

        // 4. Write the updated data back to the file
        await writeCustomModes(customModesData);

        console.log(`✅ Successfully added/updated the '${SYLPHX_MODE_SLUG}' mode in ${CUSTOM_MODES_PATH}`);
        process.exit(0); // Success

    } catch (error) {
        console.error('\n❌ An error occurred during setup:');
        console.error(error instanceof Error ? error.message : String(error));
        process.exit(1); // Failure
    }
}

// Execute the main function only if the script is run directly
// This prevents it from running when imported as a module (e.g., in tests)
// Note: process.argv[1] might not be reliable in all execution contexts (e.g., pkg).
// A more robust check might be needed depending on packaging/distribution method.
if (import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
    main().catch(err => {
        console.error("Unhandled error in main execution:", err);
        process.exit(1); // Ensure exit on unhandled main rejection
    });
}