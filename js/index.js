var current;
var wasArrow;

/** LOAD SCREEN **/
window.addEventListener("load", function ()
	{
	  current = 0;
	  wasArrow = false;
	  var load_screen= document.getElementById("load_screen");
	  document.body.removeChild(load_screen);
	});

/** HIDING BAR **/
$(document).ready(function(e)
	{
      var lastScrollTop, incr = 0;
      var menuSpace = 3;
      startsOn = 80;
      $(window).scroll(function(event)
    {
      var st = $(this).scrollTop();

  if(! wasArrow)
    {
	  height = $(document).height();
	  elements = $('div');
	  elements = elements.slice(2);
	  elcount = elements.length;
	  eleHeight = Math.round(height / elcount);
	  current = Math.round(st / eleHeight);
    }

  if(current <= 1)
	{
	  $('menu').removeClass('hide');
	}
	else
	{
	   $('menu').addClass('hide');
	}
  });
});


/** SCROLL **/
$(document).ready(function()
	{
      var isWebkit = navigator && navigator.userAgent.match(/webkit/i);
      var $root = $(isWebkit ? 'body' : 'html');
      var elements = $('div');
      elements = elements.slice(2);
      elcount = elements.length;
      var scrolling = false;
 /** REPLACING THE CSS ATTRIBUTE **/
      elements.css('background-image', function(i)
	{
      return 'url('+$(this).data('img')+')';
    });

 /** ADD PERMALINKS (NOT FINISHED YET) **/
  elements.each(function(i)
  {
    var $t = $(this);
    var id = $t.attr('id');
    if(!id) return;
    $('<a>').addClass('permalink')
            .attr('href', '#'+id)
            .appendTo($t);
  });

 /** YOU CAN USE KEYS TO NAVIGATE !!! ( LEFT, RIGHT) BUT THEY SOMETIMES DISABLE THE MENU BAR, WHEN YOU GO BACK TO SCROLING WITH MOUSE. DON'T KNOW WHY **/
  $root.keydown(function(e)
  {
    if(e.keyCode != 37 && e.keyCode != 39)
    	return;

	wasArrow = true;
    if(e.keyCode == 37) // LEFT ARROW
    {
    	if(current > 0)
    	{
    		if(current >= elcount -2)
    		{
    		  current -= 3;
    		}
    		else
				current--;
		}
    }
    else if(current < elcount) //  RIGHT ARROW
    {
    	if(current < 1)
    	{
			current = 1;
    	}
    	else
	    	current++;
    }
    if(current < 0)
    	current = 0;
    if(current > elcount - 1)
        current = elcount - 1;
    $root.stop().animate({scrollTop: elements.eq(current).offset().top}, function(){scrolling = false;});
    scrolling = current;
  });
});
