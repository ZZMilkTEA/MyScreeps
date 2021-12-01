/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carryer');
 * mod.thing == 'a thing'; // true
 */
var consts = require('./consts')

var roleCarrier = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.state == consts.STATE_CARRY && creep.carry.energy == 0) {
            creep.memory.state = consts.STATE_GET_RESOURCE;
            creep.say('🔄 get resource');
        }
        if ((creep.memory.state == consts.STATE_GET_RESOURCE || creep.memory.state == consts.STATE_HARVEST) && creep.carry.energy == creep.carryCapacity) {
            creep.memory.state = consts.STATE_CARRY;
            creep.memory.needNewStorageDest = true
            creep.say('🚧 carry');
        }

        let ret;
        switch (creep.memory.state) {
        case consts.STATE_CARRY:
            ret = creep.myStorageFuncStructure(creep.room)
            if (ret !== 0) {
                let home = Game.rooms['E22N54']
                creep.myStorageFuncStructure(home)
            }
            break;
        case consts.STATE_GET_RESOURCE || consts.STATE_HARVEST: 
            ret = creep.getResourceFrom(creep.room,RESOURCE_ENERGY)
            if (ret !== 0) {
                let home = Game.rooms['E22N54']
                creep.getResourceFrom(home,RESOURCE_ENERGY)
            }
            break
        }
    }
}

module.exports = roleCarrier;