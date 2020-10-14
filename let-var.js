function discountFn(prices, discount) {
  var discount = [];

  for (var i = 0; i < prices.length; i++) {
    var finalPrice = prices[i] - discount;
    discount.push(finalPrice);
  }

  console.log(i);
  console.log(finalPrice);
  console.log(discount);

  return discount;
}
discountFn([20, 30], 2);

function discountFn2(prices, disc) {
  let discount = [];

  for (let i = 0; i < prices.length; i++) {
    let finalPrice = prices[i] - disc;
    discount.push(finalPrice);
  }

  console.log(i);
  console.log(finalPrice);
  console.log(discount);

  return discount;
}
discountFn2([20, 30], 2);

("use strict");

function myFunction() {
  carName = "Volvo";
  console.log(carName);
}
myFunction();
console.log(carName);
