let resourceMgr = require('./resourceMgr')
var consts = require('./consts')
var utils = require('./utils');

var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // let curState = creep.memory.state
        if(creep.memory.state == 'upgrade' && creep.carry.energy == 0) {
            creep.memory.state = consts.STATE_GET_RESOURCE;
            creep.say('🔄 get resource');
        }
        if (creep.memory.state == consts.STATE_GET_RESOURCE && creep.carry.energy == creep.carryCapacity) {
            creep.memory.needNewCtrlDest = true
            creep.memory.state = 'upgrade';
            creep.say('⚡ upgrade');
        }
        switch (creep.memory.state) {
            case 'upgrade':
                let target = Game.getObjectById(creep.memory.destID) 
                if (creep.memory.needNewCtrlDest) {
                    let destPos = utils.randomInt(0,1)
                   
                    switch (destPos) {
                    case 0:
                        target = Game.rooms['E22N54'].controller
                        break
                    case 1:
                        target = Game.rooms['E21N54'].controller
                        break
                    }
                    creep.memory.destID = target.id
                    creep.memory.needNewCtrlDest = false
                }
                if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
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
            default:
                creep.memory.needNewCtrlDest = false
                creep.memory.state = consts.STATE_GET_RESOURCE
            }
            
	}
};

module.exports = roleUpgrader;