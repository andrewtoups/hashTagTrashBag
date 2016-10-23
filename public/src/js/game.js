var addListeners = {
  buttons: function(elem){
    $(elem).mousedown(function(){
      console.log('clickdown');
      animations.static($(this), 'rubberBand');
    });
  }
}

addListeners.buttons('#wrong');
addListeners.buttons('#right');
