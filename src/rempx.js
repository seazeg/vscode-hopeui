"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rempx = void 0;
/*
 * @Author       : Evan.G
 * @Date         : 2021-02-03 15:19:29
 * @LastEditTime : 2021-02-04 15:11:21
 * @Description  :
 */
const vscode_1 = require("vscode");
const beautify = require("js-beautify");
const fs = require("fs");
function rempx(type) {
    if (!vscode_1.window.activeTextEditor)
        return;
    getFileContents(vscode_1.window.activeTextEditor.document.fileName, type).then(function (data) {
        if (!vscode_1.window.activeTextEditor)
            return;
        vscode_1.window.activeTextEditor.edit((editBuilder) => {
            // 从开始到结束，全量替换
            if (!vscode_1.window.activeTextEditor)
                return;
            const end = new vscode_1.Position(vscode_1.window.activeTextEditor.document.lineCount + 1, 0);
            editBuilder.replace(new vscode_1.Range(new vscode_1.Position(0, 0), end), data);
        });
    });
}
exports.rempx = rempx;
function getFileContents(filepath, type) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fs.readFile(filepath, "utf-8", function (error, data) {
            if (error)
                reject(error);
            resolve(converter(data, type));
        });
    }));
}
function converter(data, type) {
    let source = data;
    let ratio = 100;
    let res = "";
    if (source) {
        source = beautify.css(source);
        let arr = source.split("\n");
        let len = arr.length;
        if (type == "px2rem") {
            for (let i = 0; i < len; i++) {
                let line = arr[i];
                if (!line.includes("@media")) {
                    res +=
                        line.replace(/([1-9]\d*.\d*|1?.\d*[1-9]\d*|\d*[1-9]\d*)px/g, function (px) {
                            let tmp = px;
                            if (px.includes(":")) {
                                px = px.replace(":", "");
                            }
                            if (!!px) {
                                if (!/border:|text-indent:|z-index:/gi.test(line)) {
                                    if (tmp.includes(":")) {
                                        return (":" +
                                            parseFloat(px) / ratio +
                                            "rem");
                                    }
                                    else {
                                        return (" " +
                                            parseFloat(px) / ratio +
                                            "rem");
                                    }
                                }
                                else {
                                    return px;
                                }
                            }
                            else {
                                return px;
                            }
                        }) + "\n";
                }
                else {
                    res += line + "\n";
                }
                res = res.replace(/0px/gi, "0");
            }
        }
        else if (type == "rem2px") {
            for (let i = 0; i < len; i++) {
                let line = arr[i];
                if (!line.includes("@media")) {
                    res +=
                        line.replace(/([1-9]\d*.\d*|0?.\d*[1-9]\d*|\d*[1-9]\d*)rem/g, function (rem) {
                            let tmp = rem;
                            if (rem.includes(":")) {
                                rem = rem.replace(":", "");
                            }
                            if (!!rem) {
                                if (!/border:|text-indent:|z-index:/gi.test(line)) {
                                    if (tmp.includes(":")) {
                                        return (":" +
                                            parseFloat(rem) * ratio +
                                            "px");
                                    }
                                    else {
                                        return (" " +
                                            parseFloat(rem) * ratio +
                                            "px");
                                    }
                                }
                                else {
                                    return rem;
                                }
                            }
                            else {
                                return rem;
                            }
                        }) + "\n";
                }
                else {
                    res += line + "\n";
                }
                res = res.replace(/0rem/gi, "0");
            }
        }
    }
    return res;
}
//# sourceMappingURL=rempx.js.map