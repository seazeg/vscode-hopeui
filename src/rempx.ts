/*
 * @Author       : Evan.G
 * @Date         : 2021-02-03 15:19:29
 * @LastEditTime : 2021-02-04 10:01:00
 * @Description  :
 */
import { window, Position, Range } from "vscode";
const beautify = require("js-beautify");
const fs = require("fs");

export function rempx(type: string) {
    if (!window.activeTextEditor) return;
    getFileContents(window.activeTextEditor.document.fileName, type).then(
        function (data) {
            if (!window.activeTextEditor) return;
            window.activeTextEditor.edit((editBuilder: any) => {
                // 从开始到结束，全量替换
                if (!window.activeTextEditor) return;
                const end = new Position(
                    window.activeTextEditor.document.lineCount + 1,
                    0
                );
                editBuilder.replace(new Range(new Position(0, 0), end), data);
            });
        }
    );
}

function getFileContents(filepath: string, type: string) {
    return new Promise(async (resolve, reject) => {
        fs.readFile(filepath, "utf-8", function (error: any, data: string) {
            if (error) reject(error);
            resolve(converter(data, type));
        });
    });
}

function converter(data: string, type: string): string {
    let source: string = data;
    let ratio: number = 100;
    let res: string = "";
    if (source) {
        source = beautify.css(source);
        let arr = source.split("\n");
        let len = arr.length;
        if (type == "px2rem") {
            for (let i = 0; i < len; i++) {
                let line = arr[i];
                if (!line.includes("@media")) {
                    res +=
                        line.replace(
                            /([1-9]\d*.\d*|1?.\d*[1-9]\d*|\d*[1-9]\d*)px/g,
                            function (px) {
                                let tmp = px;
                                if (px.includes(":")) {
                                    px = px.replace(":", "");
                                }
                                if (!!px) {
                                    if (
                                        !/border:|text-indent:|z-index:/gi.test(
                                            line
                                        )
                                    ) {
                                        if (tmp.includes(":")) {
                                            return (
                                                ":" +
                                                parseFloat(px) / ratio +
                                                "rem"
                                            );
                                        } else {
                                            return (
                                                " " +
                                                parseFloat(px) / ratio +
                                                "rem"
                                            );
                                        }
                                    } else {
                                        return px;
                                    }
                                } else {
                                    return px;
                                }
                            }
                        ) + "\n";
                } else {
                    res += line + "\n";
                }
                res = res.replace(/0px/gi, "0");
            }
        } else if (type == "rem2px") {
            for (let i = 0; i < len; i++) {
                let line = arr[i];
                if (!line.includes("@media")) {
                    res +=
                        line.replace(
                            /([1-9]\d*.\d*|0?.\d*[1-9]\d*|\d*[1-9]\d*)rem/g,
                            function (rem) {
                                let tmp = rem;
                                if (rem.includes(":")) {
                                    rem = rem.replace(":", "");
                                }
                                if (!!rem) {
                                    if (
                                        !/border:|text-indent:|z-index:/gi.test(
                                            line
                                        )
                                    ) {
                                        if (tmp.includes(":")) {
                                            return (
                                                ":" +
                                                parseFloat(rem) * ratio +
                                                "px"
                                            );
                                        } else {
                                            return (
                                                " " +
                                                parseFloat(rem) * ratio +
                                                "px"
                                            );
                                        }
                                    } else {
                                        return rem;
                                    }
                                } else {
                                    return rem;
                                }
                            }
                        ) + "\n";
                } else {
                    res += line + "\n";
                }
                res = res.replace(/0rem/gi, "0");
            }
        }
    }
    return res;
}
