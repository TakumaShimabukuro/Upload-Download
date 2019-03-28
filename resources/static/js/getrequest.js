$( document ).ready( () => {
	
	var url = window.location;
	
	// GET REQUEST
	$("#btnGetFiles").click( (event) => {
		event.preventDefault();
		ajaxGet();
	});
	
	// DO GET
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : "/files/getall",
			success: (data) => {
				//clear old data
				$("#listFiles").html("");
				/*
					render list of files
				*/
				$("#listFiles").append('<h5>Click para fazer download</h5>');
				$("#listFiles").append('<ul>');				
				$.each(data, (index, file) => {
					console.log(url + '/api/files/' + file.id);
					$("#listFiles").append('<li><a href=' + url + '/'+ file.id +'>' + file.name + '</a></li>');
				});
				$("#listFiles").append('</ul>');
			},
			error : (err) => {
				$("#listFiles").html(err.responseText);
			}
		});	
	}
});