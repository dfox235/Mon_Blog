// gestion du formulaire de contact
function contactForm() { 
  return { 
    ...theme_blog(),
       nom: '', 
       email: '', 
       message: '', 
       errors: {}, 
       successMessage: '', 
 
       init() { 
         this.theme = getSavedTheme();
         setTheme(this.theme);
       }, 
       validateEmail(email) { 
         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
         return regex.test(email); 
       }, 
       submit() { 
         this.errors = {}; 
         this.successMessage = ''; 
          if (!this.nom.trim()) { 
           this.errors.nom = "Entrez votre nom"; 
          }
          if (!this.validateEmail(this.email)) { 
            this.errors.email = "Adresse email invalide."; 
          }  
          if (!this.message.trim()) { 
            this.errors.message = "Le message ne peut pas être vide."; 
          } 
          if (Object.keys(this.errors).length === 0) { 
            // Simuler l'envoi 
            this.successMessage = "✅ Message envoyé avec succès !"; 
            this.nom = ''; 
            this.email = ''; 
            this.message = ''; 
          } 
        } 
      } 
    }


// gestion du thème (clair / sombre)
const THEME = 'theme';

function getSavedTheme() {
  const stored = localStorage.getItem(THEME);
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function setTheme(theme) {document.documentElement.setAttribute('data-theme', theme);}

function theme_blog() {
  return {
    theme: getSavedTheme(),

    init() {
      setTheme(this.theme);
    },

    switchTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      setTheme(this.theme);
      localStorage.setItem('theme', this.theme);
    }
  };
}





