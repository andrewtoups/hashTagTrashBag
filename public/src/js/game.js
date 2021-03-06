var addListeners = {
  right: function(elem){
    $(elem)
    .mousedown(function(){
      animations.static(this, 'rubberBand');
    })
    .mouseup(function(){
      Game.check(true);
    });
  },

  wrong: function(elem){
    $(elem)
    .mousedown(function(){
      animations.static(this, 'rubberBand');
    })
    .mouseup(function(){
      Game.check(false);
    });
  }

};

function Badge(badgeObj){
  this.name = badgeObj.badge;
  this.value = Number(badgeObj.pointValue);
  this.image = badgeObj.image;
  this.text = badgeObj.description;
  this.init();
};

Badge.prototype = {
  init: function(){
    // call animation
    animations.acquire(Game.path + this.image);
    // print description
    this.showText(this.item);

  },

  showText: function(){
    $('#message').find('p').text(this.text);
  },
};

var Game = {
  path: '../images/badges/',

  currentBadges: {},

  currentScore: 0,

  operators: ['+', '-', '/', 'x'],

  tiers: ['tierOne', 'tierTwo', 'tierThree', 'tierFour', 'tierFive', 'tierSix'],

  randomTier: function(){
    var index = Math.floor(Math.random()*Game.tiers.length);
    return Game.tiers[index];
  },

  grabBadge: function(tier){
    tier = tier || Game.randomTier();
    // tier = tier || 'tierOne';
    var thisTier = (Game.badges[tier]);
    var index = Math.floor(Math.random()*thisTier.length);
    var badgeObj = thisTier[index];
    var badge = new Badge(badgeObj);
    if (!Game.currentBadges[badge.name]){
      Game.currentBadges[badge.name] = 1;
      Game.updateInventory(badge);
    } else {
      Game.currentBadges[badge.name]++;
      Game.updateInventory(badge);
    }
    Game.updateScore(badge);
  },

  updateScore(badge){
    Game.currentScore += badge.value;
    $('#score').find('h3').text(Game.currentScore);
    // animations.acquire(badge.value.toString(), {'top': '40', 'right': '40'});
  },

  updateInventory(badge){
    if (Game.currentBadges[badge.name] === 1){
      $('.' + badge.name)
        .find('img')
        .remove();
      var img = $('<img>')
        .attr('src', Game.path + badge.image)
        .css({
          'opacity': '1'
        });
      animations.static($(img).appendTo('.' + badge.name), 'bounceIn');
    } else {
      Game.updateCount(badge);
    }
  },

  updateCount(badge) {
    if (Game.currentBadges[badge.name] === 2){
      var badgeCount = $('<div>')
        .attr('class', 'badgeCount')
        .text(Game.currentBadges[badge.name]);
      animations.static($(badgeCount).appendTo('.' + badge.name), 'bounceIn');
    } else {
      $('.' + badge.name)
        .find('.badgeCount')
        .text(Game.currentBadges[badge.name]);
    }
  },

  getOperand(){
    return Math.floor(Math.random()*9);
  },

  getOperator(){
    var index = Math.floor(Math.random()*4);
    return Game.operators[index];
  },

  generateEquation(){
    Game.equation.num1 = Game.getOperand();
    Game.equation.num2 = Game.getOperand();
    Game.equation.operator = Game.getOperator();
    if (Game.equation.operator === '/'){
      if (Game.equation.num1 % Game.equation.num2 !== 0){
          Game.equation.operator = '+';
      }
    }
    Game.generateSolution();
  },

  generateSolution(){
    Game.equation.solution = utils.calculate(Game.equation);
    if (Game.equation.solution === undefined){
      Game.equation.solution = 0;
      Game.equation.truth = false;
    } else if (Math.random() >= 0.5){
      Game.equation.solution = utils.scramble(Game.equation.solution);
      Game.equation.truth = false;
    } else {
      Game.equation.truth = true;
    }
  },

  displayEquation(){
    $('<img>')
    .appendTo('#L')
    .attr('src', '../images/numerals/' +utils.getNumeral(Game.equation.num1));
    $('<img>')
    .appendTo('#R')
    .attr('src', '../images/numerals/' +utils.getNumeral(Game.equation.num2));
    $('<img>')
    .appendTo('#operator')
    .attr('src', '../images/operators/' +utils.getOperator(Game.equation.operator));
    $('<p>')
    .appendTo('#solution')
    .text(Game.equation.solution);
  },

  startTimer(){
    $('<div>')
      .attr('id','gameTimer')
      .appendTo('#timer')
      .toggleClass('startTimer')
      .on('animationend', function(){
        Game.gameOver();
      });
  },

  endTimer(){
    if ($('#gameTimer.startTimer')){
      $('#gameTimer.startTimer').finish();
    }
  },

  killTimer(){
    if ($('#gameTimer.startTimer')){
      $('#gameTimer.startTimer').finish();
      $('#gameTimer').remove();
    }
  },

  gameRound(callback){
    callback = callback || function(){};
    Game.startTimer();
    Game.generateEquation();
    Game.displayEquation();
  },

  check(bool){
    if (Game.equation.truth == bool){
      animations.zoomIn($('#game-container').find('span img'));
      animations.zoomIn($('#game-container').find('span p').on('animationend', function(){
        Game.grabBadge();
        Game.reset();
      }));
    }
    else {
      Game.gameOver();
    }
  },

  checkForAnimations(){
    if ($('#game-container').find('.animated').length){
      return true;
    } else {
      return false;
    }
  },

  endAnimations(){
    var currentAnimations = $('#game-container').find('.animated');
    $(currentAnimations).finish();
  },

  gameOver(){
    Game.killTimer();
    $('#wrong').off('mousedown mouseup');
    $('#right').off('mousedown mouseup');
    if (Game.checkForAnimations()){ Game.endAnimations(); }
    animations.hinge($('#game-container').contents().not('#game-over').on('animationend', function(){
      $('#game-over').fadeIn();
    }));
    animations.static($('#game-container'), 'shake');
  },

  reset(){
    Game.equation = {};
    Game.killTimer();
    Game.gameRound();
  },

  init(){
    Game.reset();
    addListeners.wrong('#wrong');
    addListeners.right('#right');
  }
};



window.onload = function(){
  console.log('loaded');
  Game.init();
};
