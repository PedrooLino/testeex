
class PasswordController {
  
   @param {import('../model/PasswordModel')} model
   @param {import('../view/PasswordView')} view
   
  constructor(model, view) {
    if (!model) throw new Error("Model é obrigatório.");
    if (!view) throw new Error("View é obrigatória.");
    this.model = model;
    this.view = view;
  }

   de 
   @param {string} password
   
  handleValidation(password) {
    try {
      const validationResult = this.model.validate(password);
      const strength = this.model.getStrength(password);
      this.view.render({ ...validationResult, strength, password });
    } catch (error) {
      this.view.renderError(error.message);
    }
  }

  
  handleReset() {
    this.view.renderReset();
  }
}

module.exports = PasswordController;
