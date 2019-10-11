/* global Module */

/* Magic Mirror
 * Module: MMM-TouchSwipe
 *
 * By Buzz Kc
 * MIT Licensed.
 */

Module.register("MMM-TouchSwipe", {
	defaults: {
		helpText: 'Swipe Here'
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;

		self.updateDom();
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		wrapper.setAttribute("id", "touchSwipeContainer");
		wrapper.setAttribute("class", "touchSwipeContainer");

		var surface = document.createElement("div");
		surface.setAttribute("id", "touchSwipeSurface");
		surface.setAttribute("class", "touchSwipeSurface");

		var homeIcon = document.createElement("button");
		homeIcon.setAttribute("class", "touchSwipeHome");
		homeIcon.innerHTML = "&nbsp;";
		homeIcon.addEventListener("click", function() {self.sendNotification('PAGE_CHANGED', 0);});

		var helpText = document.createElement("span");
		helpText.innerText = this.config.helpText;
		helpText.setAttribute("class", "touchSwipeHelp");

		surface.appendChild(helpText);

		wrapper.appendChild(homeIcon);
		wrapper.appendChild(surface);

		//MMM-Pages page change actions
		this.swipedetect(surface, function(swipedir){
			console.log("swiping: " + swipedir);
			//swipedir contains either "none", "left", "right", "top", or "down"
			if (swipedir ==='up') {
				console.log('You just swiped up!')
				self.sendNotification('PAGE_INCREMENT', 1);
			}
			if (swipedir ==='down') {
				console.log('You just swiped down!')
				self.sendNotification('PAGE_DECREMENT', 1);
			}
			if (swipedir ==='left') {
				console.log('You just swiped left!')
				self.sendNotification('PAGE_DECREMENT', 1);
			}
			if (swipedir ==='right') {
				console.log('You just swiped right!')
				self.sendNotification('PAGE_INCREMENT', 1);
			}
		});

		return wrapper;
	},

	homeNavigate: function() {
		console.log("home clicked");

	},

	swipedetect: function(el, callback){
	//USAGE:
	/*
    var el = document.getElementById('someel')
    swipedetect(el, function(swipedir){
        swipedir contains either "none", "left", "right", "top", or "down"
        if (swipedir =='left')
            alert('You just swiped left!')
    })
    */
	var touchsurface = el,
		swipedir,
		startX,
		startY,
		distX,
		distY,
		threshold = 50, //required min distance traveled to be considered swipe
		restraint = 40, // maximum distance allowed at the same time in perpendicular direction
		allowedTime = 300, // maximum time allowed to travel that distance
		elapsedTime,
		startTime,
		handleswipe = callback || function(swipedir){}

	touchsurface.addEventListener('touchstart', function(e){
		var touchobj = e.changedTouches[0]
		swipedir = 'none'
		dist = 0
		startX = touchobj.pageX
		startY = touchobj.pageY
		startTime = new Date().getTime() // record time when finger first makes contact with surface
		e.preventDefault()
	}, false)

	touchsurface.addEventListener('touchmove', function(e){
		e.preventDefault() // prevent scrolling when inside DIV
	}, false)

	touchsurface.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0]
		distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		elapsedTime = new Date().getTime() - startTime // get time elapsed
		if (elapsedTime <= allowedTime){ // first condition for awipe met
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
				swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
			}
			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
				swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
			}
		}
		handleswipe(swipedir)
		e.preventDefault()
	}, false)
},




getScripts: function() {
		return [

		];
	},

	getStyles: function () {
		return [
			"MMM-TouchSwipe.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "MMM-TouchSwipe-NOTIFICATION_TEST") {
			// set dataNotification
			this.dataNotification = payload;
			this.updateDom();
		}
	},
});
