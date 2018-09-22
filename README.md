# Elevator Logging System Test 
## Written by Jacob Rico
#### All test files that I used are in the input directory. Please use these for testing.  If you want to create your own testing input, please make sure that the files are formatted with the number of elevators, total floors in the building, capacity of elevators, and list of elevator calls are all on separate lines in the file

Before testing, make sure that the most recent Node.js version is installed. After you are sure that you are up to date, it's time to get started!

### Run `npm i` to get the test suite (Mocha and Chai).
### Run `npm start` to start the the application.  You will be prompted to enter the file path for the input data. This data is provided in the input dir. It will output the test outcome in the logs dir.
### To run the test suite, just run `npm test`
 
In making this simulation, there were a few calls to be made:
	1. If a floor was called in the input file, but it exceeds the boundary of the variable representing the total floors in the building, it was thrown out as an outlier. 
	2. I also decided that splitting the elevators so that one half would only go up to to half the floors and the other half would service the remaining floors made things more efficient. I did some testing and it seemed like as the number of floors in the building grew, I saw a greater benefit of this split.
	3. I ended up going with a queue for the main data structure used. It may not have lead to the most efficiency as far as servicing customers in the fastest time possible, but since the instructions stated that they were given numbers and called in order of those numbers I felt as if a queue was the most appropriate to use.
	4. Although the test specs are a little sparse, I feel like most of the testing was done by adding new input files and making sure that the output was stable on each run of the file. As well as adding validation throughout the app itself.

Please feel free to reach out to jacobedwardrico@gmail.com if there are any questions, or if you find any bugs/opportunities to make this better, I am always open for feedback