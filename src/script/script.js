$(document).ready(function() {
    // Modal login setup
    var $loginBtn = $("#loginButton");
    var $loginModal = $("#login-modal");
    var $greeting = $("#greeting");
    var $logoutBtn = $("#logoutButton");
    const validUsernames = ["Admin", "Kemal", "Zahran", "Regina"];
    const validPasswords = ["Admin", "123", "234", "567"]; //simulate a database

    // Check sessionStorage for loggedIn state or initialize to false if not present
    var loggedIn = sessionStorage.getItem("loggedIn") === "true";
    var username = sessionStorage.getItem("username");

	$greeting.hide();
	$logoutBtn.hide();
	
    // When the user is already logged in
    if (loggedIn && username) {
        showGreeting(username);
    }

    $loginBtn.on("click", loginModalOn);
    $logoutBtn.on("click", logOut);

    $(window).on("click", function(event) {
        if (event.target == $loginModal[0]) {
            closeLoginModal();
        }
    });

    function closeLoginModal() {
        $loginModal.css("display", "none");
    }

    function loginModalOn() {
        $loginModal.css("display", "flex");
    }

    // Function to set loggedIn to true and save to sessionStorage
    function setLoggedIn(username) {
        loggedIn = true;
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", username);
        showGreeting(username);
    }

    // Function to show greeting and logout button
    function showGreeting(username) {
        $loginBtn.hide();
        $greeting.text("Hello, " + username).show();
        $logoutBtn.show();
    }

    // Function to log out and clear loggedIn from sessionStorage
    function logOut() {
        loggedIn = false;
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("username");
        $loginBtn.show();
        $greeting.hide();
        $logoutBtn.hide();
        console.log("Logged out successfully.");
    }

    function loginFunction(username, password) {
        // Check if username and password are valid
        var isValidUsername = validUsernames.includes(username);
        var isValidPassword = validPasswords.includes(password);

        // Check localStorage for additional usernames and passwords
        if (!isValidUsername || !isValidPassword) {
            var users = JSON.parse(localStorage.getItem("users")) || {};
            isValidUsername = username in users;
            isValidPassword = users[username] === password;
        }

        if (isValidUsername && isValidPassword) {
            setLoggedIn(username);
            console.log("Logged in successfully.");
            closeLoginModal(); // Close the modal after successful login
            // Additional actions after successful login
        } else {
            console.log("Invalid username or password.");
        }
    }

    // Handle login form submission
    $("#login-modal-content form").on("submit", function(event) {
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        loginFunction(username, password);
    });
});

