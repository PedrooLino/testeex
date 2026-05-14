
class PasswordModel {
  static RULES = {
    MIN_LENGTH: {
      id: "minLength",
      label: "Mínimo de 8 caracteres",
      validate: (pwd) => pwd.length >= 8,
    },
    HAS_UPPERCASE: {
      id: "hasUppercase",
      label: "Pelo menos uma letra maiúscula",
      validate: (pwd) => /[A-Z]/.test(pwd),
    },
    HAS_LOWERCASE: {
      id: "hasLowercase",
      label: "Pelo menos uma letra minúscula",
      validate: (pwd) => /[a-z]/.test(pwd),
    },
    HAS_NUMBER: {
      id: "hasNumber",
      label: "Pelo menos um número",
      validate: (pwd) => /[0-9]/.test(pwd),
    },
    HAS_SPECIAL: {
      id: "hasSpecial",
      label: "Pelo menos um caractere especial (!@#$%^&*)",
      validate: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    },
    NO_SPACES: {
      id: "noSpaces",
      label: "Não pode conter espaços em branco",
      validate: (pwd) => !/\s/.test(pwd),
    },
  };

  /**
   * Valida a senha contra todas as regras.
   * @param {string} password
   * @returns {{ isValid: boolean, errors: string[], results: Object[] }}
   */
  validate(password) {
    if (typeof password !== "string") {
      throw new TypeError("A senha deve ser uma string.");
    }

    const results = Object.values(PasswordModel.RULES).map((rule) => ({
      id: rule.id,
      label: rule.label,
      passed: rule.validate(password),
    }));

    const errors = results
      .filter((r) => !r.passed)
      .map((r) => r.label);

    return {
      isValid: errors.length === 0,
      errors,
      results,
    };
  }

  /**
   * Calcula a força da senha (0–100).
   * @param {string} password
   * @returns {number}
   */
  getStrength(password) {
    if (!password) return 0;
    const { results } = this.validate(password);
    const passed = results.filter((r) => r.passed).length;
    return Math.round((passed / results.length) * 100);
  }
}

module.exports = PasswordModel;
