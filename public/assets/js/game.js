$( document ).ready(function() {
    //an outer function for scope purposes


    //global variables
    var x, i, k;
    var alreadyGuessed = [];
    var alphabet = ['A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var showMeThePuzzle = "";
    var puzzleUnderscores = [];
    var currentWordState = [];
    var puzzleLetters = [];
    var backup = [];
    var puzzleItem = "";
    var howLongIsPuzzleItem = 0;
    var gameOver = false;
    var livesRemaining = 8;
    var hangmanImage = "";
    var guessesUsed = 0;
   // var numberOfWins = 0;
    var correctLetterLocations = 0;

    var playHangman = function () {
        //test to see if function ran
        console.log("Game started!");
        showMeThePuzzle ="";
        //picking a puzzle for the user to guess

        var newPuzzle = function () {
            //trigger to start new game , call reset variables and declare some undefined vars
            //string for the puzzle
            //====================================================

            var currentWordState = [];
            var puzzleAnswers = ["BOX OF RAIN", "ROBERT HUNTER",
                "JOHN BARLOW", "PIGPEN", "TOUCH OF GREY",
                "MONEY FOR GASOLINE", "BOB DYLAN",
                "WHEN I PAINT MY MASTERPIECE", "ESTIMATED PROPHET",
                "EYES OF THE WORLD", "CHINA CAT SUNFLOWER",
                "VINCE WELNICK", "BRUCE HORNSBY", "DARK STAR",
                "AOXOMOXOA", "AMERICAN BEAUTY", "DONNA JEAN GODCHAUX",
                "RIPPLE", "COMES A TIME", "BLACK MUDDY RIVER",
                "BRENT MYDLAND", "NASSAU COLISEUM", "GREEK THEATRE", "COW PALACE",
                "GIANTS STADIUM", "SOLDIER FIELD", "HELL IN A BUCKET", "QUINN THE ESKIMO",
                "FARE THEE WELL", "VIOLA LEE BLUES", "SUGAR MAGNOLIA", "I NEED A MIRACLE",
                "COLD RAIN AND SNOW", "THE WHEEL", "EYES OF THE WORLD", "FIRE ON THE MOUNTAIN",
                "GOING DOWN THE ROAD FEELING BAD", "SHAKEDOWN STREET", "LOOSE LUCY", "CHINA DOLL",
                "SHIP OF FOOLS", "BRANFORD MARSALIS", "CAPITOL THEATRE", "TERRAPIN STATION",
                "SPACE", "WHARF RAT", "EASY ANSWERS", "ALL NEW MINGLEWOOD BLUES", "VICTIM OR THE CRIME",
                "CORRINA", "PRIDE OF CUCAMONGA", "NEW SPEEDWAY BOOGIE", "ONE MORE SATURDAY NIGHT",
                "I KNOW YOU RIDER", "SAMSON AND DELILAH", "BERTHA", "RFK STADIUM", "THE DAYS BETWEEN",
                "LIBERTY", "ME AND MY UNCLE", "GREATEST STORY EVER TOLD", "MICKEY HART", "FOOLISH HEART",
                "BILL KREUTZMANN", "STANDING ON THE MOON", "CRAZY FINGERS", "IT MUST HAVE BEEN THE ROSES",
                "TOM CONSTANTEN", "DESOLATION ROW", "ALABAMA GETAWAY", "MEXICALI BLUES", "BOX OF RAIN",
                "CATFISH JOHN", "STAGGER LEE", "SAINT STEPHEN", "ALL ALONG THE WATCHTOWER", "AROUND AND AROUND",
                "BALLAD OF A THIN MAN", "BEAT IT ON DOWN THE LINE", "BIG BOSS MAN", "BIG BOY PETE", "BIG RAILROAD BLUES",
                "BIG RIVER", "BROKEN ARROW", "DANCING IN THE STREET", "DAY TRIPPER",
                "DEAR PRUDENCE", "DEVIL WITH A BLUE DRESS ON", "EARLY MORNING RAIN", "EL PASO", "GLORIA",
                "GOOD MORNING LITTLE SCHOOL GIRL", "HARD TO HANDLE", "HEY BO DIDDLEY", "HEY JUDE",
                "I SECOND THAT EMOTION", "IKO IKO", "IN THE MIDNIGHT HOUR", "IT HURTS ME TOO",
                "IT TAKES A LOT TO LAUGH, IT TAKES A TRAIN TO CRY", "JUST LIKE TOM THUMB'S BLUES",
                "KANSAS CITY", "KEEP ON GROWING",
                "THE LAST TIME", "LITTLE RED ROOSTER",
                "LONG BLACK LIMOUSINE", "LUCY IN THE SKY WITH DIAMONDS",
                "MAMA TRIED", "ME AND BOBBY MCGEE",
                "ME AND MY UNCLE", "THE MONKEY AND THE ENGINEER",
                "MORNING DEW", "NEW MINGLEWOOD BLUES",
                "NOT FADE AWAY", "THE PROMISED LAND",
                "QUEEN JANE APPROXIMATELY", "THE RACE IS ON",
                "RAIN", "REVOLUTION",
                "THE SAME THING", "SHE BELONGS TO ME",
                "SING ME BACK HOME", "SMOKESTACK LIGHTNING", "SO WHAT", "STIR IT UP",
                "STUCK INSIDE OF MOBILE WITH THE MEMPHIS BLUES AGAIN", "TOMORROW IS FOREVER",
                "TOMORROW NEVER KNOWS", "TURN ON YOUR LOVE LIGHT",
                "VISIONS OF JOHANNA", "WAKE UP LITTLE SUSIE",
                "WALKING THE DOG", "WANG DANG DOODLE",
                "THE WEIGHT", "WEREWOLVES OF LONDON",
                "YOU DON'T LOVE ME", "YOU WIN AGAIN",
                "MYSTERY TRAIN", "CRYPTICAL ENVELOPMENT", "GENTLEMEN START YOUR ENGINES"
            ];

//random selection from possible answers

            var random = Math.floor(Math.random() * puzzleAnswers.length);
            puzzleItem = puzzleAnswers[random];
            howLongIsPuzzleItem = puzzleItem.length;

//path to the updated image file based on how many lives left
            hangmanImage = ("assets/images/0" +
            livesRemaining + "livesLeft.png");
            console.log(hangmanImage);

            // rewrite image tag based on updated image
            $('#hangman').attr("src", hangmanImage);

//stores the blanks for displaying new puzzle -- emptying for new puzzle

//current word is an exact copy for uncovering letters

//puzzleLetters is the solution without any blanks

//these arrays hold all the stuff to check guesses against and update the display
            for (i = 0; i < howLongIsPuzzleItem; i++) {

                x = puzzleItem.charAt(i);

                if (x === " " || x === "'" || x === "-" || x === ",") {
                    puzzleUnderscores.push(x + " &nbsp;");
                    currentWordState.push(x + " &nbsp;");
                    puzzleLetters.push(x + " &nbsp;");
                } //closes case for space or apostrophe dash or comma
                else {
                    puzzleUnderscores.push("___&nbsp;");
                    currentWordState.push("___&nbsp;" );
                    puzzleLetters.push(x);

                } //closes else
            } //closes underscore / index generation

            console.log(puzzleUnderscores.length);
            console.log(puzzleItem);
            console.log(puzzleUnderscores);
//console.log(currentWordState);
            console.log(puzzleLetters);


            showMeThePuzzle = '<p> ' + puzzleUnderscores.join('').toString() + ' </p>';
          $("#puzzleWithBlanks").html(showMeThePuzzle);
//for loop to run through array
//for(i=0; i < puzzleUnderscores.length; i++) {
//  currentWordState += puzzleUnderscores[i];
//}

//document.getElementById("puzzleWithBlanks").innerHTML =currentWordState;
        };
//call newPuzzle
        newPuzzle();
        var playerChoice = function () {
//takes user input from key press
            document.onkeyup = function (event) {

                var playerGuess = String.fromCharCode(event.keyCode).toUpperCase();

                correctLetterLocations = getAllIndexes(puzzleLetters, playerGuess);

//console.log(correctLetterLocations);
//make sure choice is a letter and not chosen before

                if (alphabet.indexOf(playerGuess) !== -1 && alreadyGuessed.indexOf(playerGuess) == -1 && gameOver !== true) {


                    if (puzzleLetters.indexOf(playerGuess) == -1) {
                        livesRemaining -= 1;
                        hangmanImage = ("assets/images/0" +
                        livesRemaining + "livesLeft.png");
                        console.log('That letter is not in the puzzle');
                        guessesUsed = guessesUsed + 1;
                        alreadyGuessed.push(playerGuess);
//close 1st condition
                    }


                    else {

                        console.log('That letter is in the puzzle');
                        //splice out underscores and splice in correctly identified letter

                        currentWordState = backup.slice();

                        for (i = 0; i < puzzleUnderscores.length; i++) {
                            //change array value in currentWordState to swap in guessed letter for underscore
                            //console.log(puzzleLetters[i]);
                            if (puzzleLetters[i] === playerGuess) {
                                k = puzzleLetters[i];
                                console.log(k);
                                currentWordState.push(k);
                            }

                            else {
                                currentWordState.push(puzzleUnderscores[i]);
                            }
                        }
                    }
                }
                // console.log(currentWordState);
                backup = currentWordState.slice();
                var showMeThePuzzle = currentWordState.join('');
                currentWordState = [];

                document.getElementById("puzzleWithBlanks").innerHTML = showMeThePuzzle;
                document.getElementById("usedletters").innerHTML = alreadyGuessed.toString();
                $("livesRemaining").text = livesRemaining;
                 $('#hangman').attr("src", hangmanImage);
                if (livesRemaining === 0) {
                    gameOver = true;
                    //TODO make this something nicer than an alert -- either a modal or an animation
                    alert("You didn't get the solution in time!");

                }
//close on.key up
            };
            function getAllIndexes(arr, val) {
                var indexes = [], i;
                for (i = 0; i < arr.length; i++)
                    if (arr[i] === val)
                        indexes.push(i);
                return indexes;
            }

//close getAllIndexes function
        };
        playerChoice();
    };


    playHangman();

    $(".btn").bind('click',function () {
        console.log('button clicked');
        playHangman();
    });

//close function event

});

