
let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level" + " " + level);
        nextSequence();
        started = true;
    }
});


let buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + " " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]
    gamepattern = gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    console.log(randomChosenColour);
    console.log(randomNumber);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}



$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour.length - 1)


})


function playSound(name) {
    switch (name) {
        case "green":
            let greenSound = new Audio("sounds/green.mp3");
            greenSound.play()

            break;
        case "blue":
            let blueSound = new Audio("sounds/blue.mp3");
            blueSound.play()
            break;
        case "yellow":
            let yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;
        case "red":
            let redSound = new Audio("sounds/red.mp3");
            redSound.play()

        default: console.log(name)
            break;
    }
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log('wrong');
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
gamePattern = [];
started = false;
}