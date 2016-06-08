'use strict';

angular.module('bitcoinPriceApp')
  .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

  	$scope.currentUrl = 'btcAverage';
  	$scope.prices = {
		blockchain: {url: 'http://blockchain.info/ticker', gbp: null, usd: null, eur: null},
		coindesk: 	{url: 'http://api.coindesk.com/v1/bpi/currentprice.json', gbp: null, usd: null, eur: null},
		coinbase: 	{url: 'https://api.coinbase.com/v2/prices/buy', gbp: null, usd: null, eur: null},
		btcAverage: {url: 'https://api.bitcoinaverage.com/ticker/global', gbp: null, usd: null, eur: null}
	};

	$http.get($scope.prices.btcAverage.url + '/GBP').then(function(response){
		$scope.prices.btcAverage.gbp = response.data.ask;
	});
	$http.get($scope.prices.btcAverage.url + '/USD').then(function(response){
		$scope.prices.btcAverage.usd = response.data.ask;
	});
	$http.get($scope.prices.btcAverage.url + '/EUR').then(function(response){
		$scope.prices.btcAverage.eur = response.data.ask;
	});

	$http.get($scope.prices.blockchain.url).then(function(response){
		$scope.prices.blockchain.gbp = response.data.GBP.buy;
		$scope.prices.blockchain.usd = response.data.USD.buy;
		$scope.prices.blockchain.eur = response.data.EUR.buy;
	});

	$http.get($scope.prices.coindesk.url).then(function(response){
		$scope.prices.coindesk.gbp = response.data.bpi.GBP.rate_float;
		$scope.prices.coindesk.usd = response.data.bpi.USD.rate_float;
		$scope.prices.coindesk.eur = response.data.bpi.EUR.rate_float;
	});

	$http.get($scope.prices.coinbase.url + '?currency=GBP').then(function(response){
		$scope.prices.coinbase.gbp = response.data.data.amount;
	});
	$http.get($scope.prices.coinbase.url + '?currency=USD').then(function(response){
		$scope.prices.coinbase.usd = response.data.data.amount;
	});
	$http.get($scope.prices.coinbase.url + '?currency=EUR').then(function(response){
		$scope.prices.coinbase.eur = response.data.data.amount;
	});

  }
]);