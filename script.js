$(function() {

	var init = function() {
		$('body').addClass('js-on');
		$('.phone-hacking').append('<div class="info"></div>');
		$('img').after('<img class="mask" src="images/mask-grey.png" width="70" height="70" />');
	
		var info = $('.info'),
			everyone = $('li[data-refs]'),
		
		showRelationships = function(person) {
	
			info.find('ul, h3').remove();
			$('.highlighted').removeClass('highlighted');
			$('.red').remove();
			$('.blue').attr('src', 'images/mask-grey.png');
			person.addClass('highlighted');
	
			person.append('<img class="mask red" src="images/highlight.png" width="70" height="70" />');
			
			person.find('h3').clone().appendTo(info);
			person.find('ul').clone().appendTo(info);
			
			var temp = person.attr('data-refs');
			var web = temp.split(' ');
			for(var i=0; i < web.length; i++) {
				everyone.each(function() {
					if($(this).hasClass(web[i])) {
						$(this).addClass('highlighted').find('.mask').addClass('blue').attr('src', 'images/mask-blue.png');
					}
				});
			}
		},
	
		keys = {
			"LEFT" : 37,
			"RIGHT" : 39
		},
		
		initialiseKeyboard = function() {
			$(document).keyup(function(ev) {
				var code = ev.keyCode ? ev.keyCode : ev.which,
					person = $('.red').closest('li');
	
				switch(code) {
					case keys.LEFT:
						var prev = person.prev();
						if(prev.length == 0) {
							var prevUl = $('.red').closest('ul').prevAll('ul').eq(0);
							if(prevUl.length == 0) {
								prevUl = $('.met');
							}
							prev = prevUl.find('li[data-refs]').last()
						}
						showRelationships(prev);
						break;
					case keys.RIGHT:
						var next = person.next();
						if(next.length == 0) {
							var nextUl = $('.red').closest('ul').nextAll('ul').eq(0);
							if(nextUl.length == 0) {
								nextUl = $('.news-corp');
							}
							next = nextUl.find('li').eq(0);
						}
						showRelationships(next);
						break;
				}
			});
		};
	
		everyone.mouseenter(function() {
			showRelationships($(this));
		});
	
		everyone.eq(0).trigger('mouseenter');
		initialiseKeyboard();
	}
	
	if(!isIE6)
		init();
});