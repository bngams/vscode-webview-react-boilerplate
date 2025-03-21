import {
  WebviewViewProvider,
  WebviewView,
  Webview,
  Uri,
  EventEmitter,
  window,
} from 'vscode';
import { Utils } from './utils';
import * as vscode from 'vscode';

export class SidebarWebview implements WebviewViewProvider {
  constructor(
    private readonly extensionPath: Uri,
    private data: any,
    private _view: any = null
  ) {}

  private onDidChangeTreeData: EventEmitter<any | undefined | null | void> =
    new EventEmitter<any | undefined | null | void>();

  refresh(context: any): void {
    this.onDidChangeTreeData.fire(null);
    this._view.webview.html = this._getHtmlForWebview(this._view?.webview);
  }

  // Called when a view first becomes visible
  resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionPath],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    this._view = webviewView;
    this.activateMessageListener();
  }

  private activateMessageListener() {
    this._view.webview.onDidReceiveMessage((message: any) => {
      switch (message.action) {
        case 'OPEN_TERMINAL':
          vscode.commands.executeCommand('extension.openTerminal');
          break;
        default:
          break;
      }
    });
  }

  private _getHtmlForWebview(webview: Webview) {
    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionPath, 'dist', 'webview', 'main.wv.js')
    );

    // Use a nonce to only allow specific scripts to be run
    const nonce = Utils.getNonce();

    // Basic HTML structure
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src 'self' data:;">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Webview</title>
      </head>
      <body>
        <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}
