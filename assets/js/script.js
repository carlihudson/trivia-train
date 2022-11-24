var letsPlayBtn = document.getElementById("lets-play")
var landingPage = document.getElementById("landing")
var questionPage = document.getElementById("question")
// slide 1 notes -- 
    // query selector for "Pick a Category" textbox (Carli 1)
        $( function() {
            var categories = [
                "Art & Literature",
                "Language",
                "Science & Nature",
                "General",
                "Food & Drink",
                "People & Places",
                "Geography",
                "History & Holidays",
                "Entertainment",
                "Toys & Games",
                "Music",
                "Math",
                "Religion & Mythology",
                "Sports & Leisure"

            ];
            $( "#search-bar" ).autocomplete({
                source: categories
        });
    });
    letsPlayBtn.addEventListener("click", function(){
landingPage.classList.add("hidden")
questionPage.classList.remove("hidden")
    })

// slide 2 notes -- (Josh 1)
    // fetch random facts API 
    // create array for generated question
        // query selector for generated questions
    // query selector for "Reveal Answer Button"
        // event listener for "Reveal Answer Button"

// slide 3 notes --
    // fetch GIPHY API (Ameera 1)
        // query selector for answer related GIPHY??? (Ameera 1)
    // create array for generated answer (Eduardo 1)
        // query selector for generated answer (Eduardo 1)
    // query selector for "Play Again (Same Category)" button (Mab 1)
        // event listener for "Play Again (Same Category)" button (Mab 1)
    // query selector for "Play Again (New Category)" button (Mab 1)
        // event listener for "Play Again (New Category)" button (Mab 1)
    
    

