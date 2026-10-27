# 🛡️ Password Strength Analyzer

A beginner-friendly cybersecurity web application that evaluates password strength and provides suggestions to help users create stronger passwords.

## 📌 About the Project

The Password Strength Analyzer checks a sample password against five basic criteria and classifies it as **Weak, Medium, or Strong**. It also provides suggestions to improve password strength.

This project was built to explore cybersecurity fundamentals and web development.

## ✨ Features

- 🔐 Analyze password strength.
- 👁️ Show or hide the entered password.
- 📊 Display a visual password strength meter.
- ✅ Check password length and character variety.
- 💡 Provide suggestions for improving passwords.
- 📱 Responsive and user-friendly interface.
- 🔒 Password analysis happens in the browser; the current application does not send the entered password to the Flask server.

## 🛠️ Technologies Used

- **Python** — application backend
- **Flask** — web framework
- **HTML** — page structure
- **CSS** — styling and responsive design
- **JavaScript** — password analysis and interactive features

## 📂 Project Structure

```text
Password-Strength-Analyzer/
├── app.py
├── requirements.txt
├── .gitignore
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
└── README.md
```

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/anchalkanthi-source/Password-Strength-Analyzer.git
```

### 2. Open the project folder

```bash
cd Password-Strength-Analyzer
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment on Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install the dependencies

```bash
python -m pip install -r requirements.txt
```

### 6. Run the application

```bash
python app.py
```

### 7. Open the application

Visit http://127.0.0.1:5000 in your browser.

## 🔍 How It Works

The analyzer checks whether the entered password:

1. Contains at least 8 characters.
2. Includes an uppercase letter.
3. Includes a lowercase letter.
4. Includes a number.
5. Includes a special character.

The result and improvement suggestions are displayed instantly.

## ⚠️ Disclaimer

This is an educational project demonstrating basic password-strength checks. It does not guarantee that a password is secure and does not check against leaked or commonly used passwords. Use sample passwords for testing, not passwords you actually use.

## 👩‍💻 Author

**anchalkanthi-source**

GitHub: https://github.com/anchalkanthi-source

---

⭐ If you find this project useful, feel free to explore the code and suggest improvements.
