var utils = {
  template: function(source, context){
    source = $(source).html();
    var template = Handlebars.compile(source);
    context = {} || context;
    var html = template(context);
    return html;
  },

  numerals: [
    ['calculator-with-a-zero.svg', 'circle-ring.svg', 'empty-battery.svg', 'empty-glass.svg', 'hand-count-zero.svg', 'number-zero-in-a-circle.svg', 'number-zero.svg', 'number.svg', 'zero-button.svg', 'zero-emission-badge.svg',  ],
    ['cinema.svg', 'circle.svg', 'first-daily-calendar-page-interface-symbol-with-number-1.svg', 'first.svg', 'medal-for-number-1.svg', 'money.svg', 'number-1-drawing.svg', 'number-1.svg', 'number-one-in-a-circle.svg', 'number-one-inside-a-circle.svg', 'one.svg', 'shapes.svg', 'sticker-with-the-number-1.svg', 'symbols.svg',  ],
    ['calendar-day-2.svg', 'countdown.svg', 'film-reel-countdown-number-2.svg', 'flickr-logo-of-two-dots.svg', 'keyboard-key-with-number-2.svg', 'number-2.svg', 'number-two-in-a-circle.svg', 'pause-symbol.svg', 'two-1.svg', 'two-lines.svg', 'two.svg',  ],
    ['countdown.svg', 'html-3-sketched-logo.svg', 'menu-button-of-three-horizontal-lines.svg', 'nature.svg', 'number-3-key-on-keyboard.svg', 'number-three-in-a-circle.svg', 'numbre-3.svg', 'star-number-3.svg', 'three-1.svg', 'three-2.svg', 'three.svg', 'threewordsme-logo.svg',  ],
    ['airplane-travel-day-on-page-with-number-4-of-a-calendar.svg', 'banana-of-four-pieces-outline.svg', 'four-1.svg', 'four-black-squares.svg', 'four-persons-or-person-number-4-symbol.svg', 'four-squares.svg', 'four.svg', 'keyboard-key-of-number-4.svg', 'number-four-in-circular-button.svg', 'star-with-number-4.svg', 'symbols.svg',  ],
    ['calendar-with-day-5.svg', 'digital-number-five.svg', 'film.svg', 'five-1.svg', 'five-minutes.svg', 'five-stars-quality-symbol.svg', 'five.svg', 'high-five.svg', 'number-five-in-circular-button.svg', 'number-five.svg', 'olympic-games-logo.svg', 'star-with-number-five.svg',  ],
    ['braille-six-dots.svg', 'calendar-page-on-day-six.svg', 'daily-calendar-page-of-june-6.svg', 'key-6-of-a-keyboard.svg', 'number-six-in-a-circle.svg', 'number-six-inside-a-square.svg', 'six-1.svg', 'six-dices.svg', 'six-gold-bars.svg', 'six-persons.svg', 'six-pointed-star.svg', 'six.svg',  ],
    ['chronometer.svg', 'key-number-7.svg', 'number-7.svg', 'number-seven-in-a-circle.svg', 'number-seven-t-shirt.svg', 'person-number-7-or-seven-persons.svg', 'seven-1.svg', 'seven-2.svg', 'seven-dots.svg', 'seven-piano-keys.svg', 'seven.svg', 't-shirt-with-number-7.svg',  ],
    ['billiard.svg', 'day-eight-calendar.svg', 'eight-1.svg', 'eight-grapes.svg', 'eight.svg', 'infinite-mathematical-symbol.svg', 'loop.svg', 'march-1.svg', 'march.svg', 'number-eight-in-a-circle.svg', 'polygonal-number-eight.svg', 'womens-day.svg',  ],
    ['mobile-phone-with-nine-keys.svg', 'nine-1.svg', 'nine-black-tiles.svg', 'nine-oclock-on-circular-clock.svg', 'nine-persons-symbol.svg', 'nine-persons.svg', 'nine-small-circles.svg', 'nine.svg', 'number-9-key-on-keyboard.svg', 'number-nine-in-a-circle.svg', 'number-nine.svg', 'telephone-auricular-with-nine-circular-buttons.svg',  ],
  ],

  operators: {'+': 'plus.svg', '-': 'minus.svg', '/': 'dividedby.svg', 'x': 'times.svg'},

  loader: {
    isLoading: false,
    show: function(){
      this.isLoading = true;
      // display loading icon
    },
    hide: function(){
      this.isLoading = false;
      // remove loading icon
    }
  },

  getNumeral: function(num){
    var numeral = utils.numerals[num];
    var index = Math.floor(Math.random()*numeral.length);
    return num+ '/' +numeral[index];
  },

  getOperator: function(operator){
    return utils.operators[operator];
  },

  calculate: function(equation){
    switch (equation.operator) {
      case '+':
        return Number(equation.num1) + Number(equation.num2);
        break;
      case '-':
        return Number(equation.num1) - Number(equation.num2);
        break;
      case '/':
        if (equation.num2 === 0){
          return undefined;
        }
        return Number(equation.num1) / Number(equation.num2);
        break;
      case 'x':
        return Number(equation.num1) * Number(equation.num2);
        break;
      default:
        return;
    }
  },

  scramble: function(num){
    num = num || Math.floor(Math.random()*9);
    num = Number(num);
    var diff = Math.ceil(Math.random()*num)/2;
    if (Math.random() >= 0.5){
      num += diff;
    } else {
      num -= diff;
    }
    return Math.round(num);
  }
};
