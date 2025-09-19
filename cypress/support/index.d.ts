// cypress/support/index.d.ts
declare namespace Cypress {
    interface Chainable {
      /**
       * Blocks common ad/analytics hosts to prevent cross-origin script errors
       */
      blockAds(): Chainable<void>;
    }
  }
  