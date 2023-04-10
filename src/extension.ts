import * as vscode from 'vscode';
import * as fs from 'fs';
import * as TOML from 'toml';
import { Configuration as CONFIGURATION, OpenAIApi as OPENAI_API } from "openai";

export function activate(context: vscode.ExtensionContext) {
	console.log("V3");
	// General function for setting up OPENAI API
	const apiKey = getOpenAIApiKey();

	if (!apiKey) {
		console.error('Failed to get OpenAI API key');
		return;
	}

	const configuration = new CONFIGURATION({
		apiKey: apiKey,
	});

	const openai = new OPENAI_API(configuration);

	// CODE for FUNCTION ai_refactor command.
	let disposableRefactor = vscode.commands.registerCommand('ai-extension.ai_refactor', async () => {
		const selectedTextResult = getSelectedTextAndLanguage();
		const selectedText = selectedTextResult[0];
		console.log(`Selected text: ${selectedText}\n\n========\n`);
		const message = `Hello. Please refactor  this code and fix any typos or mistakes.\n\n=======\n${selectedText}\n==========`;
		const result = await openaiChat(message, openai);
		await replaceSelectedText(result);

	});

	context.subscriptions.push(disposableRefactor);


	// // CODE for FUNCTION ai_description2code command.
	// CODE for FUNCTION ai_refactor command.
	let disposableText2Code = vscode.commands.registerCommand('ai-extension.ai_description2code', async () => {
		const selectedTextResult = getSelectedTextAndLanguage();
		const selectedText = selectedTextResult[0];
		const lang = selectedTextResult[1];
		console.log(`Selected text: ${selectedText}\nLang is ${lang}`);
		const message = `Hello. Please take this text description and make it into ${lang} code. Only return code. \n\n=======\n${selectedText}\n==========`;
		const result = await openaiChat(message, openai);
		await replaceSelectedText(result, true);

	});
	context.subscriptions.push(disposableText2Code);

}


async function openaiChat(message: string, openai: OPENAI_API): Promise<string> {
	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: message
			}
		],
	});
	const result = String(completion.data.choices[0].message?.content);
	return result;

}

// Helper function to get the selected text
function getSelectedTextAndLanguage(): [string | undefined, string | undefined] {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showErrorMessage('No active text editor found');
		return [undefined, undefined];
	}

	const selection = editor.selection;
	if (selection.isEmpty) {
		vscode.window.showInformationMessage('Please select some text to refactor.');
		return [undefined, undefined];
	}

	const document = editor.document;
	const language = document.languageId;
	const selectedText = document.getText(selection);
	return [selectedText, language];
}


// Helper function to replace the selected text with the given text
async function replaceSelectedText(text: string, appendAfterSelection = false) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showErrorMessage('No active text editor found');
		return;
	}

	const selection = editor.selection;
	const start = selection.start;
	const end = selection.end;

	if (appendAfterSelection) {
		const line = editor.document.lineAt(end.line);
		const endOfLine = line.range.end;
		await editor.edit(editBuilder => editBuilder.insert(endOfLine, text));
	} else {
		await editor.edit(editBuilder => editBuilder.replace(selection, text));
	}
}


function getOpenAIApiKey(): string {
	if (process.env.OPENAI_API_KEY) {
		return process.env.OPENAI_API_KEY;
	}

	const secretsFilePath = `${process.env.HOME}/.llminterface/.secrets.toml`;
	try {
		const secretsFileContents = fs.readFileSync(secretsFilePath, 'utf8');
		const secrets = TOML.parse(secretsFileContents);
		return secrets.openaikey;
	} catch (err) {
		console.error('Failed to read OpenAI API key from TOML file or environment variable');
		return '';
	}
}