/* Test suite for elevator.js's elevator simulator */
const expect = require('chai').expect;
const { elevator, ride, main } = require('./elevator');

describe('Reads input', () => {

  it('Should accept an input file', () => {
    const test = main('input/test.txt')
    expect(test).to.eql("Test complete!")
  })

})

describe('Elevators', () => {

  it('Should record a ride\'s time correctly', ()=>{
    const upTime = 2;
    const downTime = 1;
    const car = [3,2,3,4];

    const testRun = ride(car, upTime, downTime)
    expect(testRun).to.eql(12)
  })

  it('Time to complete should be correct', ()=>{
    const elevators = 2;
    const floors = 2;
    const capacity = 2;
    const queue = [1,2,2,1];

    const test = elevator(elevators, floors, capacity, queue, true)
    expect(test).to.eql(9)
  })

})
