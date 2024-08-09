// config/connection.js
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kiddohood-db',
    // {
    //     useFindAndModify: false,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }
    );

module.exports = mongoose.connection;


// config/connection.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected...');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
