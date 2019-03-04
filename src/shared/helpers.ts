export function objToArr(obj) {
  let arr = [];
  for (let key in obj) {
    let element = obj[key];
    element.$key = key;
    arr.push(element);
  }
  return arr;
}

export const factorySectors = [{
  sectorId: 'A1'
},{
  sectorId: 'A2'
},{
  sectorId: 'A3'
},{
  sectorId: 'B1'
},{
  sectorId: 'B2'
},{
  sectorId: 'B3'
},{
  sectorId: 'C1'
},{
  sectorId: 'C2'
},{
  sectorId: 'C3'
}];

export const Queue = () => {
  this.elements = [];
};

Queue.prototype.enqueue = function (e) {
  this.elements.push(e);
};

// remove an element from the front of the queue
Queue.prototype.dequeue = function () {
  return this.elements.shift();
};

// check if the queue is empty
Queue.prototype.isEmpty = function () {
  return this.elements.length == 0;
};

// get the element at the front of the queue
Queue.prototype.peek = function () {
  return !this.isEmpty() ? this.elements[0] : undefined;
};

// get the element at the front of the queue
Queue.prototype.all = function () {
  return this.elements;
};

export let Stack = function() {
  this.count = 0;
  this.storage = [];
};

// Adds a value onto the end of the stack
Stack.prototype.push = function(value) {
  this.storage[this.count] = value;
  this.count++;
};

// Removes and returns the value at the end of the stack
Stack.prototype.pop = function() {
  // Check to see if the stack is empty
  if (this.count === 0) {
    return undefined;
  }

  this.count--;
  var result = this.storage[this.count];
  delete this.storage[this.count];
  return result;
};

// Returns the length of the stack
Stack.prototype.size = function() {
  return this.count;
};

Stack.prototype.all = function() {
  return this.storage;
};
