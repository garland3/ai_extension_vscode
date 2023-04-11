# ai-extension 

 <!-- add images/robot.png to my markdown  -->
 ![robot](images/demo.gif)


 "ai-extension". Select text and send it to the chatbot.

## API key
Put your openai api key in the env var `OPENAI_API_KEY` or in `~/.llminterface/.secrets.toml`. 

## Commands are 

The general usage is to select some text in an editor, then run the command you want. 


1. `AI Refactor`. Select some code, then run the command, and it will replace and try to fix any errors.
2. `AI Description 2 Code` . Select some text, then run the command, and it will try to generate code from the description.
3. `AI Chat`. Select some text, then run the command, and it will just call the chatgpt model and output the result. 



## Goal
* Less copy and pasting to chatgpt, but getting the same work done. 


## Future/Development

`List  2 code` . Given a list of steps. Select the steps, then it will call openai to make code for each step. 

<!-- 
## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**


## Anthony

```bash
pip install git+https://github.com/garland3/llminterface.git
mkdir ~/.llminterface
nano ~/.llminterface/.secrets.toml
chat "hi"
``` -->