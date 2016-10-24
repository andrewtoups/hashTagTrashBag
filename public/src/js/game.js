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
    // show point value on screen


  },

  showText: function(){
    $('#message').find('p').text(this.text);
  },
};

var Game = {
  path: '../images/badges/',

  currentBadges: {},

  currentScore: 0,

  grabBadge: function(tier){
    tier = tier || 'tierOne';
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
    $('#score').text(Game.currentScore);
    // animations.acquire(badge.value.toString(), {'top': '40px', 'right': '40px'});
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

  updateCount(badge){
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
  }
};



window.onload = function(){
  console.log('loaded');
  Game.init();
};
