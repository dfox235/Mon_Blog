const THEME = 'theme';

function getSavedTheme() {
  const stored = localStorage.getItem(THEME);
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function theme_blog() {
  return {
    theme: getSavedTheme(),

    switchTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      setTheme(this.theme);
      localStorage.setItem(THEME, this.theme);
    }
  };
}

function contactForm() { 
  return { 
    ...theme_blog(),
    nom: '', 
    email: '', 
    message: '', 
    errors: {}, 
    successMessage: '', 

    validateEmail(email) { 
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      return regex.test(email); 
    }, 

    submit() { 
      this.errors = {}; 
      this.successMessage = ''; 

      if (!this.nom.trim()) this.errors.nom = "Entrez votre nom"; 
      if (!this.validateEmail(this.email)) this.errors.email = "Adresse email invalide."; 
      if (!this.message.trim()) this.errors.message = "Le message ne peut pas être vide."; 

      if (Object.keys(this.errors).length === 0) { 
        this.successMessage = "✅ Message envoyé avec succès !"; 
        this.nom = ''; 
        this.email = ''; 
        this.message = ''; 
      } 
    } 
  }; 
}
