'use strict';
//require assert
var assert = require('assert');

var jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// Your code here
function CrewMember (name, job, specialSkill) {
  this.name = name;
  this.job = job;
  this.specialSkill = specialSkill;
  this.ship = null;
  this.enterShip = function (Ship) {
    (Ship).crew.push(this);
    this.ship = Ship;
  }
}

function Ship(name, type, ability) {
  this.name = name;
  this.type = type;
  this.ability = ability;
  this.crew = [];
  this.missionStatement = function() {

    if (this.crew.length <= 0) {
      return "Can't perform a mission yet.";
    }

    var correctJob = [];
    if (jobTypes.pilot === this.type) {
      correctJob.push('pilot');
    }
    else if (jobTypes.mechanic === this.type) {
      correctJob.push('mechanic');
    }
    else if (jobTypes.commander === this.type) {
      correctJob.push('commander');
    }
    else if (jobTypes.programmer === this.type) {
      correctJob.push('programmer');
    }
    for (var i = 0; i < this.crew.length; i++ ) {
       if (correctJob.indexOf(this.crew[i].job) > -1) {
         return this.ability;
       }
       else if (correctJob.indexOf(this.crew[i].job) === -1) {
         return "Can't perform a mission yet.";
       }
      }
     }
    }

var rick = new CrewMember ('Rick Martinez', 'pilot', 'chemistry');
var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');

rick.enterShip(mav);
mav.missionStatement();







//tests
if (typeof describe !== 'undefined'){
describe('CrewMember', function(){
  it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
    var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
    assert.equal(crewMember1.name, 'Rick Martinez');
    assert.equal(crewMember1.job, 'pilot');
    assert.equal(crewMember1.specialSkill, 'chemistry');
    assert.equal(crewMember1.ship, null);
  })

  it('can enter a ship', function(){
    var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
    var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
    crewMember1.enterShip(mav);
    assert.equal(crewMember1.ship, mav);
    assert.equal(mav.crew.length, 1);
    assert.equal(mav.crew[0], crewMember1);
  })
})

describe('Ship', function(){
  it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
    var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
    assert.equal(mav.name, 'Mars Ascent Vehicle');
    assert.equal(mav.type, 'MAV');
    assert.equal(mav.ability, 'Ascend into low orbit');
    assert.equal(mav.crew.length, 0);
  })

  it('can return a mission statement correctly', function(){
    var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
    var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
    var hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
    var crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
    assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
    assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

    crewMember1.enterShip(mav);
    assert.equal(mav.missionStatement(), "Ascend into low orbit");

    crewMember2.enterShip(hermes);
    assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
  })
})
}
