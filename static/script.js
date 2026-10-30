
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const checkButton = document.getElementById("checkButton");
    const togglePassword = document.getElementById("togglePassword");

    const result = document.getElementById("result");
    const suggestions = document.getElementById("suggestions");
    const strengthFill = document.getElementById("strengthFill");
    const strengthBar = document.getElementById("strengthBar");

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

    // Common passwords
    const commonPasswords = [
        "password", "123456", "12345678", "qwerty",
        "admin", "welcome", "hello", "letmein",
        "iloveyou", "monkey", "dragon", "sunshine",
        "football", "abc123"
    ];

    // Show or hide password
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

    // Check for common or predictable passwords
    function isPredictable(password) {
        const normalized = password.toLowerCase();

        // Exact common passwords
        if (commonPasswords.includes(normalized)) {
            return true;
        }

        // Common password followed by simple numbers or symbols
        const commonBase = commonPasswords.some(word => {
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const pattern = new RegExp(
                "^" + escapedWord + "[!@#$%^&*._-]*[0-9]+$",
                "i"
            );

            return pattern.test(password);
        });

        if (commonBase) {
            return true;
        }

        // Repeated characters, such as aaaaa or 111111
        if (/(.)\1{3,}/.test(password)) {
            return true;
        }

        // Simple keyboard and number sequences
        const sequences = [
            "1234", "2345", "3456", "4567",
            "5678", "6789", "abcd", "bcde",
            "cdef", "qwerty", "asdf"
        ];

        if (sequences.some(sequence => normalized.includes(sequence))) {
            return true;
        }

        return false;
    }

    // Analyze password strength
    checkButton.addEventListener("click", function () {
        const password = passwordInput.value;

        let score = 0;
        const tips = [];

        if (password.length === 0) {
            result.textContent = "Please enter a password.";
            result.style.color = "#ef4444";

            strengthFill.style.width = "0%";
            strengthBar.setAttribute("aria-valuenow", "0");

            suggestions.replaceChildren();
            addSuggestion("Enter a sample password to see suggestions.");
            return;
        }

        // Length checks
        if (password.length >= 8) {
            score++;
        } else {
            tips.push("Use at least 8 characters.");
        }

        if (password.length >= 12) {
            score++;
        } else {
            tips.push("Use at least 12 characters for better security.");
        }

        if (password.length >= 16) {
            score++;
        } else {
            tips.push("Consider using 16 or more characters.");
        }

        // Character variety checks
        if (/[A-Z]/.test(password)) {
            score++;
        } else {
            tips.push("Add uppercase letters (A-Z).");
        }

        if (/[a-z]/.test(password)) {
            score++;
        } else {
            tips.push("Add lowercase letters (a-z).");
        }

        if (/[0-9]/.test(password)) {
            score++;
        } else {
            tips.push("Add numbers (0-9).");
        }

        if (/[^A-Za-z0-9]/.test(password)) {
            score++;
        } else {
            tips.push("Add special characters such as @, # or !.");
        }

        // Predictability check
        const predictable = isPredictable(password);

        if (predictable) {
            score = 0;
            tips.unshift(
                "This password contains a common password or predictable pattern. Choose a less predictable password."
            );
        }

        // Determine strength
        let strength;
        let meterColor;
        let percentage;

        if (predictable || password.length < 8 || score <= 2) {
            strength = "Weak";
            meterColor = "#ef4444";
            percentage = 25;
        } else if (password.length >= 14 && score >= 6) {
            strength = "Strong";
            meterColor = "#22c55e";
            percentage = 100;
        } else {
            strength = "Medium";
            meterColor = "#facc15";
            percentage = 60;

            tips.unshift(
                "Improve your password length and variety to make it stronger."
            );
        }

        // Display result
        result.textContent = "Strength: " + strength;
        result.style.color = meterColor;

        // Update strength meter
        strengthFill.style.width = percentage + "%";
        strengthFill.style.backgroundColor = meterColor;
        strengthBar.setAttribute("aria-valuenow", String(percentage));

        // Display suggestions
        suggestions.replaceChildren();

        if (strength === "Strong") {
            addSuggestion("Good job! Your password passed these basic checks.");
        } else {
            [...new Set(tips)].forEach(addSuggestion);
        }
    });

    // Safely add suggestions
    function addSuggestion(message) {
        const item = document.createElement("li");
        item.textContent = message;
        suggestions.appendChild(item);
    }
});
