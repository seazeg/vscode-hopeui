"use strict";
/*
 * @Author       : Evan.G
 * @Date         : 2021-02-01 11:43:04
 * @LastEditTime : 2021-02-01 11:46:27
 * @Description  :
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleGenerated = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
function styleGenerated() {
    vscode.window
        .showInputBox({
        password: false,
        ignoreFocusOut: true,
        placeHolder: "断点值配置",
        prompt: "以逗号(,)隔开 如:1200,750 ",
    })
        .then(function (res) {
        console.log("[断点输入]" + res);
        let tmp = "";
        if (!!res) {
            let arr = res.split(",");
            let max = arr.map(function (item) {
                return item + "px";
            });
            let min = arr.map(function (item) {
                return item + "px";
            });
            min.shift();
            min.push("1px");
            vscode.window
                .showInputBox({
                password: false,
                ignoreFocusOut: true,
                placeHolder: "断点范围的命名配置",
                prompt: "以逗号(,)隔开 如:md,xs ",
            })
                .then(function (input) {
                console.log("[命名输入]" + input);
                if (!!input) {
                    let arr = input.split(",");
                    let name = arr.map(function (item) {
                        return "hopeui-col-" + item;
                    });
                    fs.readFile(__dirname + "/generate/styles/config_ext.less", "utf-8", function (error, data) {
                        tmp = data
                            .replace("@max: 1200px, 750px;", `@max: ${max.join(",")};`)
                            .replace("@min: 750px, 1px;", `@min: ${min.join(",")};`)
                            .replace("@name: hopeui-col-md, hopeui-col-xs;", `@name: ${name.join(",")};`);
                        fs.writeFile(__dirname +
                            "/generate/styles/config.less", tmp, function (error) {
                            if (error)
                                console.error(error);
                            console.log("配置生成完毕");
                            let terminalA = vscode.window.createTerminal({
                                name: "styleGenerated",
                            });
                            // terminalA.show(false);
                            terminalA.sendText(`${path.resolve(__dirname, "../node_modules/less/bin/lessc")} ${__dirname}/generate/hopeui.less hopeui.min.css --clean-css="advanced"`);
                        });
                    });
                }
                else {
                    vscode.window.showInformationMessage("格式有误");
                }
            });
        }
        else {
            vscode.window.showInformationMessage("格式有误");
        }
    });
}
exports.styleGenerated = styleGenerated;
//# sourceMappingURL=styleGenerated.js.map