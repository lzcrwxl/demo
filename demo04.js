"use strict";
var MacroCommand = function () {
    return {
        commandsList: [],
        add: function (command) {
            this.commandsList.push(command);
        },
        execute: function () {
            for (var i = 0, command; command = this.commandsList[i++];) {
                command.execute();
            }
        }
    };
};
var openAcCommand = {
    execute: function () {
        console.log('打开空调');
    }
};
var openTvCommand = {
    execute: function () {
        console.log('打开TV');
    }
};
var openSoundCommand = {
    execute: function () {
        console.log('打开音箱');
    }
};
var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
var setCommand = (function (cmd) {
    document.getElementById('button').onclick = function () {
        cmd.execute();
    };
})(macroCommand);
