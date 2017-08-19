/**
 * Created by ParikanshAndAtikant on 19/08/2017.
 */
var express = require('express');
var app = express();

app.use(express.static('public_static'));

app.get('/work' , function (req,res) {
   res.send("Working !");
});

app.listen(4000,function () {
   console.log("Server running on 4000");
});