const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Banco de dados simulado [cite: 27]
const users = [
    { email: "teste@ulbra.br", password: "123" }
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Sucesso: Retorna status 200 [cite: 29]
        res.status(200).json({ message: "Login efetuado com sucesso!" });
    } else {
        // Falha: Retorna status 401 [cite: 30]
        res.status(401).json({ message: "Credenciais inválidas" });
    }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));