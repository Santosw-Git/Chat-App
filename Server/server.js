import app from './app.js';
import "dotenv/config";
import connectDB from './db/index.js';

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
        
    });
})
