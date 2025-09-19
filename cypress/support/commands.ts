// cypress/support/commands.ts
Cypress.Commands.add('blockAds', () => {
  const blocked = [/googlesyndication/, /doubleclick/, /adservice/, /taboola/, /adnxs/];
  blocked.forEach((pattern) => {
    cy.intercept({ url: pattern }, { statusCode: 204, body: '' });
  });
});
