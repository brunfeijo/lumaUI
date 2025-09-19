export class ElementsPage {

    clickWebTablesLeftMenu(): void {
        cy.get('#item-3').should('be.visible').click();
    }

    clickDynamicPropertiesLeftMenu(): void {
        cy.get('#item-8').should('be.visible').click();
    }

    clickUpandDownloadLeftMenu(): void {
        cy.get('#item-7').should('be.visible').click();
    }

    clickPracticeFormsLeftMenu(): void {
        cy.get('#item-7').should('be.visible').click();
    }

    

}
