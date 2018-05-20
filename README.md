# lww-project
Last Write Wins (LWW) Element Set is a type of conflict free replicated Data type (CRDT)

https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#LWW-Element-Set_(Last-Write-Wins-Element-Set)

## Structure
The LWW Set is implemented in the as a Class named LWWSet.js and the corresponding test file named LWWSet.test.js

## Test Aspect
The tests are written to test the functions around the methods in the class LWWSet.


###Methods
The test methods are to test around the 3 method available from the LWWSet class.

1. `add(content)` - to add an element to the Add Set (A) of the LWW Set
    * Test __Add 1 element to Add Set__ verify if element is added 

2. `remove(content)` - to add an element to the Remove Set (R) of the LWW Set
    * Test __Add 1 element to Remove Set__ verify if element is added

3. `query(content)` - to check if the given content is in the LWW Set after union between the Add Set (A) and the Remove Set (R)
    * Test __Verify Element Exists - Found 1 Element, When only have Add Operation__ 
    * Test __Verify Element Exists - Found Nothing, When only have Remove Operation__
    * Test __Verify Element Exists - Found Nothing, When an Add Operation is followed by a Remove Operation of the same content__
    * Test __Verify Element Exists - Found 1, When Add Operation is having a later timestamp__
    * Test __Verify Element Exists - Found Nothing, When Add and Remove Operation happens at the same time__
    * Test __Verify Multiple Element Exists__
    * Test __When Element is Not in Set__
    




## To Run Test
This is a NodeJS  project. Running the test would requires to have NodeJS installed.

To run test type `npm test`, the following screen would show

```
> lww-element-set@1.0.0 test /Users/kenny/Dropbox (Personal)/Development/projects/lww-element-set
> jest --config ./jest.config.js --coverage

 PASS  ./LWWSet.test.js
  ✓ Add 1 element to Add Set (4ms)
  ✓ Add 1 element to Remove Set
  ✓ Verify Element Exists - Found 1 Element, When only have Add Operation (1ms)
  ✓ Verify Element Exists - Found Nothing, When an Add Operation is followed by a Remove Operation of the same content (1ms)
  ✓ Verify Element Exists - Found Nothing, When only have Remove Operation
  ✓ Verify Element Exists - Found 1, When Add Operation is having a later timestamp (1ms)
  ✓ Verify Element Exists - Found Nothing, When Add and Remove Operation happens at the same time
  ✓ Verify Multiple Element Exists (1ms)
  ✓ When Element is Not in Set

-----------|----------|----------|----------|----------|-------------------|
File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------|----------|----------|----------|----------|-------------------|
All files  |      100 |      100 |      100 |      100 |                   |
 LWWSet.js |      100 |      100 |      100 |      100 |                   |
-----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.119s
Ran all test suites.
```

##Attribution
The implementation makes use of [lodash](https://lodash.com/ "lodash") to perform set operations