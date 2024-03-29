var roleAttacker = {
    /** @param {Creep} creep **/
    attack: function(creep, target) {
        let ret = creep.attack(target)
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

module.exports = roleAttacker;