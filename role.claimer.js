/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */

var roleClaimer = {
     /** @param {Creep} creep **/
     claim: function(creep, target) {
        let ret = creep.claimController(target)
        switch (ret) {
        case ERR_NOT_IN_RANGE:
            console.log('attacker:' + creep.name + ' ERR_NOT_IN_RANGE');
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
            creep.memory.destID = target.id
            break
        default:
            console.log('attacker:' + creep.name + ' ret:' + ret);
        }
    },
    move: function(creep, target){
        creep.moveTo(target, {visualizePathStyle: {stroke: '#008800'}});
        creep.memory.dest = target
    }
};
module.exports = roleClaimer;