// global variables 
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

// function generating chosen category by user
var handleFormSubmit = function (event) {
    event.preventDefault();

    var userChoice = searchBar.val()

    if (userChoice) {
        generateQuestion(userChoice)
        landingPage.addClass("hidden")
        questionPage.removeClass("hidden")
        $(selectedCategory).text(userChoice)
    } else {
        return;
    }

};


// function that translates user selected category into category that api can read
function generateQuestion(userChoice) {
    const categoryName = categories.find(o => o.value === userChoice);

    if (categoryName) {
        fetchCategory(categoryName)
    }
   
    // saves chosen category to client storage
    localStorage.setItem('category', userChoice)
}

// funciton that fetches apis to generate a question, answer, and related gif based on chosen category
function fetchCategory(category) {

    var apiUrl = 'https://api.api-ninjas.com/v1/trivia?category=' + category.name
    var key = "D9pwikBVMORkil2A1lVj3A==sOYASMS2c1pikHtG"

    fetch(apiUrl, {
        contentType: 'application/json',
        headers: { 'X-Api-Key': key }
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data[0].question)
        generatedQuestion.append(data[0].question)
        answer.append(data[0].answer)

        var chosenAnswer = data[0].answer
        var giphyKey = '4Qm6ORBCtnxfvBKUgW4FuArQT20lhhbw'
        var giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${chosenAnswer}&limit=1`

        fetch(giphyAPI)
            .then(function (response) {
            return response.json()
        }).then(function (data) {
              $("#gif-container").append(`<img src="${data.data[0].images.original.url}" />`);
        })

    })

   

}

// event listeners
letsPlayBtn.on('click', handleFormSubmit);

revealAnswer.on("click", function () {
    answer.removeClass("hidden")
    revealAnswer.addClass("hidden")
    gifContainer.removeClass("hidden")
    navButtons.removeClass("hidden")
})

playAgainElm.on("click", function () {
    location.reload(true);
})
