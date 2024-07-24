const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
  myName: { type: String, required: true },
  mySID: { type: String, required: true }
});

// Create a Model object
const Student = mongoose.model('s24students', studentSchema);

const router = express.Router();
app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
 
  mongoose.connect('mongodb+srv://tempuser:123@cluster0.f9d6o.gcp.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your Express server once connected to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

  // get the data from the form
  const uri = req.body.myuri;
  try {
        // connect to the database and log the connection
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // add the data to the database
        const newStudent = new Student({
          myName: 'Alisha Alisha', 
          mySID: '300388443'   
        });
        await newStudent.save();
        console.log("Document added to the collection");

        // send a response to the user
        res.send(`<h1>Document Added</h1>`);
        } catch (error) {
          console.error(error);
          res.send(`<h1>Failed to add document</h1>`);
        } finally {
          mongoose.connection.close();
        }
      }
);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
