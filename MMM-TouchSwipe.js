/* global Module */

/* Magic Mirror
 * Module: MMM-TouchSwipe
 *
 * By Buzz Kc
 * MIT Licensed.
 */

Module.register("MMM-TouchSwipe", {
	defaults: {
		helpText: 'Swipe Here',
		dimmerOverride: false,
		dimmerOverrideValue: 120,
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

		var dimAuto = document.createElement("div");
		dimAuto.setAttribute("id", "touchSwipeDimAutoContainer");
		dimAuto.setAttribute("class", "touchSwipeDimAutoContainer");

		var auto = document.createElement("button");
		auto.innerHTML = "Auto Dim";
		auto.setAttribute("class", "touchAutoDim");
		auto.addEventListener("click", function() { self.sendNotification("MMM-Screendimmer_RESUME", null); });

		dimAuto.appendChild(auto);

		var homeIcon = document.createElement("button");
		homeIcon.setAttribute("class", "touchSwipeHome");
		homeIcon.addEventListener("click", function() {self.sendNotification('PAGE_CHANGED', 0);});

		var prevIcon = document.createElement("button");
		prevIcon.setAttribute("class", "touchSwipePrev");
		prevIcon.addEventListener("click", function() {self.sendNotification('PAGE_DECREMENT', 1);});

		var nextIcon = document.createElement("button");
		nextIcon.setAttribute("class", "touchSwipeNext");
		nextIcon.addEventListener("click", function() {self.sendNotification('PAGE_INCREMENT', 1);});

		var dimNav = document.createElement("div");
		dimNav.setAttribute("id", "touchSwipeDimNavContainer");
		dimNav.setAttribute("class", "touchSwipeDimNavContainer");

		var b = document.createElement("button");
		b.innerHTML = "-";
		b.addEventListener("click", function() {document.getElementById("dimNumber").stepDown(1); self.sendNotification("MMM-Screendimmer_OVERRIDE", document.getElementById("dimNumber").value);});
		b.setAttribute("id", "dimDownDirectionButton");
		b.setAttribute("class", "dimButton");
		dimNav.appendChild(b);

		var input = document.createElement("input");
		input.type='number';
		input.setAttribute('min', 10);
		input.setAttribute('max', 255);
		input.setAttribute('step', 15);
		input.setAttribute('id', 'dimNumber');
		input.setAttribute('class', 'dimNumber');
		input.value = this.config.dimmerOverrideValue;
		dimNav.appendChild(input);

		var b = document.createElement("button");
		b.innerHTML = "+";
		b.addEventListener("click", function() {document.getElementById("dimNumber").stepUp(1); self.sendNotification("MMM-Screendimmer_OVERRIDE", document.getElementById("dimNumber").value);});
		b.setAttribute("id", "dimUpDirectionButton");
		b.setAttribute("class", "dimButton");
		dimNav.appendChild(b);

		wrapper.appendChild(dimAuto);
		wrapper.appendChild(prevIcon);
		wrapper.appendChild(homeIcon);
		wrapper.appendChild(nextIcon);
		wrapper.appendChild(dimNav);

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

	notificationReceived: function(notification, payload, sender) {
		if (notification === "MMM-Screendimmer_CURRENT_VALUE") {
			this.config.dimmerOverrideValue = payload;
			this.updateDom();
		}
	}
});
