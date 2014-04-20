(function (portfolio, window, document, undefined) {
  'use strict';
  portfolio.matrixRain = function () {
    var c = document.getElementById('matrix');
    var ctx = c.getContext('2d');

    //making the canvas full screen
    c.height = $('.dev-link').height();
    c.width = $('.dev-link').width();

    var numbers = '01';
    //converting the string into an array of single characters
    numbers = numbers.split('');

    var font_size = 10;
    var columns = c.width/font_size; //nu mber of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    //drawing the characters
    var draw = function () {
      //Black BG for the canvas
      //translucent BG to show trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = '0f0'; //green text
      ctx.font = font_size + 'px "lucida Console"';
      //looping over drops
      for(var i = 0; i < drops.length; i++) {
        //a random numbers character to print
        var text = numbers[Math.floor(Math.random()*numbers.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > c.height && Math.random() > 0.975)
          drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
      }
    }

    portfolio.matrixRunning = setInterval(draw, 33);
  }

  portfolio.matrixRain();

  $(window).on('resize', function (e) {
    clearInterval(portfolio.matrixRunning);
    portfolio.matrixRain();
  });
})((portfolio), window, document);
