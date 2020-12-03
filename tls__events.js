function copyLink(id) {
	var copiedLink = $('.tls__link-block[data-link-id=' + id + ']');
	var copyInput = copiedLink.find($('.tls__link-shorturl'));
	var $tempInput = $('<input class="shorturl-copy-input visually-hidden">');
	var msg = $('.tls__copied-msg');

	$('body').append($tempInput);
	$tempInput.val(copyInput.text()).select();

	try {
		document.execCommand('copy');
		msg[0].innerText = 'Link copied'
		$tempInput.remove();
	} catch (err) {
		msg[0].innerText = 'Something went wrong'
		console.log('Something went wrong');
	}
	msg.show()
	setTimeout(function () {
		msg.hide()
	}, 3000);
}

function addMainEvents() {
	var createLinkBtn = $('#tls__create_link');
	var linkInput = $('#tls__link_input');
	var linkInputErr = $('.tls__mainlink_input-error');
	createLinkBtn.click(function() {
		onShortenLink()
	})
	linkInput.keydown(function (e) {
		if (e.keyCode == 13 && linkInput.val() !== '') {
			onShortenLink()
		}
	});
	linkInput.focus(function() {
		hideError(linkInput, linkInputErr)
	});
}

function addLinkEvents() {
	var deleteButton = $('.tls__link-action-btn-delete');
	deleteButton.on('click', function () {
		if (window.confirm('Удалить ссылку?')) {
			var linkId = $(this).closest('.tls__link-block').attr('data-link-id');
			deleteLink(linkId);
		}
	});

	var copyButton = $('.tls__link-action-btn-copy');
	copyButton.on('click', function () {
		var linkId = $(this).closest('.tls__link-block').attr('data-link-id');
		copyLink(linkId);
	});

	var editActionButton = $('.tls__link-action-btn-edit');
	editActionButton.on('click', function () {
		var linkBlock 			= $(this).closest('.tls__link-block'),
		editLinkBlockBg 			= linkBlock.find('.tls__editlink-block-bg'),
		editLinkBlock 			= linkBlock.find('.tls__editlink-block'),
		closeEditLinkBlock  = linkBlock.find('.tls__editlink-close'),
		linkAlias 					= linkBlock.find('.tls__link-alias'),
		linkId 							= linkBlock.attr('data-link-id'),
		fullUrlOld 					= linkBlock.find('.tls__link-fullurl'),
		fullUrlNew 					= linkBlock.find('.tls__link-fullurl-new'),
		status 							= '1';

		/* reset errors */
		var fullUrlErr = editLinkBlock.find('.tls__fullurl_input-error');
		var fullUrlErrMsg = 'Поле не может быть пустым';
		var aliasErr = editLinkBlock.find('.tls__alias_input-error');
		var aliasErrMsg = 'Допускаются только латинские буквы, цифры, тире и подчеркивание';

		fullUrlNew.on('focus', function() { hideError(fullUrlNew, fullUrlErr) })
		linkAlias.on('focus', function() { hideError(linkAlias, aliasErr) })


		fullUrlNew.val(fullUrlOld[0].innerHTML)
		editLinkBlockBg.show();
		editLinkBlock.show();

		var editRequestButton = $('.tls__editlink-requestbtn');
		editRequestButton.on('click', function() {
			if (!fullUrlNew.val()) {
				showError(fullUrlNew, fullUrlErr, fullUrlErrMsg);
				return
			}
			if (!checkAlias(linkAlias)) {
				showError(linkAlias, aliasErr, aliasErrMsg);
				return
			}
			editLink(linkId, fullUrlNew.val(), linkAlias.val(), status);
		})

		closeEditLinkBlock.on('click', function() {
			editLinkBlock.hide();
			editLinkBlockBg.hide();
			hideError(fullUrlNew, fullUrlErr);
			hideError(linkAlias, aliasErr);
		})

		editLinkBlockBg.on('click', function() {
			editLinkBlock.hide();
			editLinkBlockBg.hide();
			hideError(fullUrlNew, fullUrlErr);
			hideError(linkAlias, aliasErr);
		})
	});
}
function checkAlias(field) {
	var regexp = /^[a-zA-Z0-9_\-]*$/;
	if (!field.val().match(regexp)) {
		field.addClass('error');
		return false
	}
	return true
}
function showError(field, err, msg) {
	field.addClass('error');
	err[0].innerHTML = msg;
	err.show();
}

function hideError(field, err) {
	field.removeClass('error');
	err[0].innerHTML = '';
	err.hide();
}
function updateLinkData(id) {
	var linkBlock = $('.tls__link-block[data-link-id=' + id + ']');
	editLinkBlock 			= linkBlock.find('.tls__editlink-block'),
	editLinkBlockBg 			= linkBlock.find('.tls__editlink-block-bg'),
	linkAlias 					= linkBlock.find('.tls__link-alias'),
	shortUrl 						= linkBlock.find('.tls__link-shorturl'),
	fullUrlOld 					= linkBlock.find('.tls__link-fullurl'),
	fullUrlNew 					= linkBlock.find('.tls__link-fullurl-new');

	shortUrl[0].innerHTML = addAlias(id, linkAlias.val());
	shortUrl[0].href = addAlias(id, linkAlias.val());

	fullUrlOld[0].innerHTML = fullUrlNew.val();
	fullUrlOld[0].href = fullUrlNew.val();

	editLinkBlock.hide();
	editLinkBlockBg.hide();
}

function addAlias(id, alias) {
	if (alias) {
		return 'https://tilda.link/' + id + '-' + alias
	}
	return 'https://tilda.link/' + id
}
function onShortenLink() {
	var linkVal = $('#tls__link_input').val();
	createLink(linkVal);
}