describe('Fluxo de Autenticação', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/frontend/index.html'); // Utilizando a baseUrl configurada no cypress.config.js
  });

  it('1. Login com sucesso', () => {
    cy.get('#email').type('teste@ulbra.br');
    cy.get('#password').type('123');
    cy.get('#btn-entrar').click();
    cy.url().should('include', '/home.html');
    cy.contains('Login efetuado com sucesso!').should('be.visible');
  });

  it('2. Login com erro', () => {
    cy.get('#email').type('errado@ulbra.br');
    cy.get('#password').type('000');
    cy.get('#btn-entrar').click();
    cy.url().should('not.include', '/home.html');
    cy.contains('Credenciais inválidas').should('be.visible');
  });

  it('3. Botão desabilitado', () => {
    cy.get('#btn-entrar').should('be.disabled');
    cy.get('#email').type('teste@ulbra.br');
    cy.get('#btn-entrar').should('be.disabled');
    cy.get('#password').type('123');
    cy.get('#btn-entrar').should('not.be.disabled');
  });

  it('4. Campos obrigatórios', () => {
    // Força o foco no campo de email e depois sai sem digitar nada
    cy.get('#email').focus().blur();
    cy.contains('O campo E-mail é obrigatório.').should('be.visible');

    // Preenche o email para limpar o erro, vai para a senha e sai sem digitar nada
    cy.get('#email').type('teste@ulbra.br');
    cy.get('#password').focus().blur();
    cy.contains('O campo Senha é obrigatório.').should('be.visible');
  });
});