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
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 🥱😵😵‍💫');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write the file 🤯');
      resolve('success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`).then((result) => {
  console.log(`Breed: ${result}`);
  superagent
    .get(`https://dog.ceo/api/breed/${result}/images/random`)
    .then((result) => {
      console.log(result.body.message);

      fs.writeFile('dog-img.txt', result.body.message, (err) => {
        console.log('Rondom dog image saved to file');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
