let vscode: any;

function getVsCodeApi() {
  if (!vscode) {
    vscode = acquireVsCodeApi();
  }
  return vscode;
}

export default getVsCodeApi;
