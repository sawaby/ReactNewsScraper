

// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
// var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
// Bring in the Scrape function from our scripts directory
var scrape = require("./scripts/scrape.js");

// Bring article and notes from the controller
// var articleController = require("./controllers/article");

// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Instantiate our Express App
var app = express();

// Set up an Express Router
var router = express.Router();

// Require our routes file pass our router object
//require("./config/routes")(router);



app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
// Connect Handlebars to our Express app
// app.engine("handlebars", expressHandlebars({
//   defaultLayout: "main"
// }));
// app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({
  extended: false
}));

// Have every request go through our router middleware
app.use(router);


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost:27017/mongoHeadlines";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});
  // This route renders the homepage
 router.get("/", function(req, res) {
    res.render("home");
 });

  // This route renders the saved handledbars page
  router.get("/saved", function(req, res) {
       var query = {};
      console.log('get request data!!', req.query)
 // if (req.query.saved) {
    //   query = req.query;
    // }
    // res.render("/");
    res.status(200);
    res.send(req.query);

    //  articleController.get(query, function(data) {
    //   // Send the article data back as JSON
    //   res.json(data);
    // });
  });
 router.post("/saved", function(req, res) {
    res.render("saved");
 });

   router.delete("/saved", function(req, res) {
    res.render("saved");
  });
  // This route handles scraping more article to add to our db
  router.get("/api/fetch", function(req, res) {

    // This method inside the articleController will try and scrap new article
    // and save unique ones to our database
    articleController.fetch(function(err, docs) {
      // If we don't get any article back, likely because there are no new
      // unique article, send this message back to the user
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today. Check back tomorrow!"
        });
      }
      // Otherwise send back a count of how many new articles we got
      else {
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  // This route handles getting all articles from our database
  router.get("/api/article", function(req, res) {
    // If the client specifies a saved query parameter, ie "/api/article/?saved=true"
    // which is translated to just { saved: true } on req.query,
    // then set the query object equal to this
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }

    // Run the articleController get method and pass in whether we want saved, unsaved,
    // (or all article by default)
    articleController.get(query, function(data) {
      // Send the article data back as JSON
      res.json(data);
    });
  });

  // This route handles deleting a specified article
  router.delete("/api/article/:id", function(req, res) {
    var query = {};
    // Set the _id property of the query object to the id in req.params
    query._id = req.params.id;

    // Run the articleController delete method and pass in our query object containing
    // the id of the article we want to delete
    articleController.delete(query, function(err, data) {
      // Send the result back as JSON to be handled client side
      res.json(data);
    });
  });

//   // This route handles updating a article, in particular saving one
//   router.patch("/api/article", function(req, res) {
//     // Construct a query object to send to the articleController with the
//     // id of the article to be saved

//     // We're using req.body here instead of req.params to make this route easier to
//     // change if we ever want to update a article in any way except saving it

//     articleController.update(req.body, function(err, data) {
//       // After completion, send the result back to the user
//       res.json(data);
//     });
//   });

  // This route handles getting notes for a particular article id
  router.get("/api/notes/:article_id?", function(req, res) {
    // If we are supplied a article id in req.params, then we will add the id to our query object
    // Otherwise query will remain an empty object and thus return every note
    var query = {};
    if (req.params.article_id) {
      query._id = req.params.article_id;
    }

    // Get all notes that match our query using the notesController get method
    notesController.get(query, function(err, data) {

      // Send the note data back to the user as JSON
      res.json(data);
    });
  });

  // This route handles deleting a note of a particular note id
  router.delete("/api/notes/:id", function(req, res) {
    var query = {};
    query._id = req.params.id;

    // Use the check function from the article controller,
    // this checks all of our article, sorted by id number
    notesController.delete(query, function(err, data) {
      // Send the article data to a json
      res.json(data);
    });
  });

  // This route handles saving a new note
  router.post("/api/notes", function(req, res) {
    notesController.save(req.body, function(data) {
      // Send the note to the browser as a json
      res.json(data);
    });
  });
// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
