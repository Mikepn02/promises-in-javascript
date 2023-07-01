const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

mongoose.connect('mongodb://127.0.0.1:27017/Country',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("connected to MongoDB")
})
.catch((err)=>{
    console.log("failed to connect to the database!!",err.message);
})

const districts = JSON.parse(fs.readFileSync('district.json','utf-8'));
const importData = async () => {
    try{
        const db = mongoose.connection;
        await db.collection('districts').insertMany(districts)
        console.log("Data inserted successfully");
        process.exit()
    }catch(err){
        console.log(err)
    }

}
if(process.argv[2] === '--import'){
    importData();
}