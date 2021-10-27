let validador = {
    handleSubmit: (event) => {
        event.preventDefault();
        let enviar = true;

        let entradas = form.querySelectorAll('input');

        validador.clearErrors();

        for (let i = 0; i < entradas.length; i++) {
            let input = entradas[i];
            let check = validador.checkInput(input);
            if (check !== true) {
                enviar = false;
                validador.showError(input, check);
            }
        }

        if (enviar) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let regras = input.getAttribute('data-rules');

        if (regras !== null) {
            regras = regras.split('|');
            for (let k in regras) {
                let rDetails = regras[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Este campo é obrigatório!';
                        }
                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Digite pelo menos ' + rDetails[1] + ' caracteres.';
                        }
                        break;
                    case 'email':
                        if (input.value != '') {
                            let regex = /\S+@\S+\.\S+/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'Preencha com um e-mail válido';
                            }
                        }
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = "red";

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.valida');
form.addEventListener('submit', validador.handleSubmit);