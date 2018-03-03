			// Initial array of characters
			var characters = ["Gandalf", "Frodo", "Gollum"];

			// Function for creating buttons for characters already in the variable
			function renderButtons() {

				// Deletes the character buttons prior to adding new character buttons
				$("#characters-view").empty();

				// Looping through the array of characters
				for (var i = 0; i < characters.length; i++) {

					// Then dynamically generating buttons for each character in the array.
					var button = $("<button>");
					// Adding a class
					button.addClass("characters");
					// Adding a data-attribute with a value of the character at index i
					button.attr("data-name", characters[i]);
					// Providing the button's text with a value of the character at index i
					button.text(characters[i]);
					// Adding the button to the characters-view div
					$("#characters-view").append(button);
				}
			}

			// Creating a new button for each character added via the submit button
			$("#add-newCharacter").on("click", function (event) {
				// event.preventDefault() prevents the form from trying to submit itself.
			
				event.preventDefault();

				// This line will grab the text from the input box
				var newCharacter = $("#newCharacter-input").val().trim();
				// The character from the textbox is then added to our array
				characters.push(newCharacter);
				console.log(characters)

				// renders buttons for all new characters added via submit button
				renderButtons();
			});

			// renders buttons for characters listed in variable
			renderButtons();

			// Bringing in data from GIPHY

				$(document).on("click", ".characters", function(){
					// Deletes the character buttons prior to adding new character buttons
				$("#gifLocation").empty();
					var c = $(this).data("name");
					console.log(c);

					var queryURL = "http://api.giphy.com/v1/gifs/search?q="+c+"&api_key=hU5ACVgA5Rzc6WQFgIyWUjkFgcACmzKi&limit=10";
					console.log(queryURL);

					$.ajax({url:queryURL,method: 'GET'})
					.done(function(response){
						console.log(response);
						for(var i=0;i<response.data.length;i++){
								var characterDiv = $('<div>');
								var r = $('<p>').text("Rating: "+response.data[i].rating);
								var characterImage = $('<img>');
								characterImage.addClass("gif");
								characterImage.attr('data-state',"still");
								characterImage.attr('src',response.data[i].images.fixed_height_still.url);
								characterImage.attr('data-animate',response.data[i].images.fixed_height.url);
								characterImage.attr('data-still',response.data[i].images.fixed_height_still.url);
								characterDiv.prepend(r);
								characterDiv.prepend(characterImage);
								$('#gifLocation').prepend(characterDiv);
								console.log(response.data[i]);
						}
					})
				})

// 	Turning animation on and off

$(document).on("click", ".gif", function() {
			// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
      }
    });