(function () {
	var countdowns = document.querySelectorAll('[data-event-countdown="true"]');

	function setValue(countdown, attribute, value) {
		var element = countdown.querySelector('[' + attribute + '="true"]');
		if (element) {
			element.textContent = value;
		}
	}

	function initialize(countdown) {
		if (countdown.getAttribute('data-event-countdown-initialized') === 'true') {
			return;
		}

		countdown.setAttribute('data-event-countdown-initialized', 'true');

		var timer = countdown.querySelector('[data-event-countdown-timer="true"]');
		var endDate = Date.parse(countdown.getAttribute('data-event-end-date'));
		var unpublishAfterEvent = countdown.getAttribute('data-unpublish-after-event') === 'true';

		if (!timer || isNaN(endDate)) {
			if (timer) {
				timer.style.display = 'none';
			}
			return;
		}

		var intervalId;
		var update = function () {
			var remaining = endDate - new Date().getTime();

			if (remaining <= 0) {
				window.clearInterval(intervalId);
				if (unpublishAfterEvent) {
					countdown.style.display = 'none';
				} else {
					timer.style.display = 'none';
				}
				return;
			}

			var totalSeconds = Math.floor(remaining / 1000);
			var days = Math.floor(totalSeconds / 86400);
			var hours = Math.floor((totalSeconds % 86400) / 3600);
			var minutes = Math.floor((totalSeconds % 3600) / 60);
			var seconds = totalSeconds % 60;

			setValue(countdown, 'data-event-countdown-days', days);
			setValue(countdown, 'data-event-countdown-hours', ('0' + hours).slice(-2));
			setValue(countdown, 'data-event-countdown-minutes', ('0' + minutes).slice(-2));
			setValue(countdown, 'data-event-countdown-seconds', ('0' + seconds).slice(-2));
		};

		update();
		intervalId = window.setInterval(update, 1000);
	}

	for (var index = 0; index < countdowns.length; index++) {
		initialize(countdowns[index]);
	}
}());
