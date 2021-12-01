/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('resourceMgr');
 * mod.thing == 'a thing'; // true
 */
let consts = require('consts')
const mode = 'manual'

let resourceMgr = {
    sourcesHarvestCount: {},
    harvestCreeps: {},
    init: function() {
        switch (mode) {
        case 'autoFind':
            for (var roomID in Game.rooms) {
                var room = Game.rooms[roomID]
                room.memory.sourcesInfo = {}
                var sources = room.find(FIND_SOURCES_ACTIVE);
                for (var sourceID in sources) {
                    source = sources[sourceID];
                    this.sourcesHarvestCount[source.id] = 0
                }
            }
            break
        case 'manual':
            let sourcePool = {
                '5bbcae2e9099fc012e638877': 0,
                '5bbcae2e9099fc012e638878': 0,
                '5bbcae209099fc012e6386f1': 3,
                // '5bbcae209099fc012e6386f2': 0,
                // '5bbcae2e9099fc012e63887b': 0,
            }
            this.sourcesHarvestCount = sourcePool
            break
        }
            for (var name in Game.creeps) {
                var creep = Game.creeps[name];
                if (creep.memory.state == consts.STATE_HARVEST) {
                    // if (!Memory.sourcesHarvestCount[creep.memory._move.destID]) {
                    //     console.log('creep:'+ creep.name + ' have no destID'+ ' dest:' + creep.memory._move.destID)
                    //     continue
                    // }
                    let minID = this.getMinActiveSourceID()
                    this.harvestCreeps[creep.name] = minID
                    this.sourcesHarvestCount[minID]++
                }
            }
        console.log("resourceMgr init complete! ")
    },
    getMinActiveSourceID: function() {
        let ID = ''
        let minCount = 9999
        for (sourceID in this.sourcesHarvestCount) {
            if (this.sourcesHarvestCount[sourceID] < minCount) {
                let source = Game.getObjectById(sourceID)
                // console.log("[getMinActiveSourceID]:"+ source);
                if (source.energy == undefined) {
                    continue
                }
                if (source.energy == 0) {
                    continue
                }
                minCount = this.sourcesHarvestCount[sourceID]
                ID = sourceID
            }
        }
        return ID
    },
    startHarvest: function(name, sourceID) {
        if (!this.sourcesHarvestCount[sourceID]) {
            delete  this.sourcesHarvestCount[sourceID]
            return 1
        }
        this.harvestCreeps[name] = sourceID
        this.sourcesHarvestCount[sourceID]++
    },
    stopHarvest: function(name) {
        let sourceID = this.harvestCreeps[name]
        delete this.harvestCreeps[name] 
        if (!this.sourcesHarvestCount[sourceID]) {
            delete  this.sourcesHarvestCount[sourceID]
        }
        this.sourcesHarvestCount[sourceID]--
    },
    getSourceIDByName: function(name) {
        return this.harvestCreeps[name]
    },
    printInfo: function() {
        for (let index in this.sourcesHarvestCount) {
            console.log("resourceMgr: " + index + ":" + this.sourcesHarvestCount[index]);
        }
        // for (let index in this.harvestCreeps) {
        //     console.log("resourceMgr: creep:" + index + " harvest:" + this.harvestCreeps[index]);
        // }
    }
} 

module.exports = resourceMgr;