document.addEventListener("DOMContentLoaded", function () {
    // Validación del formulario
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            let isFormValid = true; // Variable para verificar si el formulario es válido

            // validaciones especiales

            // validación personalizada del email
            const emailField = form.querySelector('#email');
            const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?/;
            if (!emailPattern.test(emailField.value)) {
                emailField.classList.add('is-invalid');
                emailField.classList.remove('is-valid');
                isFormValid = false;
            } else {
                emailField.classList.remove('is-invalid');
                emailField.classList.add('is-valid');
            }

            // validación personalizada del teléfono
            const phoneField = form.querySelector('#phone');
            const phonePattern = /^[0-9]{8}$/;
            if (phoneField.value && !phonePattern.test(phoneField.value)) {
                phoneField.classList.add('is-invalid');
                phoneField.classList.remove('is-valid');
                isFormValid = false;
            } else {
                phoneField.classList.remove('is-invalid');
                phoneField.classList.add('is-valid');
            }

            

            // checar todos los campos segun reglas html
            if (!form.checkValidity()) {
                // evitar que se envie si ha fallado una verifiacion
                event.preventDefault();
                event.stopPropagation();
            } else if (isFormValid) {
                event.preventDefault();
                const formData = new FormData(form);
                const json = {};
                // convertir a json
                formData.forEach((value, key) => { json[key] = value; });

                // Mostrar el JSON generado en la página
                document.getElementById('jsonOutput').innerHTML = 
                `<pre>${syntaxHighlight(JSON.stringify(json, null, 2))}</pre>`;

                // diferenciar parametro y valor por colores
                function syntaxHighlight(json) {
                    return json.replace(/"(.*?)":/g, function(match, p1) {
                        return `<span style="color: #E65400;">"${p1}":</span>`;  // Color para las propiedades
                    })
                }

                // Enviar el JSON al API
                fetch('http://localhost:5183/api/miinfo/mi-info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(json), // Pasar el JSON como el cuerpo de la solicitud
                })
                .then(response => response.json()) // Suponiendo que la respuesta es en JSON
                .then(data => {
                    console.log('latitud:', data.latitud);
                    console.log('longitud:', data.longitud);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            form.classList.add('was-validated');
        }, false);
    });
});
