/*
 * @Author       : Evan.G
 * @Date         : 2020-12-24 15:39:21
 * @LastEditTime : 2020-12-24 18:14:18
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

export class TreeItemNode extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }

    command = {
        title: this.label,
        command: "itemClick",
        tooltip: this.label,
        arguments: [this.label],
    };

    iconPath = TreeItemNode.getIconUriForLabel(this.label);

    static getIconUriForLabel(label: string): Uri {
        return Uri.file(
            join(__filename, "..", "images", ITEM_ICON_MAP.get(label) + "")
        );
    }
}

export class TreeViewProvider implements TreeDataProvider<TreeItemNode> {
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
        ].map(
            (item) =>
                new TreeItemNode(
                    item as string,
                    TreeItemCollapsibleState.None as TreeItemCollapsibleState
                )
        );
    }

    public static initTreeViewItem() {
        const treeViewProvider = new TreeViewProvider();
        window.registerTreeDataProvider("hopeUI.api", treeViewProvider);
    }
}
