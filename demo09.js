"use strict";
// 中介者模式
var players = [];
var Player = /** @class */ (function () {
    function Player(name, teamColor) {
        this.state = 'live';
        this.name = name;
        this.teamColor = teamColor;
    }
    Player.prototype.win = function () {
        console.log(this.name + ' won');
    };
    Player.prototype.lose = function () {
        console.log(this.name + ' lost');
    };
    Player.prototype.die = function () {
        this.state = 'dead';
        playerDirector.ReceiveMessage('playerDead', this);
    };
    Player.prototype.remove = function () {
        playerDirector.ReceiveMessage('removePlayer', this);
    };
    Player.prototype.changeTeam = function (color) {
        playerDirector.ReceiveMessage('changeTeam', this, color);
    };
    return Player;
}());
var playerFactory = function (name, teamColor) {
    var newPlayer = new Player(name, teamColor);
    playerDirector.ReceiveMessage('addPlayer', newPlayer);
    return newPlayer;
};
var playerDirector = (function () {
    var players = {}, operations = {};
    operations.addPlayer = function (player) {
        var teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || [];
        players[teamColor].push(player);
    };
    operations.removePlayer = function (player) {
        var teamColor = player.teamColor, teamPlayers = players[teamColor] || [];
        for (var i = teamPlayers.length - 1; i >= 0; i--) {
            if (teamPlayers[i] === player) {
                teamPlayers.splice(i, 1);
            }
        }
    };
    operations.changeTeam = function (player, newTeamColor) {
        operations.removePlayer(player);
        player.teamColor = newTeamColor;
        operations.addPlayer(player);
    };
    operations.playerDead = function (player) {
        var teamColor = player.teamColor, teamPlayers = players[teamColor] || [];
        var all_dead = true;
        for (var i = 0, player_1; player_1 = teamPlayers[i++];) {
            if (player_1.state !== 'dead') {
                all_dead = false;
                break;
            }
        }
        if (all_dead === true) {
            for (var i = 0, player_2; player_2 = teamPlayers[i++];) {
                player_2.lose();
            }
            for (var color in players) {
                if (color !== teamColor) {
                    var teamPlayers_1 = players[color];
                    for (var i = 0, player_3; player_3 = teamPlayers_1[i++];) {
                        player_3.win();
                    }
                }
            }
        }
    };
    var ReceiveMessage = function () {
        var message = Array.prototype.shift.call(arguments);
        operations[message].apply(this, arguments);
    };
    return { ReceiveMessage: ReceiveMessage };
})();
var player1 = playerFactory('小皮', 'red'), player2 = playerFactory('小红', 'red'), player3 = playerFactory('小明', 'red');
var player4 = playerFactory('黑妞', 'blue'), player5 = playerFactory('葱头', 'blue'), player6 = playerFactory('胖妞', 'blue');
player1.changeTeam('blue');
player2.die();
player3.die();
