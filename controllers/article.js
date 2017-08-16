// Grab the articles as a json
function grapArticles() {
  $.getJSON("/articles", function (data) {
    // For each one

    //$(div).css({"backgroung-color": "DarkKhaki", "padding": "20px"});
    for (var i = 0; i < data.length; i++) {
      var div = $("<div>");
      var mod = $("<div>");
      mod.attr("id", "but");
      div.addClass("art");
      var button = $("<button>");
      $(button).text("Comment");
      $(button).addClass("com");
      $(button).attr("id", "comment");
       var rem = $("<button>");
       $(rem).text("Remove Article");
      $(rem).addClass("removeArticle");
      $(rem).attr("id", "remove");
      $(mod).append(rem);
      $(mod).append(button);

      // Display the apropos information on the page
      $(div).append("<p data-id='" + data[i]._id + "'><h4 style='color: white'>" + data[i].title + "</h4><br /><a target=_blank href=" + data[i].link + ">" + data[i].link + "</a></p>");
      $(div).append(mod);
      $("#articles").append(div);
    }
  });
}
grapArticles();

//add new article
$(document).on("click", "#addArt", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).done(function (data) {
    alert(data);
  });
});
$(document).on("click", ".com", function () {
  $("#myModal").append("<div class='modal fade' id=themod role=dialog><div class=modal-dialog><div class=modal-content><div class=modal-header><div id=titleModal></div><div class=modal-body></div><div class=modal-footer><button type=button id=addNotes date-dismiss=modal>Close</button></div></div></div></div>");
  $('#themod').modal('show');
  $("#titleModal").empty();
  $(".modal-body").empty();
  //var thisId = $("p").attr("data-id");
  var thisId = $(this).parent().parent().find("p").attr("data-id");
  console.log("this id", thisId);
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function (data) {
      console.log(data);
      // The title of the article
      // modal.....

      console.log(data.title)

      //modal ....
      $("#titleModal").append("<p id=mp>" + data.title + "</p>");
      // An input to enter a new title
      $("#titleModal").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#titleModal").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#titleModal").append("<button data-id='" + data._id + "' id='savenote'>Save Comment</button>");

      // If there's a note in the article
      if (data.note) {

        // Place the title of the note in the title input
        // $("#titleinput").val(data.note.title);
        // // Place the body of the note in the body textarea
        // $("#bodyinput").val(data.note.body);

        // Place the title of the note in the title input
        $(".modal-body").append("<h5>" + data.note.title + "</h5><p>" + data.note.body + "<button data-id='" + data.note._id + "'type=button class=commentRemove><span class=comment aria-hidden=true>&times;</span></button></p>");
        //  $(".modal-body").append("<button type=button class=commentRemove><span aria-hidden=true>&times;</span></button>");

        console.log(data.note);

      }
    });
});
$(document).on("click", "#addNotes", function () {
  $('#themod').modal('hide');
});

// When you click the savaComment button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function (data) {
      // Log the response
      console.log(data);

      // // Place the body of the note in the body textarea
      // $(".modal-body").append("<p>" + data.note.body + "</p>");
    }
    );

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  // get notes
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function (data) {

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $(".modal-body").append("<p>" + data.note.title + "</p><p class=no>" + data.note.body + "<button data-id='" + data.note._id + "' type=button class=commentRemove><span aria-hidden=true class=comment>&times;</span></button></p>");
        // $(".modal-body").append("<button type=button class=commentRemove><span aria-hidden=true>&times;</span></button>");

        // // Place the body of the note in the body textarea
        // $(".modal-body").append("<p>" + data.note.body + "</p>");
      }
    });
});
//remove article 
$(document).on("click", ".removeArticle", function () {
  var thisId = $(this).parent().parent().find("p").attr("data-id");
  console.log("this id should be removed: ", thisId)
  $.ajax({
    method: "GET",
    url: "/removeArticle/" +thisId
  }).done(function (data) {
    alert(data);
    location.reload(); 
  });
});

// remove comment
//remove article 
$(document).on("click", ".comment", function () {
  var thisId = $(this).parent().attr("data-id");
  console.log("this comment should be removed: ", thisId)
  $.ajax({
    method: "GET",
    url: "/commentRemove/" +thisId
  }).done(function (data) {
    alert(data);
     $('#themod').modal('hide');
  });
});