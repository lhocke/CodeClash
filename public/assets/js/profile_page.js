$(document).ready(function() { 
	$.get('/api/profile', function(currentUser) {
		var getUser = function(user) {
		    var userId = user || "";
		    if (userId) {
		        userId = "/?id" + userId;
		    }

		    // gets individual question data
	        $.get("/api/profile" + userId, function(data) {
				var soloAttempts = data[0].solo_wins + data[0].solo_losses;
				var correctPercentage = data[0].solo_wins / soloAttempts;
				// console.log('data all html', data);
				// console.log('username', data[0].username);
				$('.user-render').text(data[0].username);
				$('#solo-win-render').text(data[0].solo_wins);
				$('#solo-loss-render').text(data[0].solo_losses);
				$('#solo-attempts-render').text(soloAttempts);
	        });
		}
	})

	// $('#arena-link').click(function() {
	//   console.log('click works');
	// });
});

