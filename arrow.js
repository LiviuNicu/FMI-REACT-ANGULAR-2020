// const doubleEXP = function (num) {
//   return num * 2;
// };

// const doubleEXP = (num) => {
//   return num * 2;
// };

// const doubleEXP = (num) => num * 2;

let obj = {
  id: 23,
  counter: function counter() {
    setTimeout(
      function () {
        console.log(this.id);
      }.bind(this),
      1000
    );
  },
};
obj.counter();

let obj2 = {
  id: 23,
  counter: function counter() {
    setTimeout(() => {
      console.log(this.id);
    }, 1000);
  },
};
obj2.counter();
