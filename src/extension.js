"use strict";
/*
 * @Author : Evan.G
 * @Date : 2020-12-23 10:03:49
 * @LastEditTime : 2021-01-29 17:52:20
 * @Description :
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const treeView_1 = require("./treeView");
const webView_1 = require("./webView");
const fs = require("fs");
const path = require("path");
// const less = require("less");
// const shell = require("shelljs");
const LABEL_URI_MAP = new Map([
    ["获取最新版", "概览-welcome-to-hopeui--welcome-to-hope-ui"],
    ["按钮 [Button]", "基础控件-按钮-button--通用"],
    ["复选框 [Checkbox]", "基础控件-复选框-checkbox--复选框-checkbox"],
    ["文本框 [Text]", "基础控件-文本框-text--通用"],
    ["单选框 [Radio]", "基础控件-单选框-radio--单选框-radio"],
    ["滚动条 [Scrollbar]", "基础控件-滚动条-scrollbar--滚动条-scrollbar"],
    ["下拉框 [Selector]", "基础控件-下拉框-selector--下拉框-selector"],
    ["联想文本框 [Suggest]", "基础控件-联想文本框-suggest--联想文本框-suggest"],
    [
        "多行文本框 [Textarea]",
        "基础控件-多行文本框-textarea--多行文本框-textarea",
    ],
    ["栅格 [Grid]", "基础控件-栅格-grid--基础"],
    ["动画 [Animate]", "基础控件-动画-animate--动画-animate"],
    ["轮播图 [Carousel]", "复用组件-轮播图-carousel--通用"],
    [
        "日期时间选择 [Datepicker]",
        "复用组件-日期时间选择-datepicker--日期时间选择-datepicker",
    ],
    ["表单 [Form]", "复用组件-表单-form--表单-form"],
    ["弹层 [Layer]", "复用组件-弹层-layer--通用"],
    ["灯箱 [Lightbox]", "复用组件-灯箱-lightbox--iframe模式"],
    ["流式加载 [Loadmore]", "复用组件-流式加载-loadmore--流式加载-loadmore"],
    ["分页 [Pager]", "复用组件-分页-pager--基础"],
    ["选项卡 [Tab]", "复用组件-选项卡-tab--通用"],
    ["文件上传 [Upload]", "复用组件-文件上传-upload--文件上传-upload"],
    ["图像放大镜 [Zoom]", "复用组件-图像放大镜-zoom--图像放大镜-zoom"],
    [
        "图片充满居中 [Adapimage]",
        "常用函数-图片充满居中-adapimage--图片充满居中-adapimage",
    ],
    ["数字自增效果 [Numup]", "常用函数-数字自增效果-numup--数字自增效果-numup"],
    [
        "响应式文本截断 [Omit]",
        "常用函数-响应式文本截断-omit--响应式文本截断-omit",
    ],
    ["响应式图片 [Picture]", "常用函数-响应式图片-picture--响应式图片-picture"],
    [
        "图片懒加载 [Lazyload]",
        "复用组件-图片懒加载-lazyload--图片懒加载-lazyload",
    ],
    ["工具函数 [Utils]", "常用函数-工具函数-utils--page"],
]);
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("ext.hopeui.breakpoint", () => {
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
                        fs.readFile(__dirname +
                            "/generate/styles/config_ext.less", "utf-8", function (error, data) {
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
                                    name: "我是终端的名字",
                                });
                                // terminalA.show(
                                //     false
                                // );
                                console.log("root_path", vscode.env);
                                terminalA.sendText(`${path.resolve(__dirname, "../node_modules/less/bin/lessc")} ${__dirname}/generate/hopeui.less ${__dirname}/libs/hopeui.min.css --clean-css="advanced"`);
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
    }));
    context.subscriptions.push(vscode.commands.registerCommand("ext.hopeui.open", () => {
        vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(`https://gitee.com/seazeg/hopeui/raw/master/hopeui.zip`));
    }));
    treeView_1.TreeViewProvider.initTreeViewItem();
    context.subscriptions.push(vscode.commands.registerCommand("itemClick", (label) => {
        if (label != "基础控件" &&
            label != "复用组件" &&
            label != "常用函数" &&
            label != "HopeUI") {
            if (label == "获取最新版") {
                vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(`https://gitee.com/seazeg/hopeui/raw/master/hopeui.zip`));
            }
            else {
                const webView = webView_1.createWebView(context, vscode.ViewColumn.Active, LABEL_URI_MAP.get(label), label);
                context.subscriptions.push(webView);
            }
        }
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map