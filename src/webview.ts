/*
 * @Author : Evan.G
 * @Date : 2020-12-24 15:43:11
 * @LastEditTime : 2021-02-03 10:40:49
 * @Description :
 */
import {
    ExtensionContext,
    ViewColumn,
    WebviewPanel,
    window,
    commands,
    Uri,
} from "vscode";
import { join } from "path";

let webviewPanel: WebviewPanel | undefined;

function getExtensionFileVscodeResource(
    context: ExtensionContext,
    relativePath: string
) {
    const diskPath = Uri.file(join(context.extensionPath, relativePath));
    return diskPath
        .with({
            scheme: "vscode-resource",
        })
        .toString();
}

export function createWebView(
    context: ExtensionContext,
    viewColumn: ViewColumn,
    label: string,
    name: string
) {
    let path = getExtensionFileVscodeResource(
        context,
        "src/docs/hopeui/iframe.html"
    );
    if (webviewPanel === undefined) {
        webviewPanel = window.createWebviewPanel("webView", name, viewColumn, {
            retainContextWhenHidden: true,
            enableScripts: true,
        });
        webviewPanel.webview.html = getIframeHtml(path, label);
    } else {
        console.log(`${path}?id=${label}&viewMode=docs`);
        webviewPanel.title = name;
        webviewPanel.webview.postMessage({
            // path: path,
            // label: label
            params: `?id=${label}&viewMode=docs`,
        });
        webviewPanel.reveal();
    }

    webviewPanel.iconPath = Uri.file(
        join(__filename, "..", "images", "UI.svg")
    );

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    webviewPanel.webview.onDidReceiveMessage((message) => {
        switch (message.command) {
            case "iframeLabel":
                window.showInformationMessage(message.text);
        }
    });

    return webviewPanel;
}

export function getIframeHtml(path: string, label: string) {
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
