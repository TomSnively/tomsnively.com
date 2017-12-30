
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function seriesSimulation(length, winsRequired) {
    var ourWins = 0;
	var theirWins = 0;
	for (var x=0; x < length; x++) {
		var rand = Math.random();
		if (rand < 0.6){
			ourWins++;
		} else {
			theirWins++;
		}

		if (ourWins == winsRequired) {return 1;}
		if (theirWins == winsRequired) {return 0;}
	}	// end for. The return should break us out
}	

// MAIN CODE IS HERE

var seriesLength;
var winsRequired;
var winningPrize;
var numberOfSeries;
var acmeWins = 0;
var acmeWinPercent;
var expectedWinAmount;

seriesLength = Number(getURLParameter('seriesLength'));
winsRequired = (seriesLength + 1) / 2;
winningPrize = 1000000 - (winsRequired * 10000);

document.getElementById("seriesLength").innerHTML = seriesLength.toString();	

//console.log(winningPrize);
document.getElementById("winningPrize").innerHTML = '$' + winningPrize.toLocaleString();	

numberOfSeries = Number(getURLParameter('numberOfSeries'));
document.getElementById("numberOfSeries").innerHTML = numberOfSeries.toLocaleString();	


for (var z = 0; z < numberOfSeries; z++) {
	// This returns Player 1's score, 0, 1/2 or 1.
	var result = seriesSimulation(seriesLength, winsRequired);
	acmeWins = acmeWins + result;
}

console.log ('simulations over');
console.log ('Acme won ' + acmeWins.toString());
acmeWinPercent = acmeWins * 100 / numberOfSeries;

document.getElementById("acmeWins").innerHTML = acmeWins.toLocaleString();	
document.getElementById("acmeWinPercent").innerHTML = acmeWinPercent.toString() + '%';	

expectedWinAmount = winningPrize * acmeWinPercent / 100;
document.getElementById("expectedWinAmount").innerHTML = '$' + expectedWinAmount.toLocaleString();
