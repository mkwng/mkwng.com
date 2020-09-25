/* Author: 

*/

var profileTimeout;

$("#faculty ul li").hover(
	function() {
		profileLi = $(this);
		profileLi.find("img.profile-active").stop().fadeTo(100,1.0,
			function() {
				profileTimeout = setTimeout(
					function() {
						profileLi.find("img.profile-active").animate({borderBottom:"80px solid #ffffff"});
					}
				,800);
			}
		);
	},
	function() {
		profileLi = $(this);
		profileLi.find("img.profile-active").stop().animate({borderBottom:"5px solid #ffffff"}).fadeOut("fast");
		clearTimeout(profileTimeout);
	}
);






















