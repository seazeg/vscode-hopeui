/*
 * @Author       : Evan.G
 * @Date         : 2020-12-23 10:03:49
 * @LastEditTime : 2020-12-23 18:07:57
 * @Description  :
 */

const vscode = require("vscode");

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function (context) {
    console.log("恭喜，您的扩展“vscode-plugin”已被激活！");
    // 注册命令
    context.subscriptions.push(
        vscode.commands.registerCommand("ext.hopeui.init", function (uri) {
            vscode.window.showInformationMessage('HopeUI');
        })
    );

};

/**
 * 插件被释放时触发
 */
exports.deactivate = function () {
    console.log("您的扩展“vscode-plugin”已被释放！");
};
