/*
 * @Author       : Evan.G
 * @Date         : 2021-02-01 11:43:04
 * @LastEditTime : 2021-02-01 11:46:27
 * @Description  :
 */

import * as vscode from "vscode";
const path = require("path");
const fs = require("fs");

export function styleGenerated() {
    vscode.window
        .showInputBox({
            password: false, // 输入内容是否是密码
            ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
            placeHolder: "断点值配置", // 在输入框内的提示信息
            prompt: "以逗号(,)隔开 如:1200,750 ", // 在输入框下方的提示信息
            // validateInput: function (text) {
            //     return text;
            // }, // 对输入内容进行验证并返回
        })
        .then(function (res: string | undefined) {
            console.log("[断点输入]" + res);
            let tmp = "";
            if (!!res) {
                let arr = res.split(",");
                let max: any = arr.map(function (item: string) {
                    return item + "px";
                });
                let min: any = arr.map(function (item: string) {
                    return item + "px";
                });

                min.shift();
                min.push("1px");

                vscode.window
                    .showInputBox({
                        password: false, // 输入内容是否是密码
                        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
                        placeHolder: "断点范围的命名配置", // 在输入框内的提示信息
                        prompt: "以逗号(,)隔开 如:md,xs ", // 在输入框下方的提示信息
                        // validateInput: function (text) {
                        //     return text;
                        // }, // 对输入内容进行验证并返回
                    })
                    .then(function (input: string | undefined) {
                        console.log("[命名输入]" + input);
                        if (!!input) {
                            let arr = input.split(",");
                            let name: any = arr.map(function (item: string) {
                                return "hopeui-col-" + item;
                            });

                            fs.readFile(
                                __dirname + "/generate/styles/config_ext.less",
                                "utf-8",
                                function (error: any, data: any) {
                                    tmp = data
                                        .replace(
                                            "@max: 1200px, 750px;",
                                            `@max: ${max.join(",")};`
                                        )
                                        .replace(
                                            "@min: 750px, 1px;",
                                            `@min: ${min.join(",")};`
                                        )
                                        .replace(
                                            "@name: hopeui-col-md, hopeui-col-xs;",
                                            `@name: ${name.join(",")};`
                                        );

                                    fs.writeFile(
                                        __dirname +
                                            "/generate/styles/config.less",
                                        tmp,
                                        function (error: any) {
                                            if (error) console.error(error);
                                            console.log("配置生成完毕");

                                            let terminalA = vscode.window.createTerminal(
                                                {
                                                    name: "styleGenerated",
                                                }
                                            );
                                            // terminalA.show(false);
                                            terminalA.sendText(
                                                `${path.resolve(
                                                    __dirname,
                                                    "../node_modules/less/bin/lessc"
                                                )} ${__dirname}/generate/hopeui.less hopeui.min.css --clean-css="advanced"`
                                            );
                                        }
                                    );
                                }
                            );
                        } else {
                            vscode.window.showInformationMessage("格式有误");
                        }
                    });
            } else {
                vscode.window.showInformationMessage("格式有误");
            }
        });
}
