/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('consts');
 * mod.thing == 'a thing'; // true
 */

const STATE_BUILD = 'build'
const STATE_HARVEST = 'harvest'
const STATE_REST = 'rest'
const STATE_REPAIR = 'repair'
const STATE_GET_RESOURCE = 'getResource'
const STATE_CARRY = 'carry'

const CREEP_TYPE_HARVESTER = 0
const CREEP_TYPE_BUILDER = 1
const CREEP_TYPE_UPGRADER = 2
const CREEP_TYPE_REPAIRMAN = 3
const CREEP_TYPE_ATTACKER = 4
const CREEP_TYPE_CLAIMER = 5
const CREEP_TYPE_CARRIER = 6

const CREEP_ROLE_HAVERSTER = 'harvester'
const CREEP_ROLE_CARRIER = 'carrier'
const CREEP_ROLE_CLAIMER = 'claimer'

module.exports = {
    STATE_BUILD,
    STATE_HARVEST,
    STATE_REPAIR,
    STATE_REST,
    STATE_GET_RESOURCE,
    STATE_CARRY,

    CREEP_TYPE_CLAIMER,
    CREEP_TYPE_CARRIER,
    CREEP_TYPE_HARVESTER,
    CREEP_TYPE_BUILDER,
    CREEP_TYPE_UPGRADER,
    CREEP_TYPE_REPAIRMAN,
    CREEP_TYPE_ATTACKER,

    CREEP_ROLE_HAVERSTER,
    CREEP_ROLE_CARRIER,
    CREEP_ROLE_CLAIMER
};