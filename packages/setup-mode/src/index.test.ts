import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { MockedFunction } from 'vitest';
// Removed type-only import for fs
import fetch from 'node-fetch';
import type { Response } from 'node-fetch'; // Separate type import
import { Buffer } from 'node:buffer'; // Explicitly import Buffer

// --- Mocking ---
// Mock node-fetch
// We need to mock the default export for ESM
vi.mock('node-fetch', () => ({
    __esModule: true, // This is important for ESM modules
    default: vi.fn(),
}));
const mockedFetch = fetch as MockedFunction<typeof fetch>;


// Mock fs-extra
vi.mock('fs-extra', async () => {
    // Define mocks entirely inside the factory, but without default implementations for readJson/pathExists
    const mockEnsureDir = vi.fn();
    const mockPathExists = vi.fn();
    const mockReadJson = vi.fn();
    const mockWriteJson = vi.fn();

    return {
        __esModule: true,
        ensureDir: mockEnsureDir,
        pathExists: mockPathExists,
        readJson: mockReadJson,
        writeJson: mockWriteJson,
        // Mock default export if necessary
        default: {
            ensureDir: mockEnsureDir,
            pathExists: mockPathExists,
            readJson: mockReadJson,
            writeJson: mockWriteJson,
        },
    };
});

// Import the mocked module directly. Vitest ensures this is the mocked version.
import * as fs from 'fs-extra';

// Import the functions to test
import {
    fetchLatestInstructions,
    readCustomModes,
    updateModesData,
    writeCustomModes,
} from './index.js'; // Updated import path

// --- Test Suite ---
describe('@sylphx/setup_mode core logic', () => {

    // Define constants used in tests (or export from src/index.ts)
    const SYLPHX_MODE_SLUG = 'sylphx';
    const SYLPHX_MODE_NAME = '🪽 Sylphx';
    const SYLPHX_MODE_GROUPS = ["read", "edit", "browser", "command", "mcp"];
    const SYLPHX_MODE_SOURCE = 'global';

    beforeEach(() => {
        // Reset mocks before each test
        vi.clearAllMocks();
        vi.resetAllMocks(); // Resets all mocks including spies and call history
        // Mock console methods to prevent test output clutter
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

     afterEach(() => {
        // Restore console mocks
        vi.restoreAllMocks();
    });

    // --- fetchLatestInstructions Tests ---
    describe('fetchLatestInstructions', () => {
        // No dynamic import needed here anymore

        it('should fetch and decode instructions successfully', async () => {
            const mockContent = 'Test Markdown Content';
            const encodedContent = Buffer.from(mockContent).toString('base64');
            mockedFetch.mockResolvedValueOnce({
                ok: true,
                // Return the expected structure directly
                json: async () => ({ content: encodedContent, encoding: 'base64' }),
            } as Response); // Use the imported Response type

            const instructions = await fetchLatestInstructions();
            expect(instructions).toBe(mockContent);
            expect(mockedFetch).toHaveBeenCalledTimes(1);
            // Add check for URL if needed: expect(mockedFetch).toHaveBeenCalledWith(EXPECTED_URL, expect.any(Object));
        });

        it('should throw error on fetch failure', async () => {
             mockedFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
            } as Response);

            await expect(fetchLatestInstructions()).rejects.toThrow(/GitHub API request failed: 404 Not Found/);
            expect(console.error).toHaveBeenCalledWith('Error fetching from GitHub:', expect.any(Error));
        });

         it('should throw error on API error message', async () => {
             mockedFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: 'API rate limit exceeded' }),
            } as Response);

            await expect(fetchLatestInstructions()).rejects.toThrow(/GitHub API error: API rate limit exceeded/);
             expect(console.error).toHaveBeenCalledWith('Error fetching from GitHub:', expect.any(Error));
        });

         it('should throw error on invalid content structure', async () => {
             mockedFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ content: 'some content', encoding: 'utf-8' }), // Wrong encoding
            } as Response);

            await expect(fetchLatestInstructions()).rejects.toThrow(/Invalid content received from GitHub API/);
             expect(console.error).toHaveBeenCalledWith('Error fetching from GitHub:', expect.any(Error));
        });
    });

    // --- readCustomModes Tests ---
    describe('readCustomModes', () => {
        // No dynamic import needed here anymore

        it('should read existing valid JSON', async () => {
            const mockData = { customModes: [{ slug: 'test', name: 'Test', roleDefinition: '...', groups: [], source: 'user' }] };
            // Explicitly set mocks for this test case
            vi.mocked(fs.pathExists).mockImplementationOnce(async () => true); // Ensure pathExists is true
            vi.mocked(fs.readJson).mockResolvedValueOnce(mockData); // Use Once for safety

            const data = await readCustomModes();
            expect(data).toEqual(mockData);
            expect(fs.ensureDir).toHaveBeenCalledTimes(1);
            expect(fs.readJson).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Successfully read custom modes file.'));
        });

        it('should create file if it does not exist', async () => {
            vi.mocked(fs.pathExists).mockImplementationOnce(async () => false); // Use mockImplementationOnce
            const initialData = { customModes: [] };
            // Ensure writeJson mock is reset/doesn't interfere if needed, though not strictly necessary here
            vi.mocked(fs.writeJson).mockResolvedValueOnce(undefined);

            const data = await readCustomModes();
            expect(data).toEqual(initialData);
            expect(fs.ensureDir).toHaveBeenCalledTimes(1);
            expect(fs.writeJson).toHaveBeenCalledWith(expect.any(String), initialData, { spaces: 2 });
            expect(fs.readJson).not.toHaveBeenCalled();
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('custom_modes.json not found. Creating a new one.'));
        });

         it('should return default and warn on invalid JSON', async () => {
            vi.mocked(fs.pathExists).mockImplementationOnce(async () => true); // Use mockImplementationOnce
            vi.mocked(fs.readJson).mockRejectedValueOnce(new SyntaxError('Invalid JSON')); // Use Once
            const initialData = { customModes: [] };

            const data = await readCustomModes();
            expect(data).toEqual(initialData);
            expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error parsing JSON'), expect.any(SyntaxError));
            expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('File content might be corrupted. Attempting to reset.'));
        });

         it('should return default and warn on malformed structure', async () => {
           vi.mocked(fs.pathExists).mockImplementationOnce(async () => true); // Use mockImplementationOnce
            vi.mocked(fs.readJson).mockResolvedValueOnce({ someOtherProperty: [] }); // Use Once, Missing customModes array
            const initialData = { customModes: [] };

            const data = await readCustomModes();
            expect(data).toEqual(initialData);
             expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('custom_modes.json seems malformed. Resetting to default structure.'));
        });

         it('should throw error on other fs read errors', async () => {
           vi.mocked(fs.pathExists).mockImplementationOnce(async () => true); // Use mockImplementationOnce
            const readError = new Error('Permission denied');
            vi.mocked(fs.readJson).mockRejectedValueOnce(readError); // Use Once

            await expect(readCustomModes()).rejects.toThrow(/Failed to read or parse.*Permission denied/);
            expect(console.error).toHaveBeenCalledWith('Error reading custom modes file:', readError);
        });
    });

    // --- updateModesData Tests ---
    describe('updateModesData', () => {
        // No dynamic import needed here anymore

         it('should add new mode if not exists', () => {
            const initialData = { customModes: [] };
            const instructions = 'New Instructions';
            const updatedData = updateModesData(initialData, instructions);

            expect(updatedData.customModes).toHaveLength(1);
            // Assign to variable and check existence for type safety
            const addedMode = updatedData.customModes[0];
            expect(addedMode).toBeDefined();
            if (addedMode) {
                expect(addedMode.slug).toBe(SYLPHX_MODE_SLUG);
                expect(addedMode.roleDefinition).toBe(instructions);
                expect(addedMode.name).toBe(SYLPHX_MODE_NAME);
                expect(addedMode.groups).toEqual(SYLPHX_MODE_GROUPS);
                expect(addedMode.source).toBe(SYLPHX_MODE_SOURCE);
            }
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Adding new '${SYLPHX_MODE_SLUG}' mode definition.`));
         });

         it('should update existing mode', () => {
            const initialData = { customModes: [{ slug: SYLPHX_MODE_SLUG, name: 'Old Name', roleDefinition: 'Old Def', groups: [], source: 'user' }] };
            const instructions = 'Updated Instructions';
            const updatedData = updateModesData(initialData, instructions);

            expect(updatedData.customModes).toHaveLength(1);
             // Assign to variable and check existence
            const updatedMode = updatedData.customModes[0];
            expect(updatedMode).toBeDefined();
            if (updatedMode) {
                expect(updatedMode.slug).toBe(SYLPHX_MODE_SLUG);
                expect(updatedMode.roleDefinition).toBe(instructions);
                expect(updatedMode.name).toBe(SYLPHX_MODE_NAME); // Name gets updated
                expect(updatedMode.groups).toEqual(SYLPHX_MODE_GROUPS); // Groups updated
                expect(updatedMode.source).toBe(SYLPHX_MODE_SOURCE); // Source updated
            }
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Updating existing '${SYLPHX_MODE_SLUG}' mode definition.`));
         });
    });

    // --- writeCustomModes Tests ---
     describe('writeCustomModes', () => {
        // No dynamic import needed here anymore

         it('should call fs.writeJson with correct data', async () => {
            const dataToWrite = { customModes: [{ slug: SYLPHX_MODE_SLUG, name: SYLPHX_MODE_NAME, roleDefinition: 'Test Def', groups: SYLPHX_MODE_GROUPS, source: SYLPHX_MODE_SOURCE }] };
            await writeCustomModes(dataToWrite);

            expect(fs.writeJson).toHaveBeenCalledTimes(1);
            expect(fs.writeJson).toHaveBeenCalledWith(expect.any(String), dataToWrite, { spaces: 2 });
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Successfully updated custom_modes.json.'));
         });

         it('should throw error on fs write error', async () => {
             const writeError = new Error('Disk full');
             vi.mocked(fs.writeJson).mockRejectedValueOnce(writeError); // Use Once
            const dataToWrite = { customModes: [] };

            await expect(writeCustomModes(dataToWrite)).rejects.toThrow(/Failed to write updates.*Disk full/);
            expect(console.error).toHaveBeenCalledWith('Error writing custom modes file:', writeError);
         });
     });
});