import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Question from './models/Question.js';
import User from './models/User.js';

dotenv.config();
connectDB();

const quizData = {
  AWT:[
    { question:"What does HTML stand for?", options:["Hyper Text Markup Language","High Text Machine Language","Hyper Tool Markup Language","None"], answer:"Hyper Text Markup Language" },
    { question:"Which language is used for styling web pages?", options:["HTML","CSS","Python","Java"], answer:"CSS" },
    { question:"Which tag is used to insert an image?", options:["<img>","<image>","<src>","<pic>"], answer:"<img>" },
    { question:"Which tag creates a hyperlink?", options:["<link>","<a>","<href>","<url>"], answer:"<a>" },
    { question:"HTML files use which extension?", options:[".html",".css",".js",".xml"], answer:".html" }
  ],
  AJT:[
    { question:"Java is developed by?", options:["Microsoft","Oracle","Google","IBM"], answer:"Oracle" },
    { question:"Which keyword is used to define a class in Java?", options:["class","define","object","struct"], answer:"class" },
    { question:"Which method is entry point of Java program?", options:["start()","main()","run()","init()"], answer:"main()" },
    { question:"Java is a ___ language?", options:["Compiled","Interpreted","Both","None"], answer:"Both" },
    { question:"Which symbol ends a Java statement?", options:[":",";","!","."], answer:";" }
  ],
  COA:[
    { question:"CPU stands for?", options:["Central Processing Unit","Computer Processing Unit","Central Power Unit","Control Processing Unit"], answer:"Central Processing Unit" },
    { question:"Which memory is fastest?", options:["RAM","ROM","Cache","Hard Disk"], answer:"Cache" },
    { question:"ALU stands for?", options:["Arithmetic Logic Unit","Array Logic Unit","Advanced Logic Unit","Automatic Logic Unit"], answer:"Arithmetic Logic Unit" },
    { question:"Which device stores data permanently?", options:["RAM","ROM","Cache","Register"], answer:"ROM" },
    { question:"Which is input device?", options:["Keyboard","Monitor","Printer","Speaker"], answer:"Keyboard" }
  ],
  OS:[
    { question:"Which is an Operating System?", options:["Windows","Chrome","HTML","Python"], answer:"Windows" },
    { question:"Linux is?", options:["OS","Browser","Language","Editor"], answer:"OS" },
    { question:"Which OS is developed by Microsoft?", options:["Linux","Windows","MacOS","Unix"], answer:"Windows" },
    { question:"Which of these is open source OS?", options:["Linux","Windows","IOS","DOS"], answer:"Linux" },
    { question:"OS manages?", options:["Hardware","Software","Both","None"], answer:"Both" }
  ],
  CN:[
    { question:"IP stands for?", options:["Internet Protocol","Internal Program","Input Process","Internet Process"], answer:"Internet Protocol" },
    { question:"Which device connects networks?", options:["Router","Monitor","Printer","Mouse"], answer:"Router" },
    { question:"HTTP stands for?", options:["Hyper Text Transfer Protocol","High Text Transfer Protocol","Hyper Transfer Tool Protocol","None"], answer:"Hyper Text Transfer Protocol" },
    { question:"Which topology uses central hub?", options:["Star","Bus","Ring","Mesh"], answer:"Star" },
    { question:"Which device forwards data packets?", options:["Router","Keyboard","Scanner","Speaker"], answer:"Router" }
  ]
};

const seedData = async () => {
  try {
    await Question.deleteMany(); // Clear existing questions
    await User.deleteMany(); // Clear existing users

    const testUser = new User({
      username: 'teststudent',
      lastname: 'doe',
      enrollmentNumber: '12345',
      password: 'password123'
    });

    await testUser.save();

    const adminUser = new User({
      username: 'admin',
      lastname: 'admin',
      enrollmentNumber: 'admin',
      password: 'admin',
      isAdmin: true
    });

    await adminUser.save();

    for (const [subject, questions] of Object.entries(quizData)) {
      for (const q of questions) {
        await Question.create({
          subject,
          question: q.question,
          options: q.options,
          answer: q.answer
        });
      }
    }

    console.log('Data Imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

seedData();
