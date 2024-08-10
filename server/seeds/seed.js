
// const mongoose = require('mongoose');
// const Event = require('../models/Event');
// const eventData = require('./eventData.json');
// const connectDB = require('../config/connection');

// // Connect to the database
// connectDB();

// const seedDatabase = async () => {
//   try {
//     // Clear existing events
//     await Event.deleteMany({});

//     // Insert event data
//     await Event.insertMany(eventData);

//     console.log('Database seeded successfully!');
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     mongoose.connection.close();
//   }
// };

// seedDatabase();




const db = require('../config/connection');
const { Event} = require('../models');
const cleanDB = require('./cleanDB');

const eventData = require('./eventData.json');
// const classData = require('./classData.json');
// const professorData = require('./professorData.json');

db.once('open', async () => {
  // clean database
  await cleanDB("Event", "events");
  // await cleanDB("Class", "classes");
  // await cleanDB("Professor", "professors");

  // bulk create each model
  const events = await Event.insertMany(eventData);
  // const classes = await Class.insertMany(classData);
  // const professors = await Professor.insertMany(professorData);

  // for (newClass of classes) {
  //   // randomly add each class to a school
  //   const tempSchool = schools[Math.floor(Math.random() * schools.length)];
  //   tempSchool.classes.push(newClass._id);
  //   await tempSchool.save();

  //   // randomly add a professor to each class
  //   const tempProfessor = professors[Math.floor(Math.random() * professors.length)];
  //   newClass.professor = tempProfessor._id;
  //   await newClass.save();

  //   // reference class on professor model, too
  //   tempProfessor.classes.push(newClass._id);
  //   await tempProfessor.save();
  // }

  console.log('all done!');
  process.exit(0);
});


