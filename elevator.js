const fs = require('fs');
const readline = require('readline');
const path = require('path')
const output = fs.createWriteStream(path.join(__dirname, `/logs/output.txt`))

// get number of elevators, total floors, elevator capactiy, and queue from text file and run the elevator funciton
const readInput =  (file, test) => {
  let data = [];
  const rl = readline.createInterface({
    input: fs.createReadStream(file),
  })
  rl.on('line', (line) => {
    data.push(line);
  })
  rl.on('close', () => {
    if(!test){
      console.log('Processing...');
      console.log('\n\n');
      console.time('Total runtime');
      return elevator(...data, test);
    }
  })
}

// make the queue input usable
const elevatorQueue = (queue) => {
  return queue.split(',');
}

// main function of the elevator
const elevator = (elevators, floors, capacity, queue, test) => {
  let time = 0;

  // log output and trips for trip log
  let log = `*** Simulation started with ${elevators} elevators, ${floors} total floors, and ${capacity} max people per elevator ***\n`;
  let trip = 1;

  const calls = typeof(queue) === 'string' ? elevatorQueue(queue) : queue;

  // split the elelavtors in two halves, so we don't have to stop at every floor
  let left = [...Array(Math.floor(elevators/2))].map(()=>Array());
  let right = [...Array(elevators - left.length)].map(()=>Array());
  calls.forEach((call) => {
    let i = 0;
    let floor = Number(call);
    let direction = floor <= Math.floor(floors/2) ? left : right;
    if (floor > floors) return;
    while (i < direction.length){
      if(!direction[i][0]){
        return direction[i].push(floor);
      }
      else if(Math.abs(direction[i][0] - floor <= 1) || direction[i][0] === floor){
        if(direction[i].length < capacity){
          return direction[i].push(floor); 
        }

        // if car is full run ride function
        else if(direction[i].length >= capacity){
          let rideTime = ride(direction[i], 2, 1);
          time += rideTime;
          let side = floor <= Math.floor(floors/2) ? 'left' : 'right';
          log = log.concat(`Trip ${trip}: car ${side === 'left' ? i+1 : (i + Math.floor(elevators/2)) + 1} hit floors ${direction[i]} in ${rideTime} seconds\n`);
          trip++;
          return direction[i] = [];
        }
      }
      else {
        i++;
      }
    }
  }) 

  // check for outlier cars (not filled by end of run) and then run them through the ride function
  let cars = [...left,...right]
  cars.forEach((car, index) => {
    if (car.length) {
      rideTime = ride(car, 2, 1);
      time += rideTime;
      log = log.concat(`Trip ${trip}: car ${index+1} hit floors ${car} in ${rideTime} seconds\n`);
      trip++;
    }
  })

  //write log file
  output.write(`${log}\n Total time to service all ${calls.length} customers was:\n ${totalTime(time, elevators)}`);
  if(!test) {
    console.log('DONE!\n');
    console.timeEnd('Total runtime');
    process.exit();
  }
  return time;
}

// individual ride function
const ride = (car, up, down) => {
  return (Math.max(...car) * up) + (Math.max(...car) * down);
}

// create prompt for input filepath
const prompt = (prompt, callback) => {
  process.stdin.resume();
  process.stdout.write(prompt);
  process.stdin.on('data', (data) => {
    callback(data.toString().trim());
  });
}

// Parse seconds into prettier time output
const totalTime = (time) => {
  const days = Math.floor(time / 3600 / 24);
  const hours = Math.floor(time / 3600 % 24);
  const minutes = Math.floor(time % 3600 / 60);
  const seconds = Math.floor(time % 3600 % 60);
  return ( 
    ` ${days ? days > 1 ? `${days} days` : `${days} day` : '' } 
      ${hours ? hours > 1 ? `${hours} hours` : `${hours} hour` : '' } 
      ${minutes ? minutes > 1 ? `${minutes} minutes` : `${minutes} minute` : '' } 
      ${seconds ? seconds > 1 ? `${seconds} seconds` : `${seconds} second` : '' }` 
  );
}

const main = (test) => {
  if(test) {
    readInput(test, true);
  }
  else {
    prompt('Please enter input filepath: ', (input) => {
      readInput(input);
    });
  }
  return "Test complete!"
}

main();

module.exports = {
  main,
  ride,
  elevator
}

