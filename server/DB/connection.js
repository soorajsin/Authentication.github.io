const mongoose=require("mongoose");



const db="database_url";


mongoose.connect(db, {
          useUnifiedTopology:true,
          useNewUrlParser : true ,
}).then(()=>console.log("Database Conneted...")).catch((error)=>{
          console.log('Error in Database Connection', error);
})
