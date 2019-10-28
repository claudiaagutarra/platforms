
var tvshows = ["Friends TV", "The Office", "Shameless", "New Girl", "How I Met Your Mother", "Casa De Papel", "Breaking Bad", "Lucifer", "American Horror Story", "Shameless"];
function displayShowInfo() {
    $("#gifs-appear-here").empty()

    var tvshow = $(this).attr("data-tvshow");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tvshow + "&api_key=6CXrmY4LMfTCMSUFAxc3ngPqjaUUzEYY&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var tvShowDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var tvImage = $("<img>");

                tvImage.addClass("gif");
                tvImage.attr("data-state", "still");
                tvImage.attr("src", results[i].images.fixed_height_still.url);
                tvImage.attr("data-still", results[i].images.fixed_height_still.url);
                tvImage.attr("data-animate", results[i].images.fixed_height.url);

                tvShowDiv.append(tvImage);
                tvShowDiv.append(p);
                

                $("#gifs-appear-here").prepend(tvShowDiv);

             

            }


        });
}

function renderButtons() {

    $("#buttondisplay").empty();

    for (var i = 0; i < tvshows.length; i++) {
        var a = $("<button>");
        a.addClass("tvshow-btn");
        a.attr("data-tvshow", tvshows[i]);
        a.text(tvshows[i]);
        $("#buttondisplay").append(a);
    }
}

$("#add-show").on("click", function (event) {
    event.preventDefault();
    var tvshow = $("#gif-input").val().trim();
    tvshows.push(tvshow);
    renderButtons();
});

$(document).on("click", ".tvshow-btn", displayShowInfo);

renderButtons();

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});


