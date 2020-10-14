function add() {
  var couter = 0;
  couter += 1;
  return couter;
}

add();
add();
add();

var counter = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();

console.log(counter.value());
counter.increment();
counter.increment();
counter.increment();
console.log(counter.value());
counter.decrement();
console.log(counter.value());

let student = function (nota, nume) {
  var notaStudent = nota;
  var numeStudent = nume;
  var afiseazaNota = function () {
    console.log(numeStudent + " are nota " + notaStudent);
  };
  var scadeNota = function (nr) {
    notaStudent -= nr;
    return this;
  };
  var cresteNota = function (nr) {
    notaStudent += nr;
    return this;
  };
  var notaStudent = nota;
  var numeStudent = nume;
  return {
    scadeNota,
    cresteNota,
    afiseazaNota,
  };
};

var student1 = new student(10, "Ionel");
var student2 = new student(7, "Anca");

student1.scadeNota(2).cresteNota(1).afiseazaNota();
student1.scadeNota(1).cresteNota(3).afiseazaNota();
