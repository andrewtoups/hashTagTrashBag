var addListeners = {
  buttons: function(elem){
    $(elem).mousedown(function(){
      console.log('clickdown');
      animations.static($(this), 'rubberBand');
    });
  }
}

window.onload = function(){
  console.log('loaded');
  $('<img>')
    .attr('src', '../images/numerals/' +utils.getNumeral(Math.floor(Math.random()*9)))
    .appendTo('#L');
  $('<img>')
    .attr('src', '../images/numerals/' +utils.getNumeral(Math.floor(Math.random()*9)))
    .appendTo('#R');
  $('<img>')
    .attr('src', '../images/operators/' +utils.getRandomOperator())
    .appendTo('#operator');

  addListeners.buttons('#wrong');
  addListeners.buttons('#right');
};
