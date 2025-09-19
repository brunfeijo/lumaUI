// cypress/pageObjects/dynamicProperties.ts
export class DynamicPropertiesPage {
    assertColorChangeInitial(): void {
      cy.get('#colorChange')
        .invoke('attr', 'class')
        .then((cls) => {
          expect(cls).to.eq('mt-4 btn btn-primary');
        })
        .then(() => cy.log('✅ Initial class OK (no text-danger)'));
    }
  
    assertColorChangeFinal(): void {
      cy.get('#colorChange')
        .invoke('attr', 'class')
        .then((cls) => {
          expect(cls).to.eq('mt-4 text-danger btn btn-primary');
        })
        .then(() => cy.log('✅ Final class OK (text-danger added)'));
    }
  
    verifyEnableAfterButton(): void {
      cy.get('#enableAfter').should('be.disabled');
      cy.tick(6000); // advance to enable
      cy.get('#enableAfter').should('be.enabled');
    }
  
    // ✅ Only assert AFTER advancing 6s (no initial not-visible check here)
    verifyVisibleAfterButton(): void {
      cy.tick(6000);
      cy.get('#visibleAfter').should('be.visible');
    }
  }
  