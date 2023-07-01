const readline = require('readline')
const mysql = require('mysql2');
const { connect } = require('superagent');
const { rejects } = require('assert');

const getDistrictsFromDatabase = async() =>{
    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database: "district"

        });
        // query
        // SELECT d.districtName FROM districts d INNER JOIN provinces p ON p.provinceid = d.provinceid WHERE  p.provinceId =1
        connection.query(" SELECT * FROM districts",(error,results) => {
            if(error){
                reject(error)
            }else{
                const districts = results.map((result) => result.districtName);
                resolve(districts)
            }
            connection.end()
        })
        
    })
}


// const getDistricts = async() => {
 

//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         let districts = ["Gasabo","Nyarugenge","Kicukiro"];
//         resolve(districts)
//     },1000)

//   })
// }
 const checkDistrict = (district) => {
     return new Promise((resolve,reject) => {
        getDistrictsFromDatabase()
        .then((districts) => {
            if(districts.includes(district)){
                resolve(`oooh😉!! great! you did ,${district} district belongs to districts of rwanda`);
            }else{
                resolve(`${district} do not belongs to districts of rwanda!`);
            }
        })
        .catch((err) => {
            if(err) reject(err);
        })
     })
 }
//  const useEnteredDistrict = "Gasabo";
//  checkDistrict(useEnteredDistrict)
//  .then((result) =>{
//     console.log(result)
//  })
//  .catch((err) => {
//     console.error(err)
//  })

const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});
 rl.question("Enter the district:  ",(district) => {
    checkDistrict(district)
    .then((result) => {
        console.log(result)
        rl.close()
    })
    .catch((err) =>{
        console.error(err);
        rl.close()
    })
 })