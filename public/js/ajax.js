function editCar(data){
	if(confirm("Press a button!"));
}

function deleteCar(data){
	alert(data.value);
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