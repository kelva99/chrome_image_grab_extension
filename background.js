const message = document.getElementById('message');
// alert('message')

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

	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		// var tab = tabs[0];
		// alert(tab.url);
		let code = `
					var nlist = document.querySelectorAll("img");
					var arr = Array.from(nlist);`;
		var fullPic = document.getElementById('dl_original').checked;
		if (!fullPic){
			code +=`
					arr.forEach( function(item, index, array) {
						// TODO: not getting all images on the page
						array[index] = item.src;
					});
					`;
		}
		else {
			code += `
					arr.forEach( function(item, index, array) {
						var link = null;
						if (item.parentNode != null && item.parentNode.nodeName == "DIV"){
							link = item.parentNode;
						}

						if (link != null && 
							link.parentNode != null && 
							link.parentNode.nodeName == "A" && 
							link.parentNode.href != null)
						{
							link = link.parentNode.href;
						}
						// TODO: a href doesn't generate until user clicks

						if (link != null){
							array[index] = link;
						}
						else{
							array[index] = item.src;
						}
					});
					`;
		}
		code += `console.log(arr);
					arr`;
		chrome.tabs.executeScript(tabs[0].id, {code}, downloadEach);
	});

	function downloadEach(result){
		var res = result[0];
		alert(res.length);
		/*
		for(var i = res.length - 1; i >= 0; i--){
			var img = new Image();
			img.src = res[i];
			img.onerror = function(){
				res.splice(i, 1);
			};
			if (res[i] == "" || img.src.width < width || img.src.height < height) {
				res.splice(i, 1);
			}
		}
		if (res.length == 0) {
			alert("No image found on the screen");
		}
		else {

		}
		alert(res.length);
		*/
	}

	// message.textContent = "";
	return true;
}
