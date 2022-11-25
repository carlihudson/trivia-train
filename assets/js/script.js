var searchForm = $("#search-form");
var searchBar = $("#search-bar");
var letsPlayBtn = $("#lets-play");
var landingPage = $("#landing");
var questionPage = $("#question");
var selectedCategory = $("#selected-category");
var generatedQuestion = $("#generated-question");
var revealAnswer = $("#reveal-answer");
var answer = $("#answer");
var gifContainer = $("#gif-container");
var navButtons = $("#nav-buttons");

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
    "Sports & Leisure",
  ];
  $("#search-bar").autocomplete({
    source: categories,
  });
});

var userChoice = searchBar.val();
console.log(userChoice);

var apiCategories = [
  "artliterature",
  "language",
  "sciencenature",
  "general",
  "fooddrink",
  "peopleplaces",
  "geography",
  "historyholidays",
  "entertainment",
  "toysgames",
  "music",
  "mathematics",
  "religionmythology",
  "sportsleisure",
];

var humanCategoryToApiCategoryMap = {
  "Art & Literature": "artliterature",
  Language: "language",
  "Science & Nature": "sciencenature",
  General: "general",
  "Food & Drink": "fooddrink",
  "People & Places": "peopleplaces",
  Geography: "geography",
  "History & Holidays": "historyholidays",
  Entertainment: "entertainment",
  "Toys & Games": "toysgames",
  Music: "music",
  Math: "mathematics",
  "Religion & Mythology": "religionmythology",
  "Sports & Leisure": "sportsleisure",
};

// If you need all the keys (e.g. the human readable names)
// Then you can do this `var categories = Object.keys(humanCategoryToApiCategoryMap)`

// If you need all the values (e.g. the api names)
// Then you can do this `var categories = Object.values(humanCategoryToApiCategoryMap)`

// var userChoice = "";

//searchForm.on('click', generateQuestion)

var userChoseCategory = function (event) {
  event.preventDefault();

  var userChoice = searchBar.val();
  console.log(userChoice);

  if (!userChoice) {
    // add the little red text saying you much
    console.log("You must select from the given categories");
    $("#search-bar").focus();
    return;
  }

  landingPage.addClass("hidden");
  questionPage.removeClass("hidden");
  selectedCategory.text(userChoice);
  fetchCategory(userChoice);
};

letsPlayBtn.on("click", userChoseCategory);

var generateAnswer = "";

function fetchCategory(apiCategories) {
  var apiUrl =
    "https://api.api-ninjas.com/v1/trivia?category=" +
    humanCategoryToApiCategoryMap[apiCategories];
  var key = "D9pwikBVMORkil2A1lVj3A==sOYASMS2c1pikHtG";

  fetch(apiUrl, {
    contentType: "application/json",
    headers: { "X-Api-Key": key },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // generate question to user
      generatedQuestion.text(data[0].question);
      console.log(data[0].answer);
      generateAnswer = data[0].answer;
    });
}

revealAnswer.on("click", function () {
  answer.removeClass("hidden");
  revealAnswer.addClass("hidden");
  gifContainer.removeClass("hidden");
  navButtons.removeClass("hidden");
  answer.text(generateAnswer);
});

$("#chooseNewCategoryBtn").on("click", function () {
  selectedCategory.text("").focus();

  landingPage.removeClass("hidden");
  answer.addClass("hidden");
  revealAnswer.addClass("hidden");
  gifContainer.addClass("hidden");
  navButtons.addClass("hidden");
});

// slide 2 notes -- (Josh 1)
// fetch random facts API
// create array for generated question
// query selector for generated questions

// slide 3 notes --
// fetch GIPHY API (Ameera 1)
// query selector for answer related GIPHY??? (Ameera 1)
// create array for generated answer (Eduardo 1)
// query selector for generated answer (Eduardo 1)
// query selector for "Play Again (Same Category)" button (Mab 1)
// event listener for "Play Again (Same Category)" button (Mab 1)
// query selector for "Play Again (New Category)" button (Mab 1)
// event listener for "Play Again (New Category)" button (Mab 1)
