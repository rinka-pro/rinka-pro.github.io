function getLinksList(apiUrl) {
	$.ajax({
		type: 'GET',
		url: apiUrl,
		dataType: 'text',
		success: function (data) {
			if (data === '') {
				return;
			}
			try {
				$('.tls__links-wrapper').remove();
				$('.tls__pagination').remove();
				var obj = JSON.parse(data);
				linksShortener.total = obj.total;
				drawLinksContainer(obj.data);
			} catch (e) {
				console.log(e);
				return;
			}
		},
		error: function (xhr) {
			console.log(xhr);
		}
	});
}

function createLink(link) {
	var apiUrl = 'https://tilda.link/api/url/create/';
	var data = {
		url: link,
	}
	$.ajax({
		type: 'POST',
		url: apiUrl,
		headers: {
			Appid: "TildaClient1",
		},
		data: data,
		dataType: 'text',
		success: function (data) {
			if (data === '') {
				return;
			}
			try {
				var wrapper = $('.tls__links-list');
				var mainInput = $('#tls__link_input');
				var linksCount = $('.tls__links-header-count');
				var linksCountNum = linksCount[0].innerHTML;
				mainInput.val('');
				var linkObj = {
					shorturl: data.replace('https://tilda.link/', ''),
					fullurl: link,
					created: convertDateToString(new Date()),
					alias: '',
					cnt: 0
				}
				wrapper.prepend(drawLinkBlock(linkObj));
				addLinkEvents();
				linksCount[0].innerHTML = ++linksCountNum;
			} catch (e) {
				console.log(e);
				return;
			}
		},
		error: function (xhr) {
			if (xhr.responseText) {
				var mainInput = $('#tls__link_input');
				var err = $('.tls__mainlink_input-error');
				var errMsg = JSON.parse(xhr.responseText).error;
				showError(mainInput, err, errMsg)
			}
		}
	});
}

function deleteLink(id) {
	var apiUrl = 'https://tilda.link/api/url/delete/';
	var data = {
		shorturl: id,
	}
	$.ajax({
		type: 'POST',
		url: apiUrl,
		headers: {
			Appid: "TildaClient1",
		},
		data: data,
		dataType: 'text',
		success: function (data) {
			if (data === '') {
				return;
			}
			try {
				var deletedLink = $('.tls__link-block[data-link-id=' + id + ']');
				var linksCount = $('.tls__links-header-count');
				var linksCountNum = linksCount[0].innerHTML;
				deletedLink.remove()
				linksCount[0].innerHTML = --linksCountNum;
			} catch (e) {
				console.log(e);
				return;
			}
			},
		error: function (xhr) {
			console.log(xhr);
		}
	});
}

function editLink(shortLink, newLink, alias, status) {
	var apiUrl = 'https://tilda.link/api/url/update/';
	var data = {
		shorturl: shortLink,
		url: newLink,
		alias: alias,
		statusid: status
	}
	$.ajax({
		type: 'POST',
		url: apiUrl,
		headers: {
			Appid: "TildaClient1",
		},
		data: data,
		dataType: 'text',
		success: function (data) {
			if (data === '') {
				return;
			}
			try {
				updateLinkData(shortLink)
			} catch (e) {
				console.log(e);
				return;
			}
		},
		error: function (xhr) {
			if (xhr.responseText) {
				var linkInput = $('.tls__link-fullurl-new');
				var err = $('.tls__fullurl_input-error');
				var errMsg = JSON.parse(xhr.responseText).error;
				showError(linkInput, err, errMsg)
			}
		}
	});
}