"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIframeHtml = exports.createWebView = void 0;
/*
 * @Author       : Evan.G
 * @Date         : 2020-12-24 15:43:11
 * @LastEditTime : 2021-01-29 11:20:22
 * @Description  :
 */
const vscode_1 = require("vscode");
let webviewPanel;
function createWebView(context, viewColumn, label, name) {
    if (webviewPanel === undefined) {
        webviewPanel = vscode_1.window.createWebviewPanel('webView', name, viewColumn, {
            retainContextWhenHidden: true,
            enableScripts: true
        });
        webviewPanel.webview.html = getIframeHtml(label);
    }
    else {
        webviewPanel.title = name;
        webviewPanel.webview.postMessage({ label: label });
        webviewPanel.reveal();
    }
    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });
    webviewPanel.webview.onDidReceiveMessage(message => {
        switch (message.command) {
            case 'iframeLabel':
                vscode_1.window.showInformationMessage(message.text);
        }
    });
    return webviewPanel;
}
exports.createWebView = createWebView;
function getIframeHtml(label) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            #iframe {
                width: 100%;
                height: 100%;
            }

        </style>
        <script>
            const vscode = acquireVsCodeApi();
            window.addEventListener('message', (e) => {
                if(e.data.label) {
                    document.getElementById("iframe").src = 'http://seazeg.gitee.io/hopeui/iframe.html?id='+ e.data.label +'&viewMode=docs'
                }
                if(e.data.iframeLabel) {
                    vscode.postMessage({
                        command: 'iframeLabel',
                        text: e.data.iframeLabel+'',
                    })
                }
            })
        </script>
        </head>
        <body>
            <iframe id='iframe' src="http://seazeg.gitee.io/hopeui/iframe.html?id=${label}&viewMode=docs" frameborder=0 scrolling="auto"></iframe>
        </body>
    </html>
    `;
}
exports.getIframeHtml = getIframeHtml;
//# sourceMappingURL=webView.js.map