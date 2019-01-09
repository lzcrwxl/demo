// 中介者模式
let players:any[] = []
class Player{
  name:string
  state:string
  teamColor:string
  constructor(name:any,teamColor:string){
    this.state = 'live'
    this.name = name
    this.teamColor = teamColor
  }
  win(){
    console.log(this.name+ ' won')
  }
  lose(){
    console.log(this.name + ' lost')
  }
  die(){
    this.state = 'dead'
    playerDirector.ReceiveMessage('playerDead',this)
  }
  remove(){
    playerDirector.ReceiveMessage('removePlayer',this)
  }
  changeTeam(color){
    playerDirector.ReceiveMessage('changeTeam',this,color)
  }
}





let playerFactory = function(name,teamColor){
  let newPlayer = new Player(name,teamColor)
  playerDirector.ReceiveMessage('addPlayer',newPlayer)
  return newPlayer
}

let playerDirector = (function(){
  let players = {},operations = {}
  operations.addPlayer = function(player){
    var teamColor = player.teamColor
    players[teamColor] = players[teamColor]||[]
    players[teamColor].push(player)
  }
  operations.removePlayer = function(player){
    var teamColor = player.teamColor,teamPlayers = players[teamColor]||[]
    for(var i = teamPlayers.length-1;i>=0;i--){
      if(teamPlayers[i]===player){
        teamPlayers.splice(i,1)
      }
    }
  }
  operations.changeTeam = function(player,newTeamColor){
    operations.removePlayer(player)
    player.teamColor = newTeamColor
    operations.addPlayer(player)
  }
  operations.playerDead = function(player){
    var teamColor = player.teamColor,teamPlayers = players[teamColor]||[]
    var all_dead = true
    for(let i =0,player;player=teamPlayers[i++];){
      if(player.state!=='dead'){
        all_dead = false;
        break;
      }
    }
    if(all_dead === true){
      for(let i =0,player;player = teamPlayers[i++];){
        player.lose()
      }
      for(let color in players){
        if(color!==teamColor){
          let teamPlayers = players[color]
          for(let i =0,player;player=teamPlayers[i++];){
            player.win()
          }
        }
      }
    }
  }
  let ReceiveMessage = function(){
    let message = Array.prototype.shift.call(arguments)
    operations[message].apply(this,arguments)
  }
  return {ReceiveMessage}
})()



var player1 = playerFactory('小皮','red'),
player2 = playerFactory('小红','red'),
player3 = playerFactory('小明','red')


var player4 = playerFactory('黑妞','blue'),
player5 = playerFactory('葱头','blue'),
player6 = playerFactory('胖妞','blue')


player1.changeTeam('blue')
player2.die()
player3.die()