var xpos;
var ypos;
var windowwidth;
var containerwidth = 973;
var difference;
var hmultiplier = 0.5;
var vmultiplier = 0.25;
var backmult = -0.05;
var middmult = 0.025;
var foremult = 0.1;
var hovering = 0;
var x;
$("#adbox").hover(
	function() {
		x = setTimeout(function() {
			hovering = 1;
		},100)
		$(this).mousemove(function(e){
			windowwidth = $(window).width();
			difference = windowwidth-containerwidth;
			if(difference > 0) {
				gapsize = difference / 2;
			}
			xpos = e.pageX - this.offsetLeft - gapsize -150;
			ypos = e.pageY - this.offsetTop - 125;
			
			$('#status').html(xpos +', '+ ypos);
			
			if(hovering==0) {
				$("#adbox .background").animate({left: xpos*backmult*hmultiplier, top: ypos*backmult*vmultiplier},100);
				$("#adbox .middle").animate({left: xpos*middmult*hmultiplier, top: ypos*middmult*vmultiplier},100);
				$("#adbox .backback").animate({left: xpos*middmult*hmultiplier, top: ypos*middmult*vmultiplier},100);
				$("#adbox .foreground").animate({left: xpos*foremult*hmultiplier, top: ypos*foremult*vmultiplier},100);
			} else {
				$("#adbox .background").stop().css({left: xpos*backmult*hmultiplier, top: ypos*backmult*vmultiplier});
				$("#adbox .middle").stop().css({left: xpos*middmult*hmultiplier, top: ypos*middmult*vmultiplier});
				$("#adbox .backback").stop().css({left: xpos*middmult*hmultiplier, top: ypos*middmult*vmultiplier});
				$("#adbox .foreground").stop().css({left: xpos*foremult*hmultiplier, top: ypos*foremult*vmultiplier});
			}
		
		});
	},
	function() {
			$("#adbox > div").animate({left: 0, top: 0});
			clearTimeout(x);
			hovering = 0;
	}
);