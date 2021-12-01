var resourceMgr = require('./resourceMgr');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        var target;
        if(creep.memory.state == 'storage' && creep.carry.energy == 0) {
            creep.memory.needNewHarvestDest = true
            // var sources = creep.room.find(FIND_DROPPED_RESOURCES);
            // // for (var i = 0;i < sources.length;){
            // //     if (sources[i].energy == 0){
            // //         sources.splice(i,1);
            // //     }
            // //     else{
            // //         i++;
            // //     }
            // // }
            // if (sources.length == 0) {
            //     // sources = creep.room.find(FIND_SOURCES_ACTIVE)
            //     // if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            //     //     creep.memory.destID = sources[0].id
            //     // }
            //     let destID = ''
            //     let minCount = 9999
            //     for (let index in Memory.sourcesHarvestCount) {
            //         if (Memory.sourcesHarvestCount[index] < minCount) {
            //             minCount = Memory.sourcesHarvestCount[index]
            //             destID = index
            //         }
            //     }
            //     let source = Game.getObjectById(destID)
            //     // var sources = creep.room.find(FIND_SOURCES);
            //     creep.memory.destID = source.id
            //     Memory.sourcesHarvestCount[creep.memory.destID]++
            //     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            //     }
                
            // }
            // if (creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            //     creep.memory.destID = sources[0].id
            // }
            creep.memory.state = 'harvest';
            creep.say('🔄 harvest');
        }
        if(creep.memory.state == 'harvest' && creep.carry.energy == creep.carryCapacity) {
            resourceMgr.stopHarvest(creep.name)
            creep.memory.needNewStorageDest = true
            creep.memory.state = 'storage';
            creep.say('🚧 storage');
        }
        switch (creep.memory.state) {
        case 'harvest':
            creep.myHarvest()
            break;
        case 'storage':
            let ret = creep.myStorageWarehouse(creep.room)
            if (ret !== 0) {
                let home = Game.rooms['E22N54']
                creep.myStorageWarehouse(home)
            }
            break;
        default:
            creep.memory.state = 'harvest';
        }
    }
}

module.exports = roleHarvester;