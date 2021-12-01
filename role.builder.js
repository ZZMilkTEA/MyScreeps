var resourceMgr = require('./resourceMgr');
var consts = require('./consts');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var target;
	    if((creep.memory.state == consts.STATE_BUILD || creep.memory.state == consts.STATE_GET_RESOURCE) && creep.carry.energy == 0) {
            // creep.memory.state = consts.STATE_GET_RESOURCE;
            creep.memory.needNewHarvestDest = true
            creep.memory.state = consts.STATE_GET_RESOURCE;
            creep.say('🔄 get resource');
	    }
	    if((creep.memory.state == consts.STATE_GET_RESOURCE || creep.memory.state == consts.STATE_HARVEST) && creep.carry.energy == creep.carryCapacity) {
            creep.memory.needNewHarvestDest = false
	        creep.memory.state = consts.STATE_BUILD;
            resourceMgr.stopHarvest(creep.name)
	        creep.say('🚧 build');
	    }

        switch (creep.memory.state) {
        case consts.STATE_BUILD: 
            // creep.moveTo(pos(24,15), {visualizePathStyle: {stroke: '#ffffff'}});
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                for (var conSite in targets){
                    // if (targets[conSite].structureType == STRUCTURE_EXTENSION){
                    //     target = targets[conSite];
                    //     break;
                    // }
                    // else{
                        target = targets[0];
                        // creep.memory.destID = target.id
                    // }
                }
            } else {
                for (var roomID in Game.rooms) {
                    var room = Game.rooms[roomID]
                    var targets = room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        for (var conSite in targets){
                            // if (targets[conSite].structureType == STRUCTURE_EXTENSION){
                            //     target = targets[conSite];
                            //     break;
                            // }
                            // else{
                                target = targets[0];
                            // }
                        }
                    } else {
                        // console.log(Game.flags['bulderRestPos'])
                        target = Game.flags['bulderRestPos']
                        // console.log(target.pos)
                        creep.moveTo(target.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                        // creep.memory.destID = target.id
                        break
                    }
                }
            }
            console.log(creep.name+"'s target:" + target);
            creep.memory.destID = target.id
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            break
        case consts.STATE_GET_RESOURCE: 
            let ret = creep.getResourceFrom(creep.room,RESOURCE_ENERGY)
            if (ret !== 0) {
                let home = Game.rooms['E22N54']
                creep.getResourceFrom(home,RESOURCE_ENERGY)
            }
            break
        case consts.STATE_HARVEST: 
            creep.myHarvest()
            break
        }   
    }
};
module.exports = roleBuilder;