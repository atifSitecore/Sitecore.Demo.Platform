(function () {
	function setValue(countdown, attribute, value) {
		var element = countdown.querySelector('[' + attribute + '="true"]');
		if (element) {
			element.textContent = value;
		}
	}

	function setTimerVisibility(timer, isVisible) {
		timer.style.display = isVisible ? 'flex' : 'none';
	}

	function removeCountdown(countdown, timer, unpublishAfterEvent) {
		if (unpublishAfterEvent) {
			countdown.remove();
		} else if (timer) {
			timer.remove();
		}
	}

	function initialize(countdown) {
		if (countdown.getAttribute('data-event-countdown-initialized') === 'true') {
			return;
		}

		countdown.setAttribute('data-event-countdown-initialized', 'true');

		var timer = countdown.querySelector('[data-event-countdown-timer="true"]');
		var endDate = Date.parse(countdown.getAttribute('data-event-end-date') || '');
		var unpublishAfterEvent = countdown.getAttribute('data-unpublish-after-event') === 'true';

		if (!timer || isNaN(endDate)) {
			removeCountdown(countdown, timer, unpublishAfterEvent);
			return;
		}

		var intervalId;
		var update = function () {
			var remaining = endDate - new Date().getTime();

			if (remaining <= 0) {
				window.clearInterval(intervalId);
				removeCountdown(countdown, timer, unpublishAfterEvent);
				return;
			}

			var totalSeconds = Math.floor(remaining / 1000);
			var days = Math.floor(totalSeconds / 86400);
			var hours = Math.floor((totalSeconds % 86400) / 3600);
			var minutes = Math.floor((totalSeconds % 3600) / 60);
			var seconds = totalSeconds % 60;
			setTimerVisibility(timer, true);

			setValue(countdown, 'data-event-countdown-days', days);
			setValue(countdown, 'data-event-countdown-hours', ('0' + hours).slice(-2));
			setValue(countdown, 'data-event-countdown-minutes', ('0' + minutes).slice(-2));
			setValue(countdown, 'data-event-countdown-seconds', ('0' + seconds).slice(-2));
		};

		update();
		intervalId = window.setInterval(update, 1000);
	}

	function initializeCountdowns(root) {
		var countdowns = root.querySelectorAll('[data-event-countdown="true"]');
		for (var index = 0; index < countdowns.length; index++) {
			initialize(countdowns[index]);
		}
	}

	function start() {
		initializeCountdowns(document);

		if (window.MutationObserver) {
			var observer = new MutationObserver(function (mutations) {
				for (var mutationIndex = 0; mutationIndex < mutations.length; mutationIndex++) {
					var mutation = mutations[mutationIndex];
					for (var nodeIndex = 0; nodeIndex < mutation.addedNodes.length; nodeIndex++) {
						var node = mutation.addedNodes[nodeIndex];
						if (node.nodeType === 1) {
							if (node.getAttribute('data-event-countdown') === 'true') {
								initialize(node);
							}
							initializeCountdowns(node);
						}
					}
				}
			});

			observer.observe(document.body, { childList: true, subtree: true });
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}
}());
