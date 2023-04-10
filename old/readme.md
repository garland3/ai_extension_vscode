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

    vsce package

    Publish your extension:
    To publish your extension to the Visual Studio Code Marketplace, you'll need a Personal Access Token (PAT) from your Azure DevOps account. Follow the instructions in the official documentation to create a PAT and publish your extension.

    Update and maintain your extension:
    As you receive feedback or need to make changes, update your extension code, test it, package it, and publish the updated version to the Marketplace.

For more information on developing VSCode extensions, consult the official documentation.
