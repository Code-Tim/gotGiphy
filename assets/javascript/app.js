$(document).ready(function () {
    // array of search buttons
    var displayedButtons = ['Ultimate Warrior', 'Sting', 'Undertaker', 'Rocky Johnson', 'Fit Finlay'];
    // function to display giphys
    function displayImg() {

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10; // amount to show
        // api site and key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=pDzKx59152Z8Tf8Raok0o9IviciWW8TS";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            for (var i = 0; i < limit; i++) {

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);
                // display rating
                var rating = response.data[i].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }
    function renderButtons() {

        $("#display-buttons").empty();

        for (var i = 0; i < displayedButtons.length; i++) {

            var userButton = $("<button>")
            userButton.attr("class", "btn btn-default");
            userButton.attr("id", "input")
            userButton.attr("data-name", displayedButtons[i]);
            userButton.text(displayedButtons[i]);
            $("#display-buttons").append(userButton);
        }
    }
    // still and animate 
    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    // create buttons
    $("#submitPress").on("click", function () {

        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);

        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});