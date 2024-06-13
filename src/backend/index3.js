
// start:::Server Setup
const JWT = {
    secretKey: "c9a892edd8c92308e8476126a9c0e14de0c0089f0cb451912c96743f0f51f30c65a9a8b8656f68a7f29e8815fee263d307b7d7c9b6324b40cad7a7bf6243cd91",
    expiryTime: 2 * 24 * 60 * 60,
  };
  const COOKIE = {
    expiryTime: 2 * 24 * 60 * 60,
    authCookieName: "HallSeatManagementCookie",
    secret: "HallSeatManagementCookie",
  };
  const PORT = 5555;
  const express = require("express");
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const cookieParser = require("cookie-parser");
  const mongoose = require("mongoose");
  const Student = require("./model/StudentModel");
  const Application = require("./model/ApplicationModel");
  const Contact = require("./model/ContactModel");
  const Admin = require("./model/AdminLoginModel");
  const Seat = require("./model/SeatModel");
  
  const app = express();
  app.use(express.json());
  app.use(cookieParser(COOKIE.secret));
  
  // MongoDB connection
  mongoose
    .connect("mongodb://localhost:27017/hall_management_system")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

    
  
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
  
  // Middleware
  app.use(bodyParser.json());
  //app.use(authenticateToken);


  // Middleware to authenticate token
//   function authenticateToken(req, res, next) {
//     const authHeader = req.header('Authorization');
//     if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

//     // Extract the token from the Authorization header
//     const token = authHeader.split(' ')[1];
//     if (!token) return res.status(401).json({ msg: 'No token found in Authorization header' });

//     try {
//       const decoded = jwt.verify(token, JWT.secretKey);
//       req.user = decoded.user;
//       next();
//     } catch (err) {
//       res.status(401).json({ msg: 'Token is not valid' });
//     }
// }

  
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
  // end:::Server Setup
  
  // start:::Student Registration
  app.post("/register", async (req, res) => {
    const { firstname, lastname, regi_number, departmant_name, session, study_year, email, mobile, password } = req.body;
    console.log(firstname, lastname, regi_number, departmant_name, session, study_year, email, mobile, password);
  
    try {
      let user = await Student.findOne({ regi_number });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new Student({
        firstname,
        lastname,
        regi_number,
        departmant_name,
        session,
        study_year,
        email,
        mobile,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.status(201).send("User registered successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  // end:::Student Registration
  
  //  Student Login
  app.post("/login", async (req, res) => {
    const { regi_number, password } = req.body;
    console.log(regi_number, password);
  
    try {
      const user = await Student.findOne({ regi_number });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, JWT.secretKey, { expiresIn: JWT.expiryTime }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });



// Admin Login
app.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    try {
        const user = await Admin.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: "Invalid user" });
        }
        if (password !== user.password) {
            return res.status(400).json({ msg: "Invalid credentials" });
          }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, JWT.secretKey, { expiresIn: JWT.expiryTime }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

  
  // start:::Application Form
  app.post("/apply", async (req, res) => {
    const { regnumber, fname, lname, fatherName, motherName, currentYear, session, email, departmentName } = req.body;
    console.log(req.body);
  
    try {
      let application = await Application.findOne({ regnumber });
      if (application) {
        return res.status(400).json({ msg: "Application already exists" });
      }
      application = new Application({
        regnumber,
        fname,
        lname,
        fatherName,
        motherName,
        currentYear,
        session,
        email,
        departmentName,
      });
      await application.save();
      res.status(201).send("Application submitted successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  // end:::Application Form


 // Contact 
  app.post('/Contact', async (req, res) => {
        const { name, registrationNo, session, subject, message } = req.body;
        console.log(req.body);

        try {
            const newContact = new Contact({
                name,
                registrationNo,
                session,
                subject,
                message,
            });

            await newContact.save();
            res.status(201).json({ msg: 'Contact information submitted successfully' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server Error' });
        }
    });

    // Route to add a new seat
  router.post('/', async (req, res) => {
    const { seatNumber, roomNumber, floorNumber, buildingName, status } = req.body;

    try {
      const newSeat = new Seat({
        seatNumber,
        roomNumber,
        floorNumber,
        buildingName,
        status
      });
      const savedSeat = await newSeat.save();
      res.status(201).json(savedSeat);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add new seat' });
    }
  });


    // Fetch student data
    app.get('/student/profile/:reg',  async (req, res) => {
        try {
            const {reg} = req.params;
            console.log("profile", reg)
        const student = await Student.findOne({regi_number: reg}).select('-password');
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        res.status(200).json(student);
        } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });

    // Fetch all seats
    app.get('/seats', async (req, res) => {
        try {
            const seats = await Seat.find({});
            res.status(200).json(seats);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    });

    // create a new seat
    app.post('/seats', async (req, res) => {
      try {
          const body = req.body;
          const seats = await Seat.create(body);
          res.status(200).json(seats);
      } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error");
      }
    });


    // add student to seat
    app.post('/seats/allocate', async (req, res) => {
      try {
          const { seatId, reg, name } = req.body;
          const seat = await Seat.findById(seatId);

          if(seat.student.name) return res.status(400).json({"message": "Already have a student"})

          seat.student = {name, reg};

          seat.status = "Occupied";

          seat.save();

          res.status(200).json(seat);
      } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error");
      }
    });

    // remove student from seat
    app.delete('/seats/vacate', async (req, res) => {
      try {
          const { seatId } = req.body;
          const seat = await Seat.findById(seatId);

          seat.student = {};
          seat.status = "Available";

          seat.save();

          res.status(200).json(seat);
      } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error");
      }
    });
  
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });