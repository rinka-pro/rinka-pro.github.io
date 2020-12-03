function drawPage() {
	var wrapper = $('body');
	var html = '';
	var apiUrl = 'https://tilda.link/api/url/all/?sId=DESC&iPageSize=' + linksShortener.perPage;

	html += '<div class="tls__wrapper" id="tls__wrapper">';
	html += '<h1 class="tls__title tls__container">Tilda Links</h1>';
	html += '<div class="tls__main-inputgroup tls__container">';
	html += '<input type="text" class="tls__link-input" placeholder="Enter your link" id="tls__link_input">';
	html += '<button class="tls__btn--main" type="button" id="tls__create_link">Shorten</button>';
	html += '<span type="text" class="tls__link-input-error tls__mainlink_input-error"></span>';
	html += '</div>';
	html += '<div class="tls__links-container" id="links_list">';
	html += '</div>';
	html += '</div>';

	wrapper.append(html);

	getLinksList(apiUrl);
	addMainEvents();
}
function drawLinksContainer(links) {
	var wrapper = $('#links_list');
	var html = '';
	var title = linksShortener.total == 1 ? 'link' : 'links';

	html += '<div class="tls__links-wrapper tls__container">';
	html += '<h4 class="tls__links-header"><span class="tls__links-header-count">' + linksShortener.total + '</span> ' + title + '</h4>';
	html += '<div class="tls__links-list tls__container">';
	html += '<div class="tls__copied-msg"></div>';
	html += drawLinksList(links);
	html += '</div>';
	html += '</div>';

	wrapper.append(html);

	addLinkEvents();
}
function drawLinksList(links) {
	var html = '';

	if (linksShortener.total > linksShortener.perPage) {
		drawPagination();
	}
	links.forEach(function(link) {
		html += drawLinkBlock(link);
	})
	return html
}
function drawLinkBlock(link) {
	var alias = link.alias ? '-' + link.alias : '';
	var html = '';

	html += '<div class="tls__link-block" data-link-id="' + link.shorturl + '">';
	html += '<div class="tls__link-created">' + formatDate(link.created) + '</div>';
	html += '<div class="tls__url-wrap"><a class="tls__link-fullurl" href="' + link.fullurl + '" target="_blank" rel="noreferrer nofollow">' + link.fullurl + '</a></div>';
	html += '<div class="tls__url-wrap tls__url-wrap--shorturl"><a class="tls__link-shorturl" href="https://tilda.link/' + link.shorturl + alias + '" target="_blank" rel="noreferrer nofollow">' + 'https://tilda.link/' + link.shorturl + alias + '</a>';
	html += '<button class="tls__link-action-btn tls__link-action-btn-copy" title="Copy to clipboard">';
	html += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" height="22" viewBox="0 0 32 28" width="32" stroke="#000">';
	html += '<path d="m3 0h-3v12.1051h10.625v-2.28068m-2.96196-9.82442h2.96196v4.43852" transform="matrix(2 0 0 2 2 2.45703)" />';
	html += '<path d="m0 0 3.15686 3.25994 3.12963-3.25993998" transform="matrix(0 2 -2 0 17.2697 10)" />';
	html += '<path d="m10.75 16.1562h21.25" stroke-width="2"/>';
	html += '<rect height="3.61396" rx="1.806978" width="8.43478" x="8.21753" y="1" stroke-width="2"/>';
	html += '</svg>';
	html += '</button>';
	html += '</div>';
	html += '<div class="tls__clicks">';
	html += '<svg class="tls__clicks-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
	html += '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>';
	html += '<circle cx="12" cy="12" r="3"></circle>';
	html += '</svg>';
	html += link.cnt;
	html += '</div>';

	html += '<div class="tls__link-action-buttons">';
	html += '<button class="tls__link-action-btn tls__link-action-btn-edit" title="Edit">';
	html += '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
	html += '<path d="M12 20h9"/>';
	html += '<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>';
	html += '</svg>';
	html += '<span>Edit</span>';
	html += '</button>';
	html += '<button class="tls__link-action-btn tls__link-action-btn-delete" title="Delete">';
	html += '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">';
	html += '<polyline points="3 6 5 6 21 6"/>';
	html += '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>';
	html += '<line x1="10" y1="11" x2="10" y2="17"/>';
	html += '<line x1="14" y1="11" x2="14" y2="17"/>';
	html += '</svg>';
	html += '</button>';
	html += '</div>';

	html += '<div class="tls__editlink-block-bg"></div>';
	html += '<div class="tls__editlink-block">';
	html += '<button class="tls__editlink-close">';
	html += '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">';
	html += '<line x1="5.67342" y1="16.1948" x2="16.2391" y2="5.62916" stroke="#777"/>';
	html += '<line x1="16.24" y1="16.1968" x2="5.67439" y2="5.63119" stroke="#777"/>';
	html += '</svg>';
	html += '</button>';
	html += '<label class="tls__editlink-label tls__editlink-fullurl-label">';
	html += '<p>Link</p>';
	html += '<input class="tls__editlink-input tls__link-fullurl-new">';
	html += '<span type="text" class="tls__link-input-error tls__fullurl_input-error"></span>';
	html += '</label>';
	html += '<label class="tls__editlink-label">';
	html += '<p>Alias</p>';
	html += '<input class="tls__editlink-input tls__link-alias" value="' + link.alias + '">';
	html += '<span type="text" class="tls__link-input-error tls__alias_input-error"></span>';
	html += '</label>';
	html += '<button class="tls__editlink-requestbtn" type="button">Ok</button>';
	html += '</div>';
	html += '</div>';

	return html
}

function drawPagination() {
	var wrapper = $('#tls__wrapper');
	var html = '';
	var pageCount = Math.ceil(linksShortener.total / linksShortener.perPage);

	html += '<ul class="tls__pagination">';
	for (var i = 1; i <= pageCount; i++) {
		html += '<li class="tls__pagination-item"><button class="tls__pagination-btn" data-page-id="' + i + '">' + i + '</button></li>';
	}
	html += '</ul>';

	wrapper.append(html);

	var paginationBtn = $('.tls__pagination-btn');
	paginationBtn.on('click', function() {
		var pageId = $(this).attr('data-page-id');
		var url = 'https://tilda.link/api/url/all/?iPage=' + pageId + '&iPageSize=' + linksShortener.perPage + '&sId=DESC';
		getLinksList(url);
	})
}
