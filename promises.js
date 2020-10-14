const returnsAPromise = function (string) {
  return new Promise((resolve, reject) => {
    if (typeof string === "string") {
      resolve(`${string} is a string`);
    } else {
      reject("not a string");
    }
  });
};

//ES5
returnsAPromise("test")
  .then((respons) => {
    console.log(respons);
  })
  .catch((err) => {
    console.log(err);
  });

returnsAPromise(200)
  .then((respons) => {
    console.log(respons);
  })
  .catch((err) => {
    console.log(err);
  });

//ES6

const checkPromise = async (str) => {
  try {
    const respons = await returnsAPromise(str);
    console.log(respons);
  } catch (err) {
    console.log(err);
  }
};

checkPromise("test");
checkPromise(1);
