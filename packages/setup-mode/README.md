# @sylphx/setup_mode

This tool automatically adds or updates the 'sylphx' custom mode definition in Roo's `custom_modes.json` configuration file using the latest instructions from the `sylphlab/Playbook` GitHub repository.

## Purpose

Ensures that the 'sylphx' mode in Roo utilizes the most up-to-date core instructions defined in the central Playbook repository.

## Features

- Fetches the latest `custom_instructions_core.md` from `sylphlab/Playbook` on GitHub.
- Locates the Roo extension's global storage settings directory.
  - **Note:** Currently uses a hardcoded Windows path (`%APPDATA%\Code\User\globalStorage\rooveterinaryinc.roo-cline\settings`). Needs improvement for cross-platform compatibility.
- Reads the existing `custom_modes.json`, creating it if it doesn't exist.
- Adds or updates the mode definition with `slug: 'sylphx'`.
- Writes the changes back to `custom_modes.json`.
- Logs progress and errors to the console.

## Usage

### Running via npx (after publishing)

```bash
npx @sylphx/setup_mode
```

### Local Development

1.  **Clone the repository (or ensure you have this directory).**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the TypeScript code:**
    ```bash
    npm run build
    ```
4.  **Run the compiled code directly:**
    ```bash
    node dist/index.js
    ```
    *or* **Run using ts-node (for development):**
    ```bash
    npm run dev
    ```
5.  **Run tests:**
    ```bash
    npm test
    ```

## TODO

- Implement robust, cross-platform detection of the VS Code extension global storage path for `rooveterinaryinc.roo-cline`. Consider libraries like `env-paths` or OS-specific logic. Fallback to prompting the user if detection fails.
- Add more comprehensive error handling and user feedback.
- Consider adding command-line arguments (e.g., specifying a path, using a specific GitHub branch/token).