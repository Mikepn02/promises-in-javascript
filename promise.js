const fs = require('fs');
const superagent = require('superagent')
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(new Error("I could not find that file❌"))
      resolve(data);
    })
  })
}
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject(new Error("Failed to open the file!!!"));
      resolve("success")
    })
  })
}
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    console.log(res.body.message);
    await writeFilePro('dog-img.txt', res.body.message);
    console.log("Random dog saved to file!!");
  } catch (err) {
    console.log(err);
    throw err;
  }

  return "2: ready:😉"

}
(async() =>{
try{
   console.log("Hello");
   const x = await getDogPic();
   console.log(x);
   console.log("Hii")
}catch(err){
  console.log("Error 💥")
}
})();
// console.log("Hello")
// getDogPic()
//   .then(x => {
//     console.log(x)
//     console.log("3:what do you like")
//   }).catch(err => {
//     console.log("Error 🎆")
//   })

// readFilePro(`${__dirname}/dog.txt`)
// .then(data => {
//   console.log(`Breed: ${data}`);
//   return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// })
//   .then(res => {
//     console.log(res.body.message)
//     return writeFilePro('dog-img.txt',res.body.message)
//   })
//   .then(()=>{
//     console.log("Random dog saved to file!!");
//   })
//   .catch(err => {
//     console.log(err.message);
//   })
