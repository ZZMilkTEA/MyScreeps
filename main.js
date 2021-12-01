var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');
var roleRepairman = require('./role.repairman');
var roleAttacker = require('./role.attacker');
var roleClaimer = require('./role.claimer');
var roleCarrier = require('./role.carrier');
var resourceMgr = require('./resourceMgr');
var consts = require('./consts');
var config = require('./config');
var utils = require('./utils');

const CREEP_TYPE_HARVESTER = 0
const CREEP_TYPE_BUILDER = 1
const CREEP_TYPE_UPGRADER = 2
const CREEP_TYPE_REPAIRMAN = 3
const CREEP_TYPE_ATTACKER = 4

Memory.sourcesHarvestCount={}

resourceMgr.init()
module.exports.loop = function () {
    loopInit()
    resourceMgr.printInfo();
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var repairmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == consts.CREEP_ROLE_CARRIER);
    console.log("---------------amount------------------");
    console.log("harvesters amount:" + harvesters.length);
    console.log("builders amount:" + builders.length);
    console.log("upgraders amount:" + upgraders.length);
    console.log("repairmen amount:" + repairmen.length);
    console.log("attackers amount:" + attackers.length);
    console.log("claimer amount:" + claimers.length);
    console.log("carrier amount:" + carriers.length);
    // console.log("---------------resouce-info------------------");
    // for (let index in Memory.sourcesHarvestCount) {
    //     console.log(index+ ":" + Memory.sourcesHarvestCount[index]);
    // }
    // console.log("-------------------------------------");
    let curSpawn = Game.spawns['MotherShip']

    if (harvesters.length < 1){
        let body = newBody({WORK:2, CARRY:1, MOVE:1})
        mySpawnCreep(curSpawn, consts.CREEP_TYPE_HARVESTER, body)
    }
    else if (carriers.length < 1){
        let body = newBody({ CARRY:3, MOVE:2})
        mySpawnCreep(curSpawn, consts.CREEP_TYPE_CARRIER, body)
    }
    else if (carriers.length < config.lowCarrierCount || harvesters.length < config.lowHarvesterCount) {
        let destType = utils.randomInt(0,1)
        switch (destType) {
        case 0:
            if (carriers.length < config.lowCarrierCount){
                let body = newBody({ CARRY:3, MOVE:2})
                mySpawnCreep(curSpawn, consts.CREEP_TYPE_CARRIER, body)
            }
            break
        case 1:
            if (harvesters.length < config.lowHarvesterCount){
                let body = newBody({WORK:2, CARRY:1, MOVE:1})
                mySpawnCreep(curSpawn, consts.CREEP_TYPE_HARVESTER, body)
            }
            break
        }
    }
    else if (harvesters.length < config.highHarvesterCount || carriers.length < config.highCarrierCount) {
        let destType = utils.randomInt(0,1)
        switch (destType) {
        case 0:
            if (harvesters.length < config.highHarvesterCount){
                let body = newBody({WORK:8, CARRY:8, MOVE:8})
                mySpawnCreep(curSpawn, consts.CREEP_TYPE_HARVESTER, body)
            }
            break
        case 1:
            if (carriers.length < config.highCarrierCount){
                let body = newBody({ CARRY:12, MOVE:12})
                mySpawnCreep(curSpawn, consts.CREEP_TYPE_CARRIER, body)
            }
            break
        }
       
    }
    // else if (attackers.length < config.attackersCount) {
    //     let body = newBody({TOUGH:30, ATTACK:2, MOVE:2 })
    //     mySpawnCreep(curSpawn, consts.CREEP_TYPE_ATTACKER, body)
    // }
    else if (builders.length < config.builderCount) {
        let body = newBody({WORK:8, CARRY:8, MOVE:8})
        mySpawnCreep(curSpawn, consts.CREEP_TYPE_BUILDER, body)
    }
    else if (repairmen.length < config.repairmenCount) {
        let body = newBody({WORK:8, CARRY:8, MOVE:8})
        mySpawnCreep(curSpawn, consts.CREEP_TYPE_REPAIRMAN, body)
    }
    else if (upgraders.length < config.upgraderCount) {
        let body = newBody({WORK:8, CARRY:8, MOVE:8})
        mySpawnCreep(curSpawn, consts.CREEP_TYPE_UPGRADER, body)
    }
    else if (claimers.length < config.claimerCount) {
        let body = newBody({CLAIM:2, MOVE:2})
        mySpawnCreep(curSpawn, consts.CREEP_TYPE_CLAIMER, body)
    }
    else if (attackers.length < config.attackersCount) {
        let body = newBody({TOUGH:10, ATTACK:10, MOVE:10 })
        mySpawnCreep(curSpawn, consts.CREEP_TYPE_ATTACKER, body)
    }
    

    var enemies = Game.rooms['E22N54'].find(FIND_HOSTILE_CREEPS);
    

//----------------------- creep 执行 ----------------------------
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == consts.CREEP_ROLE_HAVERSTER) {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairman') {
            roleRepairman.run(creep);
        }
        if (creep.memory.role == 'attacker') {
            // roleAttacker.attack(creep, enemies[0]);
            roleAttacker.attack(creep, Game.getObjectById('60b0c957fc79193ac0023dd5'));
            // roleAttacker.move(creep, Game.flags['attackerRestPos'].pos);
        }
        if (creep.memory.role == 'claimer') {
            // roleClaimer.claim(creep, enemies[0]);
            roleClaimer.claim(creep, Game.getObjectById('5bbcae209099fc012e6386f0'));
            // roleAttacker.move(creep, Game.flags['attackerRestPos'].pos);
        }
        if (creep.memory.role == consts.CREEP_ROLE_CARRIER) {
            roleCarrier.run(creep);
        }
        if (consts.autoRenew) {
            Game.spawns['MotherShip'].renewCreep(creep);
        }
    }

    let towers = Game.rooms['E22N54'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (_.sum(structure.store) < 2500  && structure.structureType ==  STRUCTURE_TOWER);
        }
    });
    for (let i in towers) {
        towers[i].attack(enemies[0])
    }

    resourceMgr.printInfo();
}

function loopInit () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
            continue;
        }
    }

    // 记录资源
    console.log('----------record source info-----------')
    for (var roomID in Game.rooms) {
        var room = Game.rooms[roomID]
        room.memory.sourcesInfo = {}
        var sources = room.find(FIND_SOURCES_ACTIVE);
        for (var sourceID in sources) {
            source = sources[sourceID];
            room.memory.sourcesInfo[source.id] = source.pos;
            Memory.sourcesHarvestCount[source.id] = 0
        }
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.state == consts.STATE_HARVEST) {
            if (creep.memory.destID == undefined) {
                console.log('creep:'+ creep.name + ' have no destID')
                continue
            }
            // if (!Memory.sourcesHarvestCount[creep.memory._move.destID]) {
            //     console.log('creep:'+ creep.name + ' have no destID'+ ' dest:' + creep.memory._move.destID)
            //     continue
            // }
            console.log('creep:'+ creep.name + ' dest:' + creep.memory.destID)
            if (Memory.sourcesHarvestCount[creep.memory.destID] != null) {
                Memory.sourcesHarvestCount[creep.memory.destID]++
            }
        }   
    }
    console.log('----------record source end-----------')
}

function mySpawnCreep(spawn, type, body) {
    let newName = ''
    let ret
    switch (type) {
    case CREEP_TYPE_HARVESTER:
        newName = "Harvester_" + parseInt(Math.random() * 100);
        ret = spawn.spawnCreep(body, newName, { memory: { role: 'harvester', state: consts.STATE_HARVEST, needNewHarvestDest: true} });
        break
    case CREEP_TYPE_BUILDER:
        newName = "Builder_" + parseInt(Math.random() * 100);
        ret = spawn.spawnCreep(body, newName, { memory: { role: 'builder', state: consts.STATE_GET_RESOURCE } });
        break
    case CREEP_TYPE_UPGRADER:
        newName = "Upgrader_" + parseInt(Math.random() * 100);
        ret = spawn.spawnCreep(body, newName, { memory: { role: 'upgrader', state: consts.STATE_GET_RESOURCE } });
        break
    case CREEP_TYPE_REPAIRMAN:
        newName = "Repairman_" + parseInt(Math.random() * 100);
        ret = spawn.spawnCreep(body, newName, { memory: { role: 'repairman', state: consts.STATE_GET_RESOURCE } });
        break
    case CREEP_TYPE_ATTACKER:
        newName = "Attacker_" + parseInt(Math.random() * 100);
        ret = spawn.spawnCreep(body, newName, { memory: { role: 'attacker', state: 'attack' } });
        break
    case consts.CREEP_TYPE_CARRIER:
        newName = "Carrier_" + parseInt(Math.random() * 100);
        ret = spawn.spawnCreep(body, newName, { memory: { role: consts.CREEP_ROLE_CARRIER, state: consts.STATE_CARRY } });
        break
    case consts.CREEP_TYPE_CLAIMER:
        newName = "Claimer_" + parseInt(Math.random() * 100);
        ret = spawn.spawnCreep(body, newName, { memory: { role: consts.CREEP_ROLE_CLAIMER, state: 'claim' } });
        break
    }
    // if (ret == OK) {
        console.log("spawn new creep! " + "type:" + type + " ret:" + ret)
    // }
}

function newBody(attrs) {
    let body = []
    for (key in attrs) {
        for (let i = 0; i < attrs[key]; i++) {
            switch (key) {
            case 'WORK':
                body.push(WORK)
                break
            case 'CARRY':
                body.push(CARRY)
                break
            case 'MOVE':
                body.push(MOVE)
                break
            case 'ATTACK':
                body.push(ATTACK)
                break
            case 'TOUGH':
                body.push(TOUGH)
                break
                case 'CLAIM':
                body.push(CLAIM)
                break            
            }
        }
    }
    return body
}

Creep.prototype.myHarvest = function(){
    this.memory.needNewStorageDest = true

    let sources = this.room.find(FIND_DROPPED_RESOURCES)
    if (sources.length !== 0) {
        if (this.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
            this.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            this.memory.destID = sources[0].id  
        }
        this.memory.needNewHarvestDest = true
        return
    }

    let source = Game.getObjectById(resourceMgr.getSourceIDByName(this.name))
    try {
        if (this.memory.needNewHarvestDest) {
            let destID = resourceMgr.getMinActiveSourceID(this.name)
            // var sources = this.room.find(FIND_SOURCES);
            this.memory.destID = source.id
            resourceMgr.startHarvest(this.name, destID)
            this.memory.needNewHarvestDest = false
        }
    } catch {
        console.log('[ERROR]' + this.name + ':' + source + '(harvest err)');
    }
    // if (source.energy == null || source.energy == 0) {
    //     this.memory.needNewHarvestDest = true
    //     return
    // }
    let ret = this.harvest(source)
    switch (ret) {
    case ERR_NOT_IN_RANGE:
        this.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        break
    case ERR_NOT_ENOUGH_RESOURCES:
        this.memory.needNewHarvestDest = true
        break
    }
}

Creep.prototype.myStorageFuncStructure = function(room){
    let target
    var spawnTargets = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity);
        }
    });
    
    var towerTargets = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (_.sum(structure.store) < 1000  && structure.structureType ==  STRUCTURE_TOWER);
        }
    });

    let canStorageSpawn = spawnTargets.length > 0
    let canStorageTower = towerTargets.length > 0
    // console.log(`name:${this.name} targets:${targets}`)
    // for (var st in targets){
    //     // console.log("stru:" + targets[st] + " type:" + targets[st].structureType);
    //     if (targets[st].structureType == STRUCTURE_EXTENSION || targets[st].structureType == STRUCTURE_SPAWN){
    //         target = targets[st];
    //         break;
    //     }
    //     else{
    //         target = targets[0];
    //     }
    // }
    if (canStorageSpawn || canStorageTower) {
        let target;
        if (this.memory.needNewStorageDest) {
            let destType = utils.randomInt(0,2)
            switch (destType) {
            default:
                if (canStorageSpawn) {
                    target = spawnTargets[0]
                } else {
                    target = containerTargets[0]
                }
                break
            }
            try{
                this.memory.destID = target.id
                this.memory.needNewStorageDest = false
                console.log("carrier name:" + this.name + " target:" + target.id);
            } catch(err) {
                console.log("[ERROR]" + this.name + ":" + err)
            }
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                this.memory.needNewStorageDest = false
            }
        } else {
            target = Game.getObjectById(this.memory.destID)
            let ret = this.transfer(target, RESOURCE_ENERGY)
            switch (ret) {
            case ERR_NOT_IN_RANGE:
                this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                this.memory.destID = target.id
                break
            case ERR_FULL:
                this.memory.needNewStorageDest = true
                break
            case OK:
                break
            default:
                this.memory.needNewStorageDest = true
            }
        }
        return 0
    } else {
        return 1
    }
}

Creep.prototype.myStorageWarehouse = function(room){
    let target
    var containerTargets = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (_.sum(structure.store) < 2500  && structure.structureType == STRUCTURE_CONTAINER);
        }
    });

    var storageTargets = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (_.sum(structure.store) < 100000  && structure.structureType == STRUCTURE_STORAGE);
        }
    });

    var towerTargets = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (_.sum(structure.store) < 1000  && structure.structureType ==  STRUCTURE_TOWER);
        }
    });

    var spawnTargets = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (_.sum(structure.energy) < 300  && structure.structureType ==  STRUCTURE_SPAWN);
        }
    });

    let canStorageContainer = containerTargets.length > 0
    let canStorageTower = towerTargets.length > 0
    let canStorageTargets = storageTargets.length > 0
    let canStorageSpawns = spawnTargets.length > 0
    // console.log(`name:${this.name} targets:${targets}`)
    // for (var st in targets){
    //     // console.log("stru:" + targets[st] + " type:" + targets[st].structureType);
    //     if (targets[st].structureType == STRUCTURE_EXTENSION || targets[st].structureType == STRUCTURE_SPAWN){
    //         target = targets[st];
    //         break;
    //     }
    //     else{
    //         target = targets[0];
    //     }
    // }
    if (canStorageContainer || canStorageTower || canStorageTargets || canStorageSpawns) {
        let target;
        if (this.memory.needNewStorageDest) {
            let destType = utils.randomInt(0,4)
            switch (destType) {
            case 0 :
                if (canStorageContainer) {
                    target = containerTargets[0]
                } else {
                    target = storageTargets[0]
                }
                break
            case 1 :
                if (canStorageTower) {
                    target = towerTargets[0]
                } else {
                    target = storageTargets[0]
                }
            break
            case 2 :
                if (canStorageSpawns) {
                    target = spawnTargets[0]
                } else {
                    target = storageTargets[0]
                }
            break
            default:
                if (canStorageTargets) {
                    target = storageTargets[0]
                } else {
                    target = containerTargets[0]
                }
                break
            }
            try{
                this.memory.destID = target.id
                this.memory.needNewStorageDest = false
                console.log("harvester name:" + this.name + " target:" + target.id);
            } catch(err) {
                console.log("[ERROR]" + this.name + ":" + err)
            }
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                this.memory.needNewStorageDest = false
            }
        } else {
            target = Game.getObjectById(this.memory.destID)
            let ret = this.transfer(target, RESOURCE_ENERGY)
            switch (ret) {
            case ERR_NOT_IN_RANGE:
                this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                this.memory.destID = target.id
                break
            case ERR_FULL:
                this.memory.needNewStorageDest = true
                break
            case OK:
                break
            default:
                this.memory.needNewStorageDest = true
            }
        }
        return 0
    } else {
        return 1
    }
}

Creep.prototype.getResourceFrom = function(room,resourceType){
    var targets = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store[resourceType] > 0);
        }
    });
    let target;
    let maxCount = 0
    for (var st in targets){
        let curCount = targets[st].store[resourceType]
        // console.log("stru:" + targets[st] + " type:" + targets[st].structureType);
        if (curCount >= maxCount){
            target = targets[st];
            maxCount = curCount
            break;
        }
    }
    if (targets.length > 0) {
        if (this.withdraw(target, resourceType) !== OK) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            this.memory.destID = target.id
        }
        return 0
    } else {
        target = Game.flags['bulderRestPos'];
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        this.memory.destID = target.id
        return 1
    }
}
