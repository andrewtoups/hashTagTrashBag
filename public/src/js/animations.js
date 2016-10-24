const displayArea = '#game-container';

var animations = {

  images: ['apple.svg', 'bowling.svg', 'box.svg', 'cabbage.svg', 'cactus.svg', 'can.svg', 'cat.svg', 'cleaver.svg', 'cockroach.svg', 'coffin.svg', 'cookie.svg', 'cup.svg', 'fish.svg', 'floppydisk.svg', 'gyro.svg', 'heart.svg', 'knife.svg', 'pills.svg', 'pillbottle.svg', 'potatoes.svg', 'pumpkin.svg', 'r2d2.svg', 'rainbow.svg', 'scissors.svg', 'shoe.svg', 'skateboard.svg', 'smartphone.svg', 'snowglobe.svg', 'sofa.svg', 'swissarmyknife.svg', 'teabag.svg', 'tentacle.svg', 'triangle.svg', 'umbrella.svg', 'voodoodoll.svg', 'wallet.svg'],

  methods: ['acquire', 'hinge', 'zoomIn'],

  entryStyles: ['bounceIn', 'rubberBand', 'jello', 'flipInX', 'tada'],

  shakeStyles: ['rubberBand', 'jello', 'tada', 'shake', 'wobble'],

  getPosition: function(){
    var width = $(displayArea).outerWidth()/2;
    var height = $(displayArea).outerHeight()/2;
    var position = {
      left: Math.floor(Math.random()*(width) + width/2),
      top: Math.floor(Math.random()*(height) + height/2),
    }
    return position;
  },

  getStyle: function(type){
    var style = animations[type+'Styles'][Math.floor(Math.random()*animations[type+'Styles'].length)];
    return style;
  },

  createImg: function(content, position){
    var elem = $('<img>')
    .attr({
      'src': content,
      'width': '150px',
    })
    .css({
      'position': 'absolute',
      'top': position.top + 'px',
      'left': position.left + 'px',
      'filter': 'saturation(150%)'
    })
    .prependTo(displayArea);
    return elem;
  },

  createElem: function(content, position){
    position = position || animations.getPosition();
    if (content.includes('.svg')){
      return animations.createImg(content, position);
    } else {
      var elem = $('<div>')
      .text(content)
      .css({
        'position': 'absolute',
        'top': position.top + 'px',
        'left': position.left + 'px',
      })
      return elem;
    }
  },

  cancel: function(elem){
    var clone = $(elem).clone(true);
    elem.before(clone);
    $(elem).remove();
    return clone;
  },

  addPlus: function(elem){

    // var css = $(elem).css(['left', 'top', 'position']);
    //
    // var plus = $('<img>')
    //   .attr({
    //     'src': '../images/operators/plus.svg',
    //     'height': '15px'
    //   });
    //
    // var newParent = $('div')
    // .css(css)
    // .append(plus)
    // .append(elem);

    var plus = elem
      .clone()
      .attr({
        'src': '../images/operators/plus.svg',
        'height': '40px'
      })
      .css({
        'left': '-=35px',
        'top': '+=10px',
        'filter': 'hue-rotate(180deg)'
      })
      .add(elem);
    return plus;
  },

  acquire: function(content, position){
    var style = animations.getStyle('entry');
    var elem = animations.createElem(content, position); // position random if undefined
    var plus = animations.addPlus(elem);
    plus.prependTo(displayArea);

    $(plus)
    .toggleClass('animated ' +style)
    .css({
      'z-index': '2'
    })
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
