const PORT = 5000;
var bodyParser = require('body-parser');

const express = require('express');
const app = express()
app.use(bodyParser.json())



// rooms

const rooms = [
    {
        name: "premium",
        seats: 100,
        amenities: "Wifi,AC,projection screen",
        roomId: "ABC",
        price: 2000,
        bookingDetails: [
            {
                customerName: 'Subash',
                date: new Date('2022-08-03'),
                checkIn: "07:00",
                checkOut: "12:00",
                bookingStatus: 'confirmed'
            }
        ]

    },
    {
        name: "Elite",
        seats: 170,
        amenities: "Wifi,AC,projection scree",
        roomId: "XYZ",
        price: 3500,
        bookingDetails: [
            {
                customerName: 'Raj',
                date: new Date('2022-08-04'),
                checkIn: "13:00",
                checkOut: "17:00",
                bookingStatus: 'payment pending'
            },
        ],

    },
];


app.get("/", (req, res) => {
    res.send({ statuscode: 200, message: "Server is running successfully" })
})

app.post('/create-room', (req, res) => {
    rooms.push({
        name: req.body.name,
        seats: req.body.seats,
        amenities: req.body.amenities,
        price: req.body.price,
        roomId: req.body.roomId,
        bookingDetails: [{}],
    });
    res.send({ statuscode: 200, message: "room created" })
})

app.post("/book-room", (req, res, next) => {
    for (let i = 0; i < rooms.length; i++) {
      console.log("a");
      if (!(rooms[i].roomId === req.body.roomId)) {
        return res.status(400).send({ error: "Invalid" });
      } else {
        let booking = {
          customerName: req.body.name,
          date: new Date(req.body.date),
          checkIn: req.body.start,
          checkOut: req.body.end,
          bookingStatus: "confirmed",
        };
        let result = undefined;
        rooms[i].bookingDetails.forEach((book) => {
          if (
            book.date.getTime() == booking.date.getTime() &&
            book.start === booking.start
            result = 0;
            console.log("in booking");
          } else {
            result = 1;
            rooms[i].bookingDetails.push(booking);
          }
        });
        if (result) return res.status(200).send("Booking confirmed");
        else
          return res
            .status(400)
            .send({ error: "Please select different time slot" });
      }
    }
  });
  

app.get("/list-customer", (req, res) => {
    let customers = [];
    rooms.forEach((room) => {
        let customer = { roomName: room.name };
        room.bookingDetails.forEach((cus) => {
                customer.customerName = cus.customerName,
                customer.date = cus.date,
                customer.checkIn = cus.checkIn,
                customer.checkOut = cus.checkOut,

                customers.push(customer)
        })
    })
    res.send(customers)
})

app.get('/rooms', (req, res) => {
    res.send({
        statuscode: 200,
        rooms
    })
})
app.listen(PORT, () => { console.log("Port is up and running in", PORT) })
