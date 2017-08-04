$(document).ready(function() {

	$('#sign-up').on("click", newUser);

	function newUser(user) {
		$.post("/api/profile", user, function() {
		  window.location.href = "/profile";
		});
	}
});

