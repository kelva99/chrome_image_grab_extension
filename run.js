const message = document.getElementById('message');

var btnDownload = document.getElementById('download');
btnDownload.addEventListener("click", downloadAll);
//var btnDownload2 = document.getElementById('download2');
// btnDownload2.addEventListener("click", downloadAll);

function downloadAll(){
	message.textContent = "";
	var width = document.getElementById('width_input').value;
	var height = document.getElementById('height_input').value;

	if (width == null) {
		width = 80;
	}
	if (height == null) {
		height = 80;
	}
	message.textContent = "";


	return true;
}
