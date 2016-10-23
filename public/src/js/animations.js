const displayArea = '#game-container';

var animations = {

  images: ['apple.svg', 'bowling.svg', 'box.svg', 'cabbage.svg', 'cactus.svg', 'can.svg', 'cat.svg', 'cleaver.svg', 'cockroach.svg', 'coffin.svg', 'cookie.svg', 'cup.svg', 'fish.svg', 'floppydisk.svg', 'gyro.svg', 'heart.svg', 'knife.svg', 'pill.svg', 'pillbottle.svg', 'potatoes.svg', 'pumpkin.svg', 'r2d2.svg', 'rainbow.svg', 'scissors.svg', 'shoe.svg', 'skateboard.svg', 'smartphone.svg', 'snowglobe.svg', 'sofa.svg', 'swissarmyknife.svg', 'teabag.svg', 'tentacle.svg', 'triangle.svg', 'umbrella.svg', 'voodoodoll.svg', 'wallet.svg'],

  methods: ['acquire', 'hinge', 'zoomIn'],

  entryStyles: ['bounceIn', 'rubberBand', 'jello', 'flipInX', 'tada'],

  shakeStyles: ['rubberBand', 'jello', 'tada', 'shake', 'wobble'],

  getPosition: function(){
    var position = {
      left: Math.floor(Math.random()* ($(displayArea).outerWidth() - 20)),
      top: Math.floor(Math.random()* ($(displayArea).outerHeight() - 20)),
    }
    // position.left = position.left - position.left/2
    // position.top = position.top - position.top/2
    return position;
  },

  getStyle: function(type){
    var style = animations[type+'Styles'][Math.floor(Math.random()*animations[type+'Styles'].length)];
    return style;
  },

  createElem: function(content){
    var position = animations.getPosition();
    var elem = $('<img>')
    .attr({
      'src': content,
      'width': '50px',
    })
    .css({
      'position': 'absolute',
      'top': position.top + 'px',
      'left': position.left + 'px',
    })
    .prependTo(displayArea);
    return elem;
  },

  cancel: function(elem){
    var clone = $(elem).clone(true);
    elem.before(clone);
    $(elem).remove();
    return clone;
  },

  acquire: function(content){
    var style = animations.getStyle('entry');
    var elem = animations.createElem(content);
    var plus = elem
      .clone()
      .attr({
        'src': 'images/operators/plus.svg',
        'height': '15px'
      })
      .css({
        'left': '-=35px',
        'top': '+=10px'
      })
      .add(elem);
    plus.prependTo(displayArea);

    $(plus)
    .toggleClass('animated ' +style)
    .on('animationend', function(){
      $(this).toggleClass(style +' fadeOutUpBig')
        .on('animationend', function(){
          $(this).remove();
        });
    });
  },

  hinge: function(content){
    var elem = content instanceof jQuery ? content : animations.createElem(content);
    $(elem)
    .toggleClass('animated hinge').
    on('animationend', function(){
      $(this).remove();
    });
  },

  zoomIn: function(content){
    var elem = content instanceof jQuery ? content : animations.createElem(content);
    $(elem)
    .toggleClass('animated zoomInOut').
    on('animationend', function(){
      $(this).remove();
    })
  },

  randomShake: function(elem){
    var style = animations.getStyle('shake');
    elem = animations.cancel(elem);
    $(elem)
    .toggleClass('animated ' +style)
    .on('animationend', function(){
      $(this).removeClass('animated ' +style);
    });
  },

  static: function(elem, style){
    if ($(elem).attr('class') === 'animated ' +style){
      elem = animations.cancel(elem);
      $(elem)
      .toggleClass('animated ' +style)
      .on('animationend', function(){
        $(this).removeClass('animated ' +style);
      });
      console.log('in if');
    }
    $(elem)
    .toggleClass('animated ' +style)
    .on('animationend', function(){
      $(this).removeClass('animated ' +style);
    });
  }






};

//DEBUG STUFF

var index = Math.floor(Math.random() * animations.images.length);
var randomImg = 'images/badges/' + animations.images[index];
$('#static-img').attr('src', randomImg);

$('#temp-button').click(function(){
  animations.randomShake($(this));
  var content = $('#test-file').val();
  var method = $('#test-method').val();
  method = method === 'select method' ? 'acquire' : method;
  content = content === 'select badge' ? randomImg : content;
  console.log(method);
  animations[method](content);
});

$('#random-button').click(function(){
  animations.randomShake($(this));
  var index = Math.floor(Math.random() * animations.images.length);
  var randomImg = 'images/badges/' + animations.images[index];
  $('#static-img').attr('src', randomImg);
  var method = $('#test-method').val();
  method = method === 'select method' ? 'acquire' : method;
  console.log(method);
  animations[method](randomImg);
});


$('#test-file').change(function(){
  var content = $('#test-file').val();
  $('#static-img').attr('src', content);
});

$('#static-button').click(function(){
  animations.randomShake($(this));
  var method = $('#static-method').val();
  method = method === 'select method' ? 'jello' : method;
  animations.static($('#static-img'), method);
});

$('#screen-shake').click(function(){
  animations.randomShake($(this));
  animations.randomShake(displayArea);
});
