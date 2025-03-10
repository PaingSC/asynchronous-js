const fs = require('fs');
const superagent = require('superagent');

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
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
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
