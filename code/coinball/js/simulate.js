
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function calculateRushOrPass(myStrategy, myScore, theirScore){
	var tempRushOrPass;
		if (myStrategy > 2) {
		if (myStrategy == 3){
			<!-- my strategy is 3, always rush when ahead or tied -->
			if (myScore >= theirScore) {
				tempRushOrPass = 1;
			} else {
				tempRushOrPass = 2;
			}
		} else {
			<!-- my strategy is 4, always pass when ahead or tied -->
			if (myScore >= theirScore) {
				tempRushOrPass = 2;
			} else {
				tempRushOrPass = 1;
			}
		}
		
	} else {
		<!-- my strategy is 1 or 2, so RushOrPass is 1 or 2 -->
		tempRushOrPass = myStrategy;
	}
	return(tempRushOrPass);
	
	
	
}

function doTurn(whosTurn, rushOrPass){
	//console.log ("it is " + whosTurn + "s turn, and rushOrPass is " + rushOrPass);
	
	var coinFlip = Math.random();
	
	//console.log ('random is ' + coinFlip);
	if (coinFlip > 0.5 ){
	// coinFlip > 0.5f is a win 
		//console.log ('we won the flip');
		if (whosTurn = 1) {
			player1Score = 	player1Score + rushOrPass;
		} else {
			player2Score = 	player1Score + rushOrPass;
		}
		
	} else {
	// otherwise it is a loss	
		//console.log ('we lost the flip');
		if (whosTurn = 1) {
			player2Score = 	player2Score + rushOrPass;
		} else {
			player1Score = 	player2Score + rushOrPass;
		}
	}
	//console.log ('turn is over. score is ' + player1Score + ' to ' + player2Score);
}

function gameSimulation(){

	player1Score = 0;
	player2Score = 0;

	for (var i=0; i<50; i++){
		//console.log(i);
		
		<!-- Player 1's turn -->
		var player1RushOrPass;

		player1RushOrPass = calculateRushOrPass (player1Strategy, player1Score, player2Score);
		doTurn(1, player1RushOrPass);
		
		<!-- Player 2's turn -->
		var player2RushOrPass;
		player2RushOrPass = calculateRushOrPass (player2Strategy, player2Score, player1Score);
		doTurn(2, player2RushOrPass);
	}
	
	if (player1Score > player2Score) {
		// Player 1 Wins!
		//	console.log ("Player 1 wins!");
		return(1);
	} else {
		if (player2Score > player1Score) {
			// Player 2 Wins!
			//console.log ("Player 2 wins!");
			return(0);
			
		} else {
			// It's a Draw! 1/2 to each
			//console.log ("It's a draw.");
			return(0.5);
		}
	}
}

// MAIN CODE IS HERE

var player1Score;
var player2Score;
var numberOfGames;
var player1Wins = 0;
var player2Wins = 0;

player1Strategy = Number(getURLParameter('player1Strategy'));
player2Strategy = Number(getURLParameter('player2Strategy'));
numberOfGames = Number(getURLParameter('numberOfGames'));

//console.log(player1Strategy);
document.getElementById("player1Strategy").innerHTML = player1Strategy.toString();	
//console.log(player2Strategy);
document.getElementById("player2Strategy").innerHTML = player2Strategy.toString();	
document.getElementById("numberOfGames").innerHTML = numberOfGames.toLocaleString();	

for (var z = 0; z < numberOfGames; z++) {
	// This returns Player 1's score, 0, 1/2 or 1.
	var result = gameSimulation();
	player1Wins = player1Wins + result;
	player2Wins = player2Wins + (1 - result);
}

console.log ('simulations over');
console.log ('Player 1 won ' + player1Wins.toString());
console.log ('Player 2 won ' + player2Wins.toString());
var player1Pct = player1Wins * 100 / (player1Wins + player2Wins);
player1Pct = Math.round(player1Pct * 100) / 100;
var player2Pct = player2Wins * 100 / (player1Wins + player2Wins);
player2Pct = Math.round(player2Pct * 100) / 100;
document.getElementById("player1Wins").innerHTML = player1Wins.toLocaleString() + '; ' + player1Pct.toString() + '%';	
document.getElementById("player2Wins").innerHTML = player2Wins.toLocaleString() + '; ' + player2Pct.toString() + '%';	
