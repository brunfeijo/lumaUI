// cypress/support/e2e.ts
import './commands';  // 👈 this line is required

// (optional) ignore noisy cross-origin script errors
Cypress.on('uncaught:exception', (err) => {
  if (err.message?.includes('Script error')) return false;
});
