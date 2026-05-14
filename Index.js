

const PasswordModel = require("./model/PasswordModel");
const PasswordView = require("./view/PasswordView");
const PasswordController = require("./controller/PasswordController");

const model = new PasswordModel();
const view = new PasswordView();
const controller = new PasswordController(model, view);


const senhas = [
  "abc",               // fraca demais
  "abcdefgh",          // sem maiúscula, número e especial
  "Abcdefgh",          // sem número e especial
  "Abcdefg1",          // sem caractere especial
  "Abcdefg1!",         // válida ✅
  "Senh@F0rte!",       // válida ✅
  "senha com espaço1A@",  // com espaço
];

senhas.forEach((senha) => controller.handleValidation(senha));

module.exports = { PasswordModel, PasswordView, PasswordController };
