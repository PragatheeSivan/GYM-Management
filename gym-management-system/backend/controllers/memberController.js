const initializeDb = require('./config/db');


exports.getMember = (request,response) => {
    initializeDb.all("SELECT * FROM members", (err, rows)=>{
        if(err){
            return response.status(500).json(err);
        }

        response.json(rows);
    })
    
}