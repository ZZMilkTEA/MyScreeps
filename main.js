var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairman = require('role.repairman');
var newName ;

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

     var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');
    console.log("---------------------------------");
    console.log("harvesters amount:" + harvesters.length);
    console.log("builders amount:" + builders.length);
    console.log("upgraders amount:" + upgraders.length);
    console.log("repairmen amount:" + repairmen.length);
    
     if(harvesters.length < 5){
         newName = "Harvester_" + parseInt(Math.random()*10);
        Game.spawns['ZMT_MotherLand'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE],newName,{memory:{role: 'harvester'}})
    }
     if(builders.length < 4){
         newName = "Builder_" + parseInt(Math.random()*10);
        Game.spawns['ZMT_MotherLand'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],newName,{memory:{role: 'builder'}})
    }
    if(upgraders.length < 3){
        newName = "Upgrader_" + parseInt(Math.random()*10);
        Game.spawns['ZMT_MotherLand'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{memory:{role: 'upgrader'}})
    }
    if(repairmen.length < 1){
        newName = "Repairman_" + parseInt(Math.random()*10);
        Game.spawns['ZMT_MotherLand'].spawnCreep([WORK,CARRY,CARRY,MOVE],newName,{memory:{role: 'repairman'}})
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairman') {
            roleRepairman.run(creep);
        }
        Game.spawns['ZMT_MotherLand'].renewCreep(creep);
    }
}