// import dependencies, better to use ES6 syntax for run/server time
var express = require("express")
var path = require("path")

// create an express server, an app instance of express
var app = express()

// define port where server will listen, on localhost
var PORT = process.env.PORT || 8080

// add middleware. Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

// application data, collecting/stubbing data and transmit to server
var tablesData = [{
    customerName: "Dori",
    customerEmail: "dori@demo.com",
    customerID: "1234",
    phoneNumber: "123-345-5678"
}];

var waitListData = [{
    customerName: "Jeff",
    customerEmail: "jeff@demo.com",
    customerID: "2345",
    phoneNumber: "123-345-8765"
}];

// staging routes, and pick http methods (action verb)
// html routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/home.html"))
});
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/reserve.html"))
});
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/tables.html"))
});

// api routes
app.get("/api/waitlist", function (req, res) {
    res.json(waitListData)
})

app.get("/api/tables", function (req, res) {
    res.json(tablesData)
})

app.post("/api/tables", function (req, res) {
    console.log(req.body)
    if (tablesData.length < 5) {
        tablesData.push(req.body)
        res.json(true)
    } else {
        waitListListData.push(res.body)
        res.json(false)
    }
})

app.post("/api/clear", function (req, res) {
    tablesData.length = 0;
    waitListData.length = 0
    res.json({
        ok: true
    })
})

// add server listener
app.listen(PORT, function () {
    console.log("server is listening on http://localhost:" + PORT)
})