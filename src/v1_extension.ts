

import * as vscode from 'vscode';
// import * as axios from 'axios'; // Install axios using: npm install axios
import * as fs from 'fs';
// import * as toml from 'toml';
import * as TOML from 'toml';
import * as openai from 'openai';
import { Configuration as CONFIGURATION, OpenAIApi as OPENAI_API } from "openai";

export function activate(context: vscode.ExtensionContext) {
	// General function for setting up OPENAI API
	const secretsFilePath = `${process.env.HOME}/.llminterface/.secrets.toml`; // construct the file path
	const secretsFileContents = fs.readFileSync(secretsFilePath, 'utf8'); // read the file contents
	const secrets = TOML.parse(secretsFileContents); // parse the TOML contents into a JavaScript object

	const mySecretValue = secrets.openaikey; // get the value for the key 'myKey'
	// console.log(`The value of myKey is ${mySecretValue}`);
	console.log(`The value of myKey is BLAH BLAH BLAH`);


	// add console log for debugging
	console.log('Made it to the CONFIGURATION object');
	const configuration = new CONFIGURATION({
		// apiKey: process.env.OPENAI_API_KEY,
		apiKey: mySecretValue,
	});
	console.log('Made new configuration object');

	const openai = new OPENAI_API(configuration);
	console.log('Made new open ai object');

	// CODE for FUNCTION ai_refactor command.
	// This is the code that will be run when use the command palette to run the command "AI Refactor"
	// The command is defined in package.json
	let disposable = vscode.commands.registerCommand('ai-extension.ai_refactor', async () => {
		// vscode.window.showInformationMessage(`The value of myKey is ${mySecretValue}`);
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active text editor found');
			console.log('no active text editor found');
			return;
		}

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		console.log(`Selected text: ${selectedText}\n\n========\n`);

		const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
			role: "user",
			content: `Hello. Please refactor  this code and fix any typos or mistakes.\n\n=======\n${selectedText}\n==========`
			}
		],
		});
		const result = String( completion.data.choices[0].message?.content);
		console.log(`New code: ${result}\n\n========\n`);

		const edit = new vscode.TextEdit(selection, result);
		const workspaceEdit = new vscode.WorkspaceEdit();
		workspaceEdit.set(editor.document.uri, [edit]);
		vscode.workspace.applyEdit(workspaceEdit);

	});
	
	context.subscriptions.push(disposable);
}
	// vscode.window.showInformationMessage(`API response: ${result}`);


	// const selection = editor.selection;
	// const selectedText = editor.document.getText(selection);

	// if (selectedText.length === 0) {
	// 	vscode.window.showErrorMessage('No text selected');
	// 	return;
	// }




		// try {
		//   // Replace this with the actual API endpoint
		//   const apiUrl = 'https://your-api.example.com/endpoint';
		//   const response = await axios.post(apiUrl, { text: selectedText });

		//   // Process the response as needed
		//   vscode.window.showInformationMessage(`API response: ${response.data.message}`);
		// } catch (error) {
		//   vscode.window.showErrorMessage('Error calling API: ' + error.message);
		// }
// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "ai-extension" is now active!');
// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	let disposable = vscode.commands.registerCommand('ai-extension.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from ai_extension!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}