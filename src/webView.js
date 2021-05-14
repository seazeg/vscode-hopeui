"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIframeHtml = exports.createWebView = void 0;
/*
 * @Author : Evan.G
 * @Date : 2020-12-24 15:43:11
 * @LastEditTime : 2021-05-14 11:51:32
 * @Description :
 */
const vscode_1 = require("vscode");
const path_1 = require("path");
let webviewPanel;
function getExtensionFileVscodeResource(context, relativePath) {
    const diskPath = vscode_1.Uri.file(path_1.join(context.extensionPath, relativePath));
    return diskPath
        .with({
        scheme: "vscode-resource",
    })
        .toString();
}
function createWebView(context, viewColumn, label, name) {
    let path = getExtensionFileVscodeResource(context, "src/docs/hopeui/iframe.html");
    if (webviewPanel === undefined) {
        webviewPanel = vscode_1.window.createWebviewPanel("webView", name, viewColumn, {
            retainContextWhenHidden: true,
            enableScripts: true,
        });
        webviewPanel.webview.html = getIframeHtml(path, label);
    }
    else {
        console.log(`${path}?id=${label}&viewMode=docs`);
        webviewPanel.title = name;
        webviewPanel.webview.postMessage({
            // path: path,
            // label: label
            params: `?id=${label}&viewMode=docs`,
        });
        webviewPanel.reveal();
    }
    webviewPanel.iconPath = vscode_1.Uri.file(path_1.join(__filename, "..", "images", "icon.png"));
    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });
    webviewPanel.webview.onDidReceiveMessage((message) => {
        switch (message.command) {
            case "iframeLabel":
                vscode_1.window.showInformationMessage(message.text);
        }
    });
    return webviewPanel;
}
exports.createWebView = createWebView;
function getIframeHtml(path, label) {
    console.log(`${path}?id=${label}&viewMode=docs`);
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
                if (e.data.params) {
                    document.getElementById("iframe").src = document.getElementById("iframe").src.split('?')[0] + e.data.params        
                }
            })
        </script>
    </head>

    <body>
        <iframe id='iframe' src="${path}?id=${label}&viewMode=docs" frameborder=0 scrolling="auto"></iframe>
    </body>

    </html>
    `;
}
exports.getIframeHtml = getIframeHtml;
//# sourceMappingURL=webView.js.map