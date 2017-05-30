function editCar(data){
	//load editcar view for spesific car
	window.location = '/editcar?id=' + data.value;
}

//sends request to server, delete car from database
function deleteCar(data){
	if(confirm('Är du säker å att du vill ta bort denna bilen?') == true){
		callUrl = '/edit?id=' + data.value;
		$.ajax({
			url: callUrl,
			type: 'DELETE',
			success: function() {
				alert('Bil borttagen');
			},
			error: function(){
				alert('bilen kunde ej tas bort');
			}
		});
	}
}

//send update request to server for specific car
function updateCar(){
	var car_id = document.getElementById('car_id').value;
	var brand = document.getElementById('brand').value;
	var price = document.getElementById('price').value;
	var rails = document.getElementById('rails').value;
	var seats = document.getElementById('seats').value;
	var gear = document.getElementById('gear').value;
	var tow = document.getElementById('tow').value;
	
	callUrl = '/editcar?id=' + car_id + '&brand=' + brand + '&price=' + price + '&rails=' + rails + '&seats=' + seats + '&gear=' + gear + '&tow=' + tow;
	$.ajax({
		url: callUrl,
		type: 'PATCH',
		success: function() {
			alert('Bil uppdaterad');
			window.location.replace('/edit');
		},
		error: function(){
			alert('ändringarna kunde ej göras');
		}
	});
}