var consts = require('./consts')

var roleRepairman = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.state == consts.STATE_REPAIR && creep.carry.energy == 0) {
            creep.memory.state = consts.STATE_GET_RESOURCE;
            creep.say('🔄 get resource');
        }
        if ((creep.memory.state == consts.STATE_GET_RESOURCE || creep.memory.state == consts.STATE_HARVEST) && creep.carry.energy == creep.carryCapacity) {
            creep.memory.state = consts.STATE_REPAIR;
            creep.say('🚧 repair');
        }

        switch (creep.memory.state) {
        case consts.STATE_REPAIR:
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a, b) => a.hits - b.hits);

            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    creep.memory.destID = targets[0].id
                }
            }
            break
        case consts.STATE_GET_RESOURCE || consts.STATE_HARVEST: 
            let ret = creep.getResourceFrom(creep.room,RESOURCE_ENERGY)
            if (ret !== 0) {
                let home = Game.rooms['E22N54']
                creep.getResourceFrom(home,RESOURCE_ENERGY)
            }
            break
        }
    }
}

module.exports = roleRepairman;