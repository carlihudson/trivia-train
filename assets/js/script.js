var searchForm = $('#search-form')
var searchBar = $('#search-bar')
var letsPlayBtn = $("#lets-play")
var landingPage = $("#landing")
var questionPage = $("#question")
var selectedCategory = $('#selected-category')
var generatedQuestion = $('#generated-question')
var revealAnswer = $("#reveal-answer")
var answer = $("#answer")
var gifContainer = $("#gif-container")
var navButtons = $("#nav-buttons")
var playAgainElm = $('#play-again')
var newCategoryElm = $('#new-category')

  // autocomplete function
$(function () {
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
    $("#search-bar").autocomplete({
        source: categories
    });
});


// object with category name api reads and value user sees
var categories = [
    { name: "artliterature", value: 'Art & Literature' },
    { name: 'language', value: 'Language' },
    { name: 'sciencenature', value: 'Science & Nature' },
    { name: 'general', value: 'General' },
    { name: 'fooddrink', value: 'Food & Drink' },
    { name: 'peopleplaces', value: 'People & Places' },
    { name: 'geography', value: 'Geography' },
    { name: 'historyholidays', value: 'History & Holidays' },
    { name: 'entertainment', value: 'Entertainment' },
    { name: 'toysgames', value: 'Toys & Games' },
    { name: 'music', value: 'Music' },
    { name: 'mathematics', value: 'Math' },
    { name: 'religionmythology', value: 'Religion & Mythology' },
    { name: 'sportsleisure', value: 'Sports & Leisure' },

]


var handleFormSubmit = function (event) {
    event.preventDefault();

    var userChoice = searchBar.val()

    if (userChoice) {
        generateQuestion(userChoice)
        landingPage.addClass("hidden")
        questionPage.removeClass("hidden")
        $(selectedCategory).text(userChoice)
    } else {
        // add the little red text saying you must select a category
        console.log('You must select from the given categories');
        return;
    }

};


function generateQuestion(userChoice) {
    const categoryName = categories.find(o => o.value === userChoice);

    if (categoryName) {
        fetchCategory(categoryName)
    }
   
    localStorage.setItem('category', userChoice)
}

function fetchCategory(category) {

    console.log(category)
    var apiUrl = 'https://api.api-ninjas.com/v1/trivia?category=' + category.name
    var key = "D9pwikBVMORkil2A1lVj3A==sOYASMS2c1pikHtG"

    fetch(apiUrl, {
        contentType: 'application/json',
        headers: { 'X-Api-Key': key }
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log("data", data[0].question)
        generatedQuestion.append(data[0].question)
        answer.append(data[0].answer)

    })

}

letsPlayBtn.on('click', handleFormSubmit);

revealAnswer.on("click", function () {
    answer.removeClass("hidden")
    revealAnswer.addClass("hidden")
    gifContainer.removeClass("hidden")
    navButtons.removeClass("hidden")
})

playAgainElm.on("click", function () {
    fetchCategory
    // need to figure out how to make it load a new question

    answer.addClass("hidden")
    revealAnswer.removeClass("hidden")
    gifContainer.addClass("hidden")
    navButtons.addClass("hidden")
})

newCategoryElm.on("click", function () {
    location.reload(true);
})



// slide 3 notes --
    // fetch GIPHY API (Ameera 1)
























