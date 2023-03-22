var gamePattern = [];
var level1 = 1;
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var inGame = false;

function nextSequence(){
    var number = Math.floor(Math.random() * 4);
    addColor(number);
    userClickedPattern = [];
    
}

nextSequence();

function addColor(number){
    if(inGame == true){
        var color = buttonColors[number];
        gamePattern.push(color);
        animation(color);
        $("#level-title").text("Level "+level1)
        level1++;
        return color;
    }

}


function animation(currentColor){
    $("#"+currentColor).fadeOut(200).fadeIn(200);
}


$(".btn").click(function(){
    userClickedPattern.push(this.id);
    var s = "sounds/" + this.id + ".mp3";
    var audio = new Audio(s);
    audio.play();
    animation(this.id);
    var index = userClickedPattern.length-1;
    checkAnswer(index);
    
})

$("body").keypress(function(){
    if(inGame == false){
        startOver();
    }
})

function startOver(){
    inGame = true;
    gamePattern = [];
    userClickedPattern = [];
    level1 = 1;
    nextSequence();
}

function checkAnswer(index){
    if(gamePattern[index] != userClickedPattern[index]){
        console.log("fail");
        var failAudio = new Audio("sounds/wrong.mp3");
        failAudio.play();
        inGame = false;
        $("body").addClass("game-over");
        setTimeout(() =>{
            $("body").removeClass("game-over");
        }, 500);
        
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(nextSequence(), 1000);
    }
    else{
        console.log("success");
        setTimeout(() => {
            if(index+1 == gamePattern.length){
                nextSequence();
            }
        }, 800);
    }
}





