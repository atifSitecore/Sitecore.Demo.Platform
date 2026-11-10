(function () {
	function setDocumentDirection() {
		var html = document.documentElement;
		var language = (html.getAttribute('lang') || '').toLowerCase();

		html.setAttribute('dir', (language === 'ar' || language.indexOf('ar-') === 0) ? 'rtl' : 'ltr');
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setDocumentDirection);
	} else {
		setDocumentDirection();
	}
}());