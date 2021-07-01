/*
 * @Author : Evan.G
 * @Date : 2020-12-23 10:03:49
 * @LastEditTime : 2021-07-01 13:37:46
 * @Description :
 */

import * as vscode from "vscode";
import { DocsTreeView } from "./docs";
import { ToolsTreeView } from "./tools";
import { createWebView } from "./webView";
import { styleGenerated } from "./styleGenerated";
import { rempx } from "./rempx";

const LABEL_URI_MAP: any = new Map<string, string>([
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
    ["抽屉 [Drawer]", "复用组件-抽屉-drawer--抽屉-drawer"],
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

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("ext.hopeui.theme", () => {
            styleGenerated();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("ext.hopeui.rem2px", () => {
            rempx("rem2px");
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("ext.hopeui.px2rem", () => {
            rempx("px2rem");
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("ext.hopeui.open", () => {
            vscode.commands.executeCommand(
                "vscode.open",
                vscode.Uri.parse(
                    `https://gitee.com/seazeg/hopeui/raw/master/hopeui.zip`
                )
            );
        })
    );

    DocsTreeView.initTreeViewItem();
    context.subscriptions.push(
        vscode.commands.registerCommand("itemClick", (label) => {
            if (
                label != "基础控件" &&
                label != "复用组件" &&
                label != "常用函数" &&
                label != "HopeUI"
            ) {
                const webView = createWebView(
                    context,
                    vscode.ViewColumn.Active,
                    LABEL_URI_MAP.get(label),
                    label
                );
                context.subscriptions.push(webView);
            }
        })
    );

    ToolsTreeView.initTreeViewItem();
    context.subscriptions.push(
        vscode.commands.registerCommand("tools", (object) => {
            switch (object.type) {
                case "rem2px":
                    rempx(object.type);
                    break;
                case "px2rem":
                    rempx(object.type);
                    break;
                case "theme":
                    styleGenerated();
                    break;
                case "version":
                    vscode.commands.executeCommand(
                        "vscode.open",
                        vscode.Uri.parse(
                            `https://gitee.com/seazeg/hopeui/raw/master/hopeui.zip`
                        )
                    );
                    break;
                case "hex2rgb":

                default:
                    break;
            }
        })
    );
    
}