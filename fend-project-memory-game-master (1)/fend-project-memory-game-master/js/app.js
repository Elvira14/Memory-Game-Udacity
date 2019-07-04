/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let moves = 0;
let moveCounter = document.querySelector('.moves');
let restart = document.querySelector('.restart');
let timer = document.getElementById("timer");
let starsList = document.querySelectorAll('.stars');
let starIcon = document.querySelectorAll('.starIcon');

//Creating a new deck and shuffling it
createDeck()

function createDeck() {

	const cardList = document.querySelectorAll('.card');
 	const cardArray = Array.from(cardList);
 	const randArray = shuffle(cardArray);
 
	for (i=0; i < cardList.length; i++) {  
		const oldCard = cardList[i];
		oldCard.remove(); 
	}

	const deckFragment = document.createDocumentFragment();
	for (i=0; i < randArray.length; i++) {
		const newCard = document.createElement('li');
		newCard.innerHTML = randArray[i].innerHTML; 
		newCard.className = randArray[i].className;
		deckFragment.appendChild(newCard);
	}
	const newDeckList = document.querySelector('.deck');
	newDeckList.appendChild(deckFragment);
}

let cardList =  document.querySelectorAll('.card');
let openCards = [];
let matchingCards = [];


//Activating the cards

function activateCards() {
	moves = 0;
    moveCounter.InnerText = moves;

	cardList.forEach(function (card) {
		card.addEventListener('click', function() {
			if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				openCards.push(card);
				card.classList.add('open', 'show');

				//if cards match
			
				if (openCards.length == 2) {

	            var firstCardType = openCards[0].innerHTML;
	            var secondCardType = openCards[1].innerHTML;

	            if (firstCardType === secondCardType) {
	                matchingCards.push(firstCardType);
	                matchingCards.push(secondCardType);
	                openCards[0].classList.add('open', 'show', 'match');
	                openCards[1].classList.add('open', 'show', 'match');
	                openCards = [];

					//if cards don't match
					} else {
					setTimeout(function() {
						openCards.forEach(function(card) {
							card.classList.remove('open', 'show');
						});
						openCards = [];
					}, 1000);
				}

				moves++;
				//if all cards match
				if(matchingCards.length === 16) {
                console.log('game Over!');
             	// stopTimer();
                gameOver();                                
            	}
            
            moveCounter.innerText = moves;

        	//removing the stars
			if (moves > 12) {
					starIcon[0].remove();
							
				}
				if (moves > 20) {
					starIcon[1].remove();
				}				
			}

 			}
			
		});
	});
}
activateCards()

//calculate the timer

var running = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

function startTimer() {
       if(running == 0) {
        running = 1;
        console.log('Timer is on.');
        increment();
    } else {
        running = 0;
    }
}

function increment() {
    if(running == 1) {
        setTimeout(function() {
           seconds++;
           if (seconds === 60) {
           	seconds = 0;
           	minutes++;
           	if (minutes === 60) {
           		minutes = 0;
           		hours++;
           	}
           }

            timer.innerHTML = hours + ":" + minutes + ":" + seconds;
            
            increment();
        }, 1000);
    }
}

startTimer()

//stop timer
function stopTimer() {
	// clearTimeout(timer);
	hours = 0;
	minutes = 0;
	seconds = 0;
	console.log('Time ended');
}

//Print results on the popUp screen
function results() {

	let time_results = document.querySelector('.timeResults');
        time_results.innerText = 'Time: ' + timer.innerHTML;

	let star_results = document.querySelector('.starResults');
	if (moves <= 12) {
		star_results.innerHTML = '<i class="fa fa-star starIcon"></i>' + '<i class="fa fa-star starIcon"></i>' +'<i class="fa fa-star starIcon"></i>';				
		}
	else if (moves > 12 && moves <=20) {
		star_results.innerHTML = '<i class="fa fa-star starIcon"></i>' + '<i class="fa fa-star starIcon"></i>';
		}
	else {
		star_results.innerHTML = '<i class="fa fa-star starIcon"></i>';
		};

	let moves_results = document.querySelector('.movesResults');
        moves_results.innerHTML = 'Moves: ' + moves;

        
			   
}

//pop Up screen appears at the end of the game
function gameOver() {
     document.querySelector('.popUpBack').style.display = 'flex';   
     
     results();
	document.querySelector('.newGame').addEventListener('click', function() {
    document.querySelector('.popUpBack').style.display = 'none';
    newGame();
	});
		document.querySelector('.noThanks').addEventListener('click', function() {
   document.querySelector('.popUpBack').style.display = 'none';
    });

   }  
 

 //restarting the game
function restartTheGame() {
restart.addEventListener('click', function() {
	location.reload();
	moves.innerHTML = 0;
	stopTimer();
	
	cardList.forEach(function (card) {
	if(card.classList.contains('open') && card.classList.contains('show') || card.classList.contains('match')) {
		card.classList.remove('open', 'show', 'match');
	}
	});
	createDeck();
	activateCards();
	
    console.log('Restarting the game!')
});
}
restartTheGame()

//to start the new Game
function newGame() {
	location.reload();
	stopTimer();
	moves = 0;
	cardList.forEach(function (card) {
	if(card.classList.contains('open') && card.classList.contains('show') || card.classList.contains('match')) {
		card.classList.remove('open', 'show', 'match');
	}
});

	createDeck();
	activateCards();
		
	console.log('New game!');

}