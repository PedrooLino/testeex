
class PasswordView {
  
   @param {{ isValid: boolean, errors: string[], results: Object[], strength: number, password: string }} data
   
  render({ isValid, errors, results, strength, password }) {
    const masked = "*".repeat(password.length);
    console.log("\n══════════════════════════════════════════");
    console.log(`  Senha: ${masked}`);
    console.log(`  Força: ${this._strengthBar(strength)} ${strength}%`);
    console.log("──────────────────────────────────────────");

    results.forEach((rule) => {
      const icon = rule.passed ? "✅" : "❌";
      console.log(`  ${icon} ${rule.label}`);
    });

    console.log("──────────────────────────────────────────");
    if (isValid) {
      console.log("  ✔ Senha VÁLIDA — Critérios atendidos.");
    } else {
      console.log("  ✘ Senha INVÁLIDA — Erros encontrados:");
      errors.forEach((e) => console.log(`     • ${e}`));
    }
    console.log("══════════════════════════════════════════\n");

    return { isValid, errors, results, strength };
  }

  

   @param {string} message
   
  renderError(message) {
    console.error(`\n[ERRO] ${message}\n`);
    return { error: message };
  }

  
  renderReset() {
    console.log("\n[INFO] Formulário limpo.\n");
    return { reset: true };
  }

  
   @param {number} strength 0–100
   @returns {string}
   
  _strengthBar(strength) {
    const filled = Math.round(strength / 10);
    return "█".repeat(filled) + "░".repeat(10 - filled);
  }
}

module.exports = PasswordView;
