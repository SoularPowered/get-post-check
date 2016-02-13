/********************************************************
Author:         Shawn Hillyer
Description:    CS290 Assignment "GET and Post Checker"
Date;           2/12/2016
Note:           I used the lectures and textbook as 
reference, I did not cite every similarity because there
are only so many ways to do these things :)
*********************************************************/

// Import express
var express = require('express');
var app = express();

// Set up handlebars
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        // This helper allows us to use sections in templates
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port and public folder for static content
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + 'public'));
// form processing:
// app.use(require('body-parser')()); // makes req.body available



/******************
* ROUTES:         *
*******************/

// Home page
app.get('/', function(req,res){
    res.render('home');
});


// Error Pages 404 (Not found) & 500 (Error)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

/******************
* Start Server    *
******************/

app.listen(app.get('port'), function(){
  console.log('Express started on http://52.26.146.27:' + 
              app.get('port') + 
              '; press Ctrl-C to terminate.' );
});
