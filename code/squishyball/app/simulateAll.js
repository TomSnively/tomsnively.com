
function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function singleSeriesSimulation(length, winsRequired) {
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

function seriesSimulation(seriesLength, numberOfSeries){
	var winsRequired;
	var winningPrize;
	var acmeWins = 0;
	var acmeWinPercent;
	var expectedWinAmount;

	console.log ('simulating best of ' + seriesLength);

	winsRequired = (seriesLength + 1) / 2;
	winningPrize = 1000000 - (winsRequired * 10000);

	for (var z = 0; z < numberOfSeries; z++) {
		// This returns 1 if Acme wins, and 0 if Acme loses
		var result = singleSeriesSimulation(seriesLength, winsRequired);
		acmeWins = acmeWins + result;
	}

	//console.log ('simulations over');
	acmeWinPercent = acmeWins * 100 / numberOfSeries;
	acmeWinPercent = Math.round(acmeWinPercent * 100) / 100;
	
	expectedWinAmount = Math.round(winningPrize * acmeWinPercent / 100);

	return {
		seriesLength: seriesLength.toString(), 
		winningPrize: '$' + winningPrize.toLocaleString(), 
		acmeWins: acmeWins.toLocaleString() + ', ' + acmeWinPercent.toString() + '%', 
		expectedWinAmount: expectedWinAmount
	};
}

// MAIN CODE IS HERE

var numberOfSeries;
numberOfSeries = Number(getURLParameter('numberOfSeries'));
document.getElementById("numberOfSeries").innerHTML = numberOfSeries.toLocaleString();	

var con1 = angular.module("con1", []);
var maxWinningPrize = 0;
var maxSeries;
con1.controller('newCtrl1', function($scope){
	$scope.series = [];
	for (var i = 1; i <= 99; i=i+2){
		var simulationResult = seriesSimulation(i, numberOfSeries);
		//console.log(simulationResult);
		
		//console.log(simulationResult.expectedWinAmount);
		if (simulationResult.expectedWinAmount > maxWinningPrize) {
			maxWinningPrize = simulationResult.expectedWinAmount;
			//console.log(maxWinningPrize);
			maxSeries = simulationResult.seriesLength;
		}
		
		var arrayPos = (i+1)/2;
		$scope.series[arrayPos] = {
			seriesLength: simulationResult.seriesLength,
			winningPrize: simulationResult.winningPrize,
			acmeWins: simulationResult.acmeWins,
			expectedWinAmount: '$' + simulationResult.expectedWinAmount.toLocaleString()
		}
	}

	document.getElementById("results").innerHTML = 'This time, the best series was ' + maxSeries + ' which had an expected win of $' + maxWinningPrize.toLocaleString();	
	
}); 

