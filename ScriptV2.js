document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const correo = document.getElementById('correo');
    const contrasena = document.getElementById('contrasena');
    const repetirContrasena = document.getElementById('repetir-contrasena');

    form.addEventListener('submit', function (e) {
        let valid = true;
        let mensajes = [];

        // Validación de correo
        const correoRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!correoRegex.test(correo.value)) {
            valid = false;
            mensajes.push('El correo electrónico no es válido.');
        }

        // Validación de contraseña (mínimo 6 caracteres)
        if (contrasena.value.length < 6) {
            valid = false;
            mensajes.push('La contraseña debe tener al menos 6 caracteres.');
        }

        // Validación de repetir contraseña
        if (contrasena.value !== repetirContrasena.value) {
            valid = false;
            mensajes.push('Las contraseñas no coinciden.');
        }

        // Mostrar mensajes de error
        let errorDiv = document.getElementById('errores');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'errores';
            errorDiv.style.color = '#ff4d4d';
            errorDiv.style.marginBottom = '16px';
            errorDiv.style.textAlign = 'center';
            form.prepend(errorDiv);
        }
        errorDiv.innerHTML = mensajes.join('<br>');

        if (!valid) {
            e.preventDefault();
        }
    });

    // Responsividad: mostrar errores en tiempo real
    [correo, contrasena, repetirContrasena].forEach(input => {
        input.addEventListener('input', () => {
            errorDiv.innerHTML = '';
        });
    });
});
