require('./deckOfCard.css');
var React = require('react');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Button = require('react-bootstrap').Button;
var $ = require('jquery');
var uniqueId = require('uniqueid');
var _ = require('lodash');


  // Card Object
  function CardObject(index, value, suit, faceUp){
    this.index = index;
    this.value = value;
    this.suit = suit; 
    this.faceUp = faceUp;
    return this;
  };

  var 
    order = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
    suits = ["♠","♥","♣","♦"],
    cardData = [],
    cardOrder =[],
    workOrder =[],
    cardWidth = 56,
    cardHeight = 80; 
    
  var 
    i = 0,
    length = 52,
    value,
    suit,
    x,y;
    
    // card 作成  
    for (i;i<length;i++){
      suit = suits[Math.floor(i / 13)];
      value = order[i % 13];
     
      cardData.push(
          new CardObject(i+1, value, suit, true)
        );
    };

    cardOrder = cardData;

// Card Component
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
      id:  React.PropTypes.string,
      suit: React.PropTypes.string,
      val: React.PropTypes.string,
  }
  state = {
      id: 'card-' + uniqueId('card-')
  }
 
  render() {
    return (
        <div 
          id={this.state.id}
          key={this.props.key}
          className="card"
          style={this.props.style}
        >
          <div className="suit-left">
          {this.props.suit}
          </div>
          <div className="value-left">
          {this.props.val}
          </div>
          <div className="value-right">
          {this.props.val}
          </div>
          <div className="suit-right">
          {this.props.suit}
          </div>
        </div>
    );
  }
}

// Cards 
class Cards extends React.Component {
  state = {
    labels: cardOrder,
  }
  render() {
    var cards = this.state.labels.map( (label,i) =>{
      var keyvalue = "key-" + i;
      var x = (i%13)*(cardWidth+1)+20;
      var y = (cardHeight+5)*Math.floor(i/13)+150;
      var color = label.suit=="♠"?"#000":label.suit=="♣"?"#000":"#f00";
      var styles = {top:y,left:x,zIndex:i+1,color:color}
      return (
        <Card
          key = {keyvalue} 
          suit={label.suit}
          val={label.value}
          style={styles}
        >
        </Card>
      );
    });
    return (
      <Row className="card-row">
        {cards}
      </Row>
    );
  }

}

  $('#stackBtn').on("click",function(){
    for (var i=0; i<length; i++) {
 
      var
       xPos = 10-i*(10/length)+450-cardWidth/2,
       yPos = 15-i*(15/length)+20;
    
      $("#card-" +cardOrder[i].index)
        .delay(20*i)
        .animate({top:yPos  +　"px",
                     left:xPos + "px"});

    }

  });

  $('#suitBtn').on("click",function(){
    for (var i=length; i>0; i--) {
 
      var
       xPos = ((i-1)%13)*(cardWidth+1)+20,
       yPos = (cardHeight+5)*Math.floor((i-1)/13)+150;
   
      $("#card-" +i)
        .delay(20*(length-i))
        .animate({top:yPos  +　"px",
                     left:xPos + "px"});

    }

  });

  $('#cutBtn').on("click",function(){
 
     var
      xPos,
      yPos, 
      cutPos;

    cutPos = Math.floor(Math.random()*length)+1;

    for (i=length-1;i>=cutPos;i--){
      xPos = 10-i*(10/length)+450-cardWidth/2+cardWidth+10;
      yPos = 15-i*(15/length)+40;
   
      $("#card-" +cardOrder[i].index)
        .delay(0)
        .animate({top:yPos  +　"px",
                     left:xPos + "px"});
    
    }; 

    workOrder = [];

    for  (var i=cutPos;i<length;i++){
      workOrder.push(cardOrder[i]);
    };
    for  (var i=0;i<cutPos;i++){
      workOrder.push(cardOrder[i]);
    };

    cardOrder = workOrder;

    //console.log(cardOrder);

   for  (var i=0;i<length;i++){

      $("#card-" +cardOrder[i].index)
        .delay(0)
        .animate({"zIndex":i});
    };
    
   for  (var i=0;i<length;i++){

      var
       xPos = 10-i*(10/length)+450-cardWidth/2,
       yPos = 15-i*(15/length)+20;
    
      $("#card-" +cardOrder[i].index)
        .delay(250)
        .animate({top:yPos  +　"px",
                     left:xPos + "px"});

    };
 
  });
     
  $('#vLineBtn').on("click",function(){
 
     var
      xPos,
      yPos = 0;

    for  (var i=0;i<length;i++){

       xPos = i*13 +50;
       
       if (i < 27) {
        yPos = yPos + 20; 
       } else {
        yPos = yPos - 20;
       }

    
      $("#card-" +cardOrder[i].index)
        .delay(20*i)
        .animate({top:yPos +　"px",
                 left:xPos + "px","zIndex":i});

    };


  });

  /* ソート */
  $('#sortBtn').on("click",function(){
    var
      xPos,yPos;
 
    for  (var i=1;i<=length;i++){
      xPos = 10-i*(10/length)+600;
      yPos = 15-i*(15/length)+20;

      $("#card-" + i)
        .delay(20*i)
        .animate({top:yPos +　"px",
                 left:xPos + "px","zIndex":i});

    };

    cardOrder = cardData;

    for (var i=0; i<length; i++) {
 
       xPos = 10-i*(10/length)+450-cardWidth/2,
       yPos = 15-i*(15/length)+20;
    
      $("#card-" +cardOrder[i].index)
        .delay(1500)
        .animate({top:yPos  +　"px",
                 left:xPos + "px"});

    }


  });

  /*  シャッフル  */
  $('#shuffleBtn').on("click",function(){
     var
      xPos,
      yPos,
      basePos, 
      cutPos;

    for (var j=0;j<3;j++){

      cutPos = _.random(11,26);
      basePos = length - cutPos;

      for (i=length-1;i>=cutPos;i--){
        xPos = 10-i*(10/length)+450-cardWidth/2+cardWidth+10;
        yPos = 15-i*(15/length)+40;
   
        $("#card-" +cardOrder[i].index)
          .delay(0)
          .animate({top:yPos  +　"px",
                   left:xPos + "px"});
      }; 

      workOrder = [];

      for  (var i=cutPos;i<basePos;i++){
        workOrder.push(cardOrder[i]);
      };

      for  (var i=0;i<cutPos;i++){
        workOrder.push(cardOrder[basePos+i]);
        workOrder.push(cardOrder[i]);
      };
    
      cardOrder = workOrder;

      for  (var i=0;i<length;i++){

        $("#card-" +cardOrder[i].index)
          .delay(0)
          .animate({"zIndex":i});
      };
    
      for  (var i=0;i<length;i++){

        var
         xPos = 10-i*(10/length)+450-cardWidth/2,
         yPos = 15-i*(15/length)+20;
    
        $("#card-" +cardOrder[i].index)
        .delay(i*15)
        .animate({top:yPos  +　"px",
                     left:xPos + "px"});

      }; 

    }; // loop   

  });


module.exports = Cards;