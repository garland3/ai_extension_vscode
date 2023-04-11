# trying vscode addin with openai
* trying to make something up. 

## dev continer

* npm
* Then i added python, `sudo apt-get install python`
* `ln -sf /usr/bin/python3 /usr/bin/python`
~~* then made an alias for python in `.bashrc` `alias python=python3`
~~  echo "ln -sf /usr/bin/python3 /usr/bin/python" >> .bashrc~~
* Add my own chat helper in bash
    * pip install git+https://github.com/garland3/llminterface.git
    * copy my api key to .llminterface/.secrets.toml
    * add chat to the path
    * `export PATH=/home/node/.local/bin:$PATH` (might need to add to .bashrc)



## goal
* I want a panel with chatgpt or langchain
* I want to be be able to select some code and send it over to chat gpt easily. 
* I want to send error messages easily with related code and structure of program. . Some command pallete?
* when chat gpt write some code block. I want to copy->paste into my code easily. OR find the section to modify in an open file and just modify it. 

## my steps
Install yeoman
```css
sudo npm install -g yo generator-code`
yo code
```
# Step 2
* then I can build a new container in the ai-extension folder. 
* I'm mostly editing `sr/extension.ts`
* then build with `ctrl-shift-b`
* then test with `F5`
* I add a few dependencies. i can install with npm bu doing. `npm install XXX`. I added `openai`, `toml`


## GPT 4 say I need to 

Creating a Visual Studio Code (VSCode) extension involves several steps. Here's a high-level overview of the process:

    Prerequisites:
    Ensure you have the following software installed on your computer:
        Node.js (LTS version is recommended)
        Git (optional, but recommended for version control)
        Visual Studio Code

    Install Yeoman and the VSCode extension generator:
    Yeoman is a scaffolding tool that helps you set up a new project. Run the following command in your terminal or command prompt to install Yeoman and the VSCode extension generator:


```css
npm install -g yo generator-code
```
Generate the extension template:
Run the following command to launch Yeoman and start creating your extension:

```css
yo code
```
Follow the prompts to set up your extension's basic information, such as name, description, publisher, and programming language (TypeScript or JavaScript).

Open the generated extension in VSCode:
Navigate to the generated extension folder and open it in VSCode:

```bash
cd your-extension-name
code .
```
Understand the extension structure:
Familiarize yourself with the important files and folders in your extension:

    package.json: Contains metadata, activation events, commands, and dependencies.
    src/extension.ts or src/extension.js: The main entry point, where the extension's functionality is implemented.
    .vscode/launch.json: Contains debugger configurations for running and testing the extension.
    README.md: Documentation for your extension.

Implement your extension:
Modify the src/extension.ts or src/extension.js file to implement the desired functionality. Use the VSCode API to interact with the editor, such as adding commands, snippets, or creating new panels.

Test your extension:
Press F5 in VSCode to launch a new Extension Development Host window, where you can test your extension. Use the Debug Console to debug and view any output from your extension.

Package your extension:
Before publishing, you need to package your extension as a .vsix file. First, install the vsce tool globally:

npm install -g vsce

Then, run the following command in your extension's root directory to package it:

go
```
vsce package
```
Publish your extension:
To publish your extension to the Visual Studio Code Marketplace, you'll need a Personal Access Token (PAT) from your Azure DevOps account. Follow the instructions in the official documentation to create a PAT and publish your extension.

Update and maintain your extension:
As you receive feedback or need to make changes, update your extension code, test it, package it, and publish the updated version to the Marketplace.

For more information on developing VSCode extensions, consult the official documentation.
-------------------------------------------------
what are some key parts of the vscode module. 

`import * as vscode from 'vscode';`
-------------------------------------------------
The vscode module is the main API for interacting with Visual Studio Code when creating extensions. It exposes several key components that you can use to build and customize extensions. Some of the essential components of the vscode module are:

    window: Provides access to the main window of the editor, allowing you to manipulate and interact with its UI elements. Key functionalities include:
        Displaying messages, warnings, and errors
        Showing input boxes and quick pick dialogs
        Creating and managing status bar items, webviews, and terminal instances

    workspace: Represents the currently opened folder or workspace. It allows you to:
        Access workspace folders, files, and settings
        Watch for file and folder changes
        Manipulate text documents (open, close, save, etc.)
        Execute tasks and commands in the workspace

    commands: Provides methods for registering and executing commands within VSCode. You can:
        Register new commands using registerCommand
        Execute commands using executeCommand

    languages: Enables interaction with VSCode's language features, such as:
        Registering providers for code completion, formatting, diagnostics, and more
        Accessing language-specific settings

    extensions: Offers methods for interacting with other installed extensions, allowing you to:
        Get information about extensions
        Activate extensions programmatically
        Access extension APIs

    Uri: Represents a Uniform Resource Identifier (URI) and provides methods for parsing and creating URIs.

    Range, Position, and Selection: Represent locations and ranges within text documents, enabling you to:
        Create and manipulate text ranges and selections
        Perform operations based on specific locations within the editor

    TextDocument and TextEditor: Represent the currently open documents and editors, allowing you to:
        Manipulate text (insert, delete, replace, etc.)
        Access metadata about documents (language, file name, etc.)
        Create and apply text edits

    TextDocumentContentProvider and FileSystemProvider: Allow you to create custom content providers and virtual file systems, enabling you to integrate with remote data sources or custom data formats.


These are just a few of the key components in the vscode module. You can explore the full API and find more components in the official documentation.

-------------------------------------------------
Anthony Garland

I want to select some text, run a command with ctr-shift-p then my command, the command reads the text and sends it to an api. what are the specific steps (with code) need?
-------------------------------------------------
To create a VSCode extension that reads selected text, runs a command via Ctrl+Shift+P, and sends the text to an API, follow these steps:

    Create a new VSCode extension (refer to the previous answer for the steps to create a new extension).

    Register your command in the package.json file by adding the following to the contributes.commands section:

json
```
"commands": [
  {
    "command": "yourExtension.yourCommand",
    "title": "Your Command Title"
  }
]
```
Add an activation event to the package.json file to activate your extension when your command is executed:

```json

"activationEvents": [
  "onCommand:yourExtension.yourCommand"
]
```
Implement your command in the src/extension.ts (TypeScript) or src/extension.js (JavaScript) file:

```typescript

import * as vscode from 'vscode';
import * as axios from 'axios'; // Install axios using: npm install axios

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('yourExtension.yourCommand', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active text editor found');
      return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (selectedText.length === 0) {
      vscode.window.showErrorMessage('No text selected');
      return;
    }

    try {
      // Replace this with the actual API endpoint
      const apiUrl = 'https://your-api.example.com/endpoint';
      const response = await axios.post(apiUrl, { text: selectedText });

      // Process the response as needed
      vscode.window.showInformationMessage(`API response: ${response.data.message}`);
    } catch (error) {
      vscode.window.showErrorMessage('Error calling API: ' + error.message);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
```
Install the axios package for making HTTP requests by running npm install axios in your extension's root directory.

Press F5 to launch the Extension Development Host window and test your extension. Select some text in the editor, press Ctrl+Shift+P, and type your command title to execute it.

Make sure to replace yourExtension.yourCommand, Your Command Title, and the API endpoint with the appropriate values for your specific use case.

### deploy just for me (not for the world) yet

```
npx webpack --mode production
npm install -g @vscode/vsce
<!-- npm WARN deprecated vsce@2.15.0: vsce has been renamed to @vscode/vsce. Install using @vscode/vsce instead. -->
npx vsce package
```
https://code.visualstudio.com/api/working-with-extensions/publishing-extension

