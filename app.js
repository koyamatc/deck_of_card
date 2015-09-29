var React = require('react');
//var _ = require('lodash');
var Cards = require('./Cards');
//require('./deckOfCard.css');

// グラフ用データ
var data = [];


//  コンポーネントの出力

React.render(
  <Cards/>,
	document.getElementById('table')
);