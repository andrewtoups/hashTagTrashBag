var animations = {
  getPosition: function(){
    var position = {
      left: Math.floor(Math.random()* ($('#game-container').outerWidth() - 20)),
      top: Math.floor(Math.random()* ($('#game-container').outerHeight() - 20)),
    }
    return position;
  },

  ascend: function(content){
    var position = animations.getPosition();
    console.log(position);
    $('<span>').text(content).css({
      'position': 'absolute',
      'top': position.top + 'px',
      'left': position.left + 'px'
    })
    .prependTo('#game-container')
    .toggleClass('animated bounceIn')
    .on('animationend', function(){
      $(this).toggleClass('linearRise')
      .on('animationend', function(){
        $(this).remove();
      });
    })
  },
};

$('#test-button').click(function(){
  var content = $('#test-content').val();
  animations.ascend(content);
});
