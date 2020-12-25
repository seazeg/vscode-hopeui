"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeViewProvider = exports.TreeItemNode = void 0;
/*
 * @Author       : Evan.G
 * @Date         : 2020-12-24 15:39:21
 * @LastEditTime : 2020-12-24 18:14:18
 * @Description  :
 */
const vscode_1 = require("vscode");
const path_1 = require("path");
const ITEM_ICON_MAP = new Map([
    ["按钮(Button)", "icon.svg"],
    ["复选框(Checkbox)", "icon.svg"],
    ["文本框(Text)", "icon.svg"],
    ["单选框(Radio)", "icon.svg"],
    ["滚动条(Scrollbar)", "icon.svg"],
    ["下拉框(Selector)", "icon.svg"],
    ["联想文本框(suggest)", "icon.svg"],
    ["多行文本框(Textarea)", "icon.svg"],
    ["栅格(Grid)", "icon.svg"],
    ["动画(Animate)", "icon.svg"],
    ["轮播图(Carousel)", "icon.svg"],
    ["日期时间选择(Datepicker)", "icon.svg"],
    ["表单(Form)", "icon.svg"],
    ["弹层(Layer)", "icon.svg"],
    ["灯箱(Lightbox)", "icon.svg"],
    ["流式加载(Loadmore)", "icon.svg"],
    ["分页(Pager)", "icon.svg"],
    ["选项卡(Tab)", "icon.svg"],
    ["文件上传(Upload)", "icon.svg"],
    ["图像放大镜(Zoom)", "icon.svg"],
    ["图片充满居中(Adapimage)", "icon.svg"],
    ["数字自增效果(Numup)", "icon.svg"],
    ["响应式文本截断(Omit)", "icon.svg"],
    ["响应式图片(Picture)", "icon.svg"],
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
class TreeViewProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return [
            "按钮(Button)",
            "复选框(Checkbox)",
            "文本框(Text)",
            "单选框(Radio)",
            "滚动条(Scrollbar)",
            "下拉框(Selector)",
            "联想文本框(suggest)",
            "多行文本框(Textarea)",
            "栅格(Grid)",
            "轮播图(Carousel)",
            "日期时间选择(Datepicker)",
            "表单(Form)",
            "弹层(Layer)",
            "灯箱(Lightbox)",
            "流式加载(Loadmore)",
            "分页(Pager)",
            "选项卡(Tab)",
            "文件上传(Upload)",
            "图像放大镜(Zoom)",
            "图片充满居中(Adapimage)",
            "数字自增效果(Numup)",
            "响应式文本截断(Omit)",
            "响应式图片(Picture)",
        ].map((item) => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
    }
    static initTreeViewItem() {
        const treeViewProvider = new TreeViewProvider();
        vscode_1.window.registerTreeDataProvider("hopeUI.api", treeViewProvider);
    }
}
exports.TreeViewProvider = TreeViewProvider;
//# sourceMappingURL=treeView.js.map