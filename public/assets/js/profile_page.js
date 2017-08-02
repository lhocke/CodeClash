$(document).ready(function() { 
	// HARD CODED IN, NEED TO FIX TO BE DYNAMIC
	var userID = 1;

	$.get('/api/profile/' + userID, function(data) {
		var soloAttempts = data[0].solo_wins + data[0].solo_losses;
		var correctPercentage = data[0].solo_wins / soloAttempts;
		// console.log('data all html', data);
		// console.log('username', data[0].username);
		$('.user-render').text(data[0].username);
		$('#solo-win-render').text(data[0].solo_wins);
		$('#solo-loss-render').text(data[0].solo_losses);
		$('#solo-attempts-render').text(soloAttempts);
		// if (data[0].solo_wins === 0 && data[0].solo_losses === 0) {

		// 	$('#solo-percentage-render').text(correctPercentage.toFixed(3)*100 + '\%');
		// }
	})

	$('#arena-link').click(function() {
	  console.log('click works');
	});

});