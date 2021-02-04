"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsTreeView = exports.TreeItemNode = void 0;
/*
 * @Author       : Evan.G
 * @Date         : 2020-12-24 15:39:21
 * @LastEditTime : 2021-02-04 12:00:17
 * @Description  :
 */
const vscode_1 = require("vscode");
const path_1 = require("path");
const ITEM_ICON_MAP = new Map([
    ["HopeUI主题生成   [ctrl / cmd + shift + t]", "theme.svg"],
    ["Px转换成Rem   [ctrl / cmd + shift + p]", "tools.svg"],
    ["Rem转换成Px   [ctrl / cmd + shift + r]", "tools.svg"],
    ["获取HopeUI最新版", "version.svg"],
]);
class TreeItemNode extends vscode_1.TreeItem {
    constructor(label, type, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.type = type;
        this.collapsibleState = collapsibleState;
        this.command = {
            title: this.label,
            command: "convert",
            tooltip: this.label,
            arguments: [{ label: this.label, type: this.type }],
        };
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label);
    }
    static getIconUriForLabel(label) {
        return vscode_1.Uri.file(path_1.join(__filename, "..", "images", ITEM_ICON_MAP.get(label) + ""));
    }
}
exports.TreeItemNode = TreeItemNode;
class ToolsTreeView {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return [
            { label: "获取HopeUI最新版", type: "version" },
            { label: "HopeUI主题生成   [ctrl / cmd + shift + t]", type: "theme" },
            { label: "Px转换成Rem   [ctrl / cmd + shift + p]", type: "px2rem" },
            { label: "Rem转换成Px   [ctrl / cmd + shift + r]", type: "rem2px" },
        ].map((item) => new TreeItemNode(item.label, item.type, vscode_1.TreeItemCollapsibleState.None));
    }
    static initTreeViewItem() {
        const treeViewProvider = new ToolsTreeView();
        vscode_1.window.registerTreeDataProvider("hopeUI.tools", treeViewProvider);
    }
}
exports.ToolsTreeView = ToolsTreeView;
//# sourceMappingURL=tools.js.map