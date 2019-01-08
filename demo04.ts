interface CmdConfig{
  execute:object;
  [propName:string]:any;
}



const MacroCommand = function(){
  return{
    commandsList:[],
    add(command:any):any{
        this.commandsList.push(command)
    },
    execute(){
      for(var i =0,command;command=this.commandsList[i++];){
        command.execute()
      }
    }
  }
}

const openAcCommand = {
  execute(){
    console.log('打开空调')
  }
}

const openTvCommand = {
  execute(){
    console.log('打开TV')
  }
}

const openSoundCommand = {
  execute(){
    console.log('打开音箱')
  }
}
  


const macroCommand1 = MacroCommand()
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)

const macroCommand = MacroCommand()
macroCommand.add(openAcCommand)
macroCommand.add(macroCommand1)


const setCommand = (function(cmd){
  document.getElementById('button').onclick = function(){
    cmd.execute()
  }
})(macroCommand)