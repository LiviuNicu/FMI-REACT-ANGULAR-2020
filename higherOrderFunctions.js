let obj = [
  {
    name: "Oana",
    math: 7,
    info: 10,
  },
  {
    name: "Ionela",
    math: 8,
    info: 4,
  },
  {
    name: "Lucian",
    math: 3,
    info: 7,
  },
];

for (var i = 0; i < obj.length; i++) {
  obj[i].math += 1;
}

// .map
let newObj = obj.map((currentElement, index, initialArray) => {
  currentElement.math += 1;
  return currentElement;
});

// .filter
let newArray = [];
for (var i = 0; i < obj.length; i++) {
  if (obj[i].math <= 8) {
    newArray.push(obj[i]);
  }
}

const newArrayHiFn = obj.filter((currentElement, index, initialArray) => {
  return currentElement.math <= 8;
});
console.log(newArrayHiFn);

let notaMaiMicaCa8 = (currentElement) => currentElement.math <= 8;
console.log(obj.filter(notaMaiMicaCa8)[0].name);
//.find
console.log(obj.find(notaMaiMicaCa8).name);

//.reduce

let objReduce = [
  { name: "ION", age: 20 },
  { name: "MARIAN", age: 10 },
  { name: "MARIA", age: 15 },
];

const ageSum = objReduce.reduce(
  (accumulator, currentElement, index, initialArray) => {
    accumulator += currentElement.age;
    return accumulator;
  },
  0
);

console.log(ageSum);

// {ION:20,MARIAN:10,MARIA:15}

const newObjFromArray = objReduce.reduce(
  (accumulator, currentElement, index, initialArray) => {
    accumulator[currentElement.name] = currentElement.age;
    return accumulator;
  },
  {}
);

console.log(newObjFromArray);
