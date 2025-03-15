const { error } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

// Using callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('Rondom dog image saved to file');
//       });
//     });
// });

// Using Promises
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((result) => {
//       console.log(result.body.message);

//       fs.writeFile('dog-img.txt', result.body.message, (err) => {
//         console.log('Rondom dog image saved to file');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// Building Promises
// Building a Promise for readFile
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 🥱😵😵‍💫');
      resolve(data);
    });
  });
};

// Building a Promise for writeFile
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write the file 🧨');

      resolve('success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random image is saved to file❤️');
  })
  .catch((err) => {
    console.log(err.message);
  });

// Using Async/Await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    // console.log(res.body.message);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image is saved to file 🐶');
  } catch (err) {
    console.log(err);

    throw err;
  }
  return '2: READY 🐕';
};

/*
console.log('1: Will get dog pics!');
// const x = getDogPic();
// console.log(x);
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('2: Done getting dog pics!');
  })
  .catch((err) => {
    console.log('ERROR 💥');
  });
  */

/*
console.log('1: Will get dog pics!');
// getDogPic();
getDogPic()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => {
    console.log(err);
    console.log('ERROR 🐞!!!');
  });
console.log('3: Done getting dog pics!');
*/

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {}
  {
  }
})();
