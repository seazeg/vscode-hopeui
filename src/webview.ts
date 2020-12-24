/*
 * @Author       : Evan.G
 * @Date         : 2020-12-24 15:43:11
 * @LastEditTime : 2020-12-24 17:05:18
 * @Description  : 
 */
import { ExtensionContext, ViewColumn, WebviewPanel, window, commands } from 'vscode';

let webviewPanel : WebviewPanel | undefined;

export function createWebView(
    context: ExtensionContext,
    viewColumn: ViewColumn,
    label: string,
    name:string
) {
    if(webviewPanel === undefined) {
        webviewPanel = window.createWebviewPanel(
            'webView',
            name,
            viewColumn,
            {
                retainContextWhenHidden: true,
                enableScripts: true
            }
        );
        webviewPanel.webview.html = getIframeHtml(label);
    } else {
        webviewPanel.title = name;
        webviewPanel.webview.postMessage({label: label});
        webviewPanel.reveal();
    }

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    webviewPanel.webview.onDidReceiveMessage(message => {
        switch(message.command) {
            case 'iframeLabel': 
                window.showInformationMessage(message.text);
        }
    });
    
    return webviewPanel;
}

export function getIframeHtml(label: string) {
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