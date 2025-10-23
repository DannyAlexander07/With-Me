// Ubicacion: app/formulario.js
// --- Script para la validación del formulario ---
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');
    const inputs = formulario.querySelectorAll('input, textarea, select');
    const checkboxAcepto = document.getElementById('acepto');
    const labelAcepto = document.querySelector('label[for="acepto"]');

    const mostrarError = (campo, mensaje) => {
        campo.style.borderColor = 'red';
        campo.dataset.error = mensaje;
    };

    const mostrarErrorCheckbox = () => {
        checkboxAcepto.style.borderColor = 'red';
        labelAcepto.style.color = 'red';
    };

    const limpiarError = (campo) => {
        campo.style.borderColor = '';
        delete campo.dataset.error;
    };

    const limpiarErrorCheckbox = () => {
        checkboxAcepto.style.borderColor = '';
        labelAcepto.style.color = '';
    };

    const validarCampo = (campo) => {
        const valor = campo.value.trim();

        if (campo.id === 'nombre' || campo.id === 'apellido') {
            if (valor === '') {
                mostrarError(campo, 'Este campo es obligatorio');
                return false;
            }
            limpiarError(campo);
            return true;
        }

        if (campo.id === 'correo') {
            const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!regexEmail.test(valor)) {
                mostrarError(campo, 'Por favor ingresa un correo válido');
                return false;
            }
            limpiarError(campo);
            return true;
        }

        if (campo.id === 'celular') {
            const regexTel = /^[0-9]{9}$/;
            if (!regexTel.test(valor)) {
                mostrarError(campo, 'El número debe ser de 9 dígitos');
                return false;
            }
            limpiarError(campo);
            return true;
        }

        if (campo.id === 'empresa') {
            if (valor === '') {
                mostrarError(campo, 'Por favor ingresa el nombre de tu empresa');
                return false;
            }
            limpiarError(campo);
            return true;
        }

        if (campo.id === 'select') {
            if (campo.value === "Servicios") {
                mostrarError(campo, 'Por favor selecciona un servicio');
                return false;
            }
            limpiarError(campo);
            return true;
        }

        if (campo.id === 'mensaje') {
            if (valor === '') {
                mostrarError(campo, 'Este campo es obligatorio');
                return false;
            }
            limpiarError(campo);
            return true;
        }

        return true;
    };

    const validarAcepto = () => {
        if (!checkboxAcepto.checked) {
            mostrarErrorCheckbox();
            return false;
        }
        limpiarErrorCheckbox();
        return true;
    };

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        let formIsValid = true;

        inputs.forEach(campo => {
            if (!validarCampo(campo)) {
                formIsValid = false;
            }
        });

        if (!validarAcepto()) {
            formIsValid = false;
        }

        if (formIsValid) {
            formulario.submit();
        }
    });

    inputs.forEach(campo => {
        campo.addEventListener('input', () => {
            validarCampo(campo);
        });
    });

    checkboxAcepto.addEventListener('change', () => {
        validarAcepto();
    });
});
