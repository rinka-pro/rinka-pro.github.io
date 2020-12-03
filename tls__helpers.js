function convertDateToString(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? '0' + date.getMinutes() : date.getMinutes();

	return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}
function formatDate(string) {
	var dateTimeParts = string.split(' '),
		dateParts = dateTimeParts[0].split('-');
	var year = dateParts[0].slice(0,2);
	var month = parseInt(dateParts[1], 10) - 1;
	var day = dateParts[2];
	var separator = '.';

	return day + separator + month + separator + year;
}
function formatTime(string) {
	var dateTimeParts = string.split(' '),
		timeParts = dateTimeParts[1];
	return timeParts;
}