import mongoose, { mongo } from "mongoose";

mongoose.connect('mongodb://0.0.0.0:27017/MigalaBlog', {})
    .then(db => console.log({
        "Database": "MigalaBlog",
        "Status": "Online"
    }))
    .catch(err => console.log(err));
    
    