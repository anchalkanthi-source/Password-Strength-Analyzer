
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const checkButton = document.getElementById("checkButton");
    const togglePassword = document.getElementById("togglePassword");

    const result = document.getElementById("result");
    const suggestions = document.getElementById("suggestions");
    const strengthFill = document.getElementById("strengthFill");
    const strengthBar = document.getElementById("strengthBar");

    // Check that all required HTML elements exist
    if (
        !passwordInput ||
        !checkButton ||
        !togglePassword ||
        !result ||
        !suggestions ||
        !strengthFill ||
        !strengthBar
    ) {
        console.error("Password Analyzer: A required HTML element is missing.");
        return;
    }

    // Show or hide the password
    togglePassword.addEventListener("click", function () {
        const passwordIsHidden = passwordInput.type === "password";

        passwordInput.type = passwordIsHidden ? "text" : "password";

        togglePassword.textContent = passwordIsHidden ? "Hide" : "Show";

        togglePassword.setAttribute(
            "aria-label",
            passwordIsHidden ? "Hide password" : "Show password"
        );

        togglePassword.setAttribute(
            "aria-pressed",
            String(passwordIsHidden)
        );
    });

    // Analyze password strength
    checkButton.addEventListener("click", function () {
        const password = passwordInput.value;

        let score = 0;
        const tips = [];

        // Length check
        if (password.length >= 8) {
            score++;
        } else {
            tips.push("Use at least 8 characters.");
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            score++;
        } else {
            tips.push("Add an uppercase letter (A-Z).");
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            score++;
        } else {
            tips.push("Add a lowercase letter (a-z).");
        }

        // Number check
        if (/[0-9]/.test(password)) {
            score++;
        } else {
            tips.push("Add a number (0-9).");
        }

        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) {
            score++;
        } else {
            tips.push("Add a special character, such as @ or #.");
        }

        let strength;
        let percentage = (score / 5) * 100;
        let meterColor = "#ef4444";

        if (password.length === 0) {
            strength = "Please enter a password.";
            percentage = 0;
            tips.length = 0;
        } else if (score <= 2) {
            strength = "Weak";
            meterColor = "#ef4444";
        } else if (score <= 4) {
            strength = "Medium";
            meterColor = "#facc15";
        } else {
            strength = "Strong";
            meterColor = "#22c55e";
        }

        // Display result
        result.textContent = password.length === 0
            ? strength
            : "Strength: " + strength;

        result.style.color = meterColor;

        // Update strength meter
        strengthFill.style.width = percentage + "%";
        strengthFill.style.backgroundColor = meterColor;
        strengthBar.setAttribute("aria-valuenow", String(percentage));

        // Update suggestions
        suggestions.replaceChildren();

        if (password.length === 0) {
            addSuggestion("Enter a sample password to see suggestions.");
        } else if (tips.length === 0) {
            addSuggestion("All five checks passed!");
        } else {
            tips.forEach(addSuggestion);
        }
    });

    // Safely add a suggestion to the list
    function addSuggestion(message) {
        const item = document.createElement("li");
        item.textContent = message;
        suggestions.appendChild(item);
    }
});
