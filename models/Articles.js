

// Article model
// ============== 
// Require mongoose
var mongoose = require("mongoose");
// Create a schema class using mongoose's schema method 
var Schema = mongoose.Schema;
// Create the ArticleSchema with our schema class 
var articleSchema = new Schema({
    // Article, a string, must be entered   
    title: {
         type: String,
        required: true, 
        unique: true 
    },

    // date is just a string   
    date: String,
    saved: { 
        type: Boolean,
        default: false 
    },
    url: {
        type: String,
        required: true
    }
});
// Create the Articles model using the ArticleSchema 
var Articles = mongoose.model("Articles", articleSchema);
// Export the Articles model
module.exports = Articles;

