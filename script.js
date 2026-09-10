// Caracteres disponibles para generar contraseñas
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Elementos del DOM
const passwordOutput = document.getElementById('passwordOutput');
const passwordLength = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const useUppercase = document.getElementById('useUppercase');
const useLowercase = document.getElementById('useLowercase');
const useNumbers = document.getElementById('useNumbers');
const useSymbols = document.getElementById('useSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const feedback = document.getElementById('feedback');

// Actualizar longitud mostrada cuando cambia el slider
passwordLength.addEventListener('input', function() {
    lengthValue.textContent = this.value;
});

// Función principal para generar la contraseña
function generatePassword() {
    const length = parseInt(passwordLength.value);
    let characters = '';

    // Construir el conjunto de caracteres disponibles basado en las opciones seleccionadas
    if (useUppercase.checked) {
        characters += UPPERCASE;
    }
    if (useLowercase.checked) {
        characters += LOWERCASE;
    }
    if (useNumbers.checked) {
        characters += NUMBERS;
    }
    if (useSymbols.checked) {
        characters += SYMBOLS;
    }

    // Validar que al menos un tipo de carácter esté seleccionado
    if (characters.length === 0) {
        alert('Por favor, selecciona al menos un tipo de carácter');
        return;
    }

    // Generar la contraseña aleatoria
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    // Mostrar la contraseña generada
    passwordOutput.textContent = password;
    
    // Actualizar el indicador de fortaleza
    updateStrength(password);
    
    // Limpiar el mensaje de feedback
    clearFeedback();
}

// Función para calcular y mostrar la fortaleza de la contraseña
function updateStrength(password) {
    let score = 0;

    // Puntos por longitud
    if (password.length >= 8) {
        score += 25;
    }
    if (password.length >= 12) {
        score += 25;
    }
    if (password.length >= 16) {
        score += 25;
    }

    // Puntos por diversidad de caracteres
    if (/[a-z]/.test(password)) {
        score += 8;
    }
    if (/[A-Z]/.test(password)) {
        score += 8;
    }
    if (/[0-9]/.test(password)) {
        score += 8;
    }
    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
        score += 8;
    }

    // Limitar puntuación a 100
    score = Math.min(score, 100);

    // Actualizar la barra de fortaleza
    strengthBar.style.width = score + '%';

    // Determinar el nivel de fortaleza
    let level = '';
    let className = '';

    if (score < 35) {
        level = 'Débil';
        className = 'weak';
        strengthBar.style.backgroundColor = '#ff6b6b';
    } else if (score < 65) {
        level = 'Medio';
        className = 'medium';
        strengthBar.style.backgroundColor = '#ffa500';
    } else {
        level = 'Fuerte';
        className = 'strong';
        strengthBar.style.backgroundColor = '#51cf66';
    }

    // Actualizar el texto de fortaleza
    strengthText.className = 'strength-text ' + className;
    strengthText.textContent = 'Fortaleza: ' + level + ' (' + score + '%)';
}

// Función para copiar la contraseña al portapapeles
copyBtn.addEventListener('click', function() {
    const password = passwordOutput.textContent;

    // Validar que haya una contraseña generada
    if (password === 'Presiona generar') {
        alert('Por favor, genera una contraseña primero');
        return;
    }

    // Copiar al portapapeles usando la API moderna
    navigator.clipboard.writeText(password).then(function() {
        // Cambiar el texto del botón como feedback
        copyBtn.textContent = '✓ Copiado';
        
        // Mostrar mensaje de confirmación
        showFeedback('Contraseña copiada al portapapeles');
        
        // Restaurar el botón después de 2 segundos
        setTimeout(function() {
            copyBtn.textContent = 'Copiar';
        }, 2000);
    }).catch(function(err) {
        alert('Error al copiar la contraseña: ' + err);
    });
});

// Función para mostrar mensaje de feedback
function showFeedback(message) {
    feedback.textContent = message;
    feedback.style.color = '#51cf66';
}

// Función para limpiar el feedback
function clearFeedback() {
    feedback.textContent = '';
}

// Listeners para generar contraseña automáticamente al cambiar opciones
generateBtn.addEventListener('click', generatePassword);
useUppercase.addEventListener('change', generatePassword);
useLowercase.addEventListener('change', generatePassword);
useNumbers.addEventListener('change', generatePassword);
useSymbols.addEventListener('change', generatePassword);
passwordLength.addEventListener('change', generatePassword);

// Generar contraseña inicial al cargar la página
window.addEventListener('load', generatePassword);