// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarWebview } from './sidebar-webview';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-webview-react-boilerplate" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-webview-react-boilerplate.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode-webview-react-boilerplate!');
	});

	context.subscriptions.push(disposable);

	// Command to send text to an existing terminal
	let sendTextToTerminalCommand = vscode.commands.registerCommand('extension.openTerminal', (msg: string ) => {
		if (vscode.env.uiKind === vscode.UIKind.Desktop) { 	
			// Find an existing terminal
			let terminal = vscode.window.terminals.find(t => t.name === 'Extension terminal');
			if (!terminal) {
				terminal = vscode.window.createTerminal(`Extension Terminal`);
			}
			// Show the terminal
			terminal.show();
		} else {
			// Web environment or other unsupported environment
  			vscode.window.showWarningMessage('Terminal creation is not supported in this environment.');
		}
	});

	context.subscriptions.push(sendTextToTerminalCommand);

	// Register view
	const sidebarWebview = new SidebarWebview(context?.extensionUri, {});
	let view = vscode.window.registerWebviewViewProvider(
		'sidebar-webview',
		sidebarWebview,
	);
	context.subscriptions.push(view);
}

// This method is called when your extension is deactivated
export function deactivate() {}
