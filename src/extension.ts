// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "markdown-blockquote" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('markdown-blockquote.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('やっほー!!!!');
  });

  const applyBlockquoteDisposable = vscode.commands.registerCommand('markdown-blockquote.applyBlockquote', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const selections = editor.selections;

      editor.edit((editBuilder) => {
        selections.forEach((selection) => {
          const text = document.getText(selection);
          const lines = text.split('\n');
          const blockquotedLines = lines.map((line) => {
            if (line.trim() === '') {
              return line;
            }
            return `> ${line.trim()}  `;
          });
          const blockquotedText = blockquotedLines.join('\n');
          editBuilder.replace(selection, blockquotedText);
        });
      });
    }
  });

  const deleteBlockquoteDisposable = vscode.commands.registerCommand('markdown-blockquote.deleteBlockquote', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const selections = editor.selections;

      editor.edit((editBuilder) => {
        selections.forEach((selection) => {
          const text = document.getText(selection);
          const lines = text.split('\n');
          const unblockquotedLines = lines.map((line) => {
            if (line.trim().startsWith('> ')) {
              return line.trim().slice(2);
            }
            return line;
          });
          const unblockquotedText = unblockquotedLines.join('\n');
          editBuilder.replace(selection, unblockquotedText);
        });
      });
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
