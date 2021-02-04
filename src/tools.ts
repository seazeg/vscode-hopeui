/*
 * @Author       : Evan.G
 * @Date         : 2020-12-24 15:39:21
 * @LastEditTime : 2021-02-04 12:00:17
 * @Description  :
 */
import {
    TreeItem,
    TreeItemCollapsibleState,
    TreeDataProvider,
    Uri,
    window,
} from "vscode";
import { join } from "path";

const ITEM_ICON_MAP = new Map<string, string>([
    ["HopeUI主题生成   [ctrl / cmd + shift + t]", "theme.svg"],
    ["Px转换成Rem   [ctrl / cmd + shift + p]", "tools.svg"],
    ["Rem转换成Px   [ctrl / cmd + shift + r]", "tools.svg"],
    ["获取HopeUI最新版", "version.svg"],
    // ["颜色hex转换成rgb", "tools.svg"],
    // ["颜色rgb转换成hex", "tools.svg"],
]);

export class TreeItemNode extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly type: string,
        public readonly collapsibleState: TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }

    command = {
        title: this.label,
        command: "convert",
        tooltip: this.label,
        arguments: [{ label: this.label, type: this.type }],
    };

    iconPath = TreeItemNode.getIconUriForLabel(this.label);

    static getIconUriForLabel(label: string): Uri {
        return Uri.file(
            join(__filename, "..", "images", ITEM_ICON_MAP.get(label) + "")
        );
    }
}

export class ToolsTreeView implements TreeDataProvider<TreeItemNode> {
    onDidChangeTreeData?:
        | import("vscode").Event<TreeItemNode | null | undefined>
        | undefined;

    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(
        element?: TreeItemNode | undefined
    ): import("vscode").ProviderResult<TreeItemNode[]> {
        return [
            { label: "获取HopeUI最新版", type: "version" },
            { label: "HopeUI主题生成   [ctrl / cmd + shift + t]", type: "theme" },
            { label: "Px转换成Rem   [ctrl / cmd + shift + p]", type: "px2rem" },
            { label: "Rem转换成Px   [ctrl / cmd + shift + r]", type: "rem2px" },
            // { label: "颜色hex转换成rgb", type: "hex2rgb" },
            // { label: "颜色rgb转换成hex", type: "rgb2hex" },
        ].map(
            (item) =>
                new TreeItemNode(
                    item.label as string,
                    item.type as string,
                    TreeItemCollapsibleState.None as TreeItemCollapsibleState
                )
        );
    }

    public static initTreeViewItem() {
        const treeViewProvider = new ToolsTreeView();
        window.registerTreeDataProvider("hopeUI.tools", treeViewProvider);
    }
}
