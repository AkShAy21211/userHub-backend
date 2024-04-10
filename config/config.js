const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});
