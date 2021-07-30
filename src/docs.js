"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsTreeView = exports.TreeItemNode = void 0;
/*
 * @Author       : Evan.G
 * @Date         : 2020-12-24 15:39:21
 * @LastEditTime : 2021-07-30 14:25:17
 * @Description  :
 */
const vscode_1 = require("vscode");
const path_1 = require("path");
const ITEM_ICON_MAP = new Map([
    ["按钮 [Button]", "controls.svg"],
    ["复选框 [Checkbox]", "controls.svg"],
    ["文本框 [Text]", "controls.svg"],
    ["单选框 [Radio]", "controls.svg"],
    ["滚动条 [Scrollbar]", "controls.svg"],
    ["下拉框 [Selector]", "controls.svg"],
    ["联想文本框 [Suggest]", "controls.svg"],
    ["多行文本框 [Textarea]", "controls.svg"],
    ["栅格 [Grid]", "controls.svg"],
    ["动画 [Animate]", "controls.svg"],
    ["轮播图 [Carousel]", "components.svg"],
    ["日期时间选择 [Datepicker]", "components.svg"],
    ["锚点 [Anchor]", "components.svg"],
    ["表单 [Form]", "components.svg"],
    ["抽屉 [Drawer]", "components.svg"],
    ["弹层 [Layer]", "components.svg"],
    // ["灯箱 [Lightbox]", "components.svg"],
    ["流式加载 [Loadmore]", "components.svg"],
    ["分页 [Pager]", "components.svg"],
    ["选项卡 [Tab]", "components.svg"],
    ["文件上传 [Upload]", "components.svg"],
    ["图像放大镜 [Zoom]", "components.svg"],
    ["图片充满居中 [Adapimage]", "utils.svg"],
    ["数字自增效果 [Numup]", "utils.svg"],
    ["响应式文本截断 [Omit]", "utils.svg"],
    ["响应式图片 [Picture]", "utils.svg"],
    ["图片懒加载 [Lazyload]", "utils.svg"],
    ["工具函数 [Utils]", "utils.svg"],
    ["基础控件", "controls.svg"],
    ["复用组件", "components.svg"],
    ["常用函数", "utils.svg"],
]);
class TreeItemNode extends vscode_1.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = {
            title: this.label,
            command: "itemClick",
            tooltip: this.label,
            arguments: [this.label],
        };
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label);
    }
    static getIconUriForLabel(label) {
        return vscode_1.Uri.file(path_1.join(__filename, "..", "images", ITEM_ICON_MAP.get(label) + ""));
    }
}
exports.TreeItemNode = TreeItemNode;
class DocsTreeView {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            console.log(element);
            if (element.label == "基础控件") {
                return [
                    "按钮 [Button]",
                    "复选框 [Checkbox]",
                    "文本框 [Text]",
                    "单选框 [Radio]",
                    "滚动条 [Scrollbar]",
                    "下拉框 [Selector]",
                    "联想文本框 [Suggest]",
                    "多行文本框 [Textarea]",
                    "栅格 [Grid]",
                    "动画 [Animate]",
                ].map((item) => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
            }
            else if (element.label == "复用组件") {
                return [
                    "锚点 [Anchor]",
                    "轮播图 [Carousel]",
                    "日期时间选择 [Datepicker]",
                    "抽屉 [Drawer]",
                    "表单 [Form]",
                    "弹层 [Layer]",
                    // "灯箱 [Lightbox]",
                    "流式加载 [Loadmore]",
                    "分页 [Pager]",
                    "选项卡 [Tab]",
                    "文件上传 [Upload]",
                    "图像放大镜 [Zoom]",
                ].map((item) => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
            }
            else if (element.label == "常用函数") {
                return [
                    "图片充满居中 [Adapimage]",
                    "数字自增效果 [Numup]",
                    "响应式文本截断 [Omit]",
                    "响应式图片 [Picture]",
                    "图片懒加载 [Lazyload]",
                    "工具函数 [Utils]",
                ].map((item) => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
            }
        }
        else {
            return ["基础控件", "复用组件", "常用函数"].map((item) => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.Expanded));
        }
    }
    static initTreeViewItem() {
        const treeViewProvider = new DocsTreeView();
        vscode_1.window.registerTreeDataProvider("hopeUI.api", treeViewProvider);
    }
}
exports.DocsTreeView = DocsTreeView;
//# sourceMappingURL=docs.js.map