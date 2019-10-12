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

		var homeIcon = document.createElement("button");
		homeIcon.setAttribute("class", "touchSwipeHome");
		homeIcon.addEventListener("click", function() {self.sendNotification('PAGE_CHANGED', 0);});
		
		var prevIcon = document.createElement("button");
		prevIcon.setAttribute("class", "touchSwipePrev");
		prevIcon.addEventListener("click", function() {self.sendNotification('PAGE_DECREMENT', 1);});
		
		var nextIcon = document.createElement("button");
		nextIcon.setAttribute("class", "touchSwipeNext");
		nextIcon.addEventListener("click", function() {self.sendNotification('PAGE_INCREMENT', 1);});

		wrapper.appendChild(prevIcon);
		wrapper.appendChild(homeIcon);
		wrapper.appendChild(nextIcon);

		return wrapper;
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
