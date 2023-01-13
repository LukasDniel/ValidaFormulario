class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');

        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const isValid = this.isValid();
        const senhasValidas = this.senhasValid();

        if (isValid && senhasValidas) {
            alert('Formulario enviado');
            this.formulario.submit()
        }
    }

    senhasValid() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.rptSenha');

        if (senha.value !== repetirSenha.value) {
            valid = false;
            this.createError(senha, 'Campo Senha e Repetir Senha precisam ser iguais')
            this.createError(repetirSenha, 'Campo Senha e Repetir Senha precisam ser iguais')
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.createError(senha, 'Senha precisa conter entre 6 e 12 caracteres')
        }

        return valid;
    }

    isValid() {
        let valid = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;
            if (!campo.value) {
                this.createError(campo, `Campo "${label.toUpperCase()}" não pode estar em branco`)
                valid = false
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valid = false;
            }

            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false
            }
        }
        return valid;
    }

    validaUsuario(campo) {
        let valid = true;
        const usuario = campo.value;

        if (usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Usuário precisa ter entre 3 e 12 caracteres');
            valid = false
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(campo, 'Nome de usuário deve conter apenas letras ou numeros');
            valid = false
        }

        return true;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value)

        if (!cpf.valida()) {
            this.createError(campo, 'CPF inválido');
            return false
        }

        return true
    }

    createError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario()