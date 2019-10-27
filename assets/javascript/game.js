
 $("button").on("click", function() {
     $("#gifs-appear-here").empty()
    var tvshow = $(this).attr("data-tvshow");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      tvshow + "&api_key=6CXrmY4LMfTCMSUFAxc3ngPqjaUUzEYY&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(queryURL);

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          var tvShowDiv = $("<div>");

          var p = $("<p>").text("Rating: " + results[i].rating);

          var tvImage = $("<img>");

          tvImage.addClass("gif");
          tvImage.attr("data-state","still");
          tvImage.attr("src",results[i].images.fixed_height_still.url);
          tvImage.attr("data-still", results[i].images.fixed_height_still.url);
          tvImage.attr("data-animate", results[i].images.fixed_height.url);

          tvShowDiv.append(p);
          tvShowDiv.append(tvImage);

          $("#gifs-appear-here").prepend(tvShowDiv);

          $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            }
            else if (state === "animate") {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        }



      });
  });