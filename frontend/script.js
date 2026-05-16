const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnEntrar = document.getElementById('btn-entrar');
const mensagem = document.getElementById('mensagem');

const validarCampos = () => {
    // Lógica do botão desabilitado (Requisito do projeto)
    btnEntrar.disabled = !(emailInput.value.trim() && passwordInput.value.trim());

    // Validação visual de campos obrigatórios
    if (emailInput.value.trim() === "" && emailInput.hadFocus) {
        mensagem.innerText = "O campo E-mail é obrigatório.";
        return;
    }
    if (passwordInput.value.trim() === "" && passwordInput.hadFocus) {
        mensagem.innerText = "O campo Senha é obrigatório.";
        return;
    }
    
    // Limpa a mensagem se estiver tudo certo
    mensagem.innerText = "";
};

// Marca que o usuário já interagiu com o campo (para não disparar o erro assim que abrir a página)
emailInput.addEventListener('blur', () => { emailInput.hadFocus = true; validarCampos(); });
passwordInput.addEventListener('blur', () => { passwordInput.hadFocus = true; validarCampos(); });

emailInput.addEventListener('input', validarCampos);
passwordInput.addEventListener('input', validarCampos);

btnEntrar.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.value, password: passwordInput.value })
    });

    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem('msgSucesso', data.message);
        window.location.href = 'home.html';
    } else {
        mensagem.innerText = data.message;
    }
});