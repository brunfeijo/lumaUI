
export class LandingPage {

    get elementsButton() {
        return cy.contains('.card-body h5', 'Elements').should('be.visible');
    }

    get formsButton() {
        return cy.contains('.card-body h5', 'Forms').should('be.visible');
    }


    clickElementsButton(): void {
        this.elementsButton.click();
    }

    clickFormsButton(): void {
        this.formsButton.click();
    }


    clickFormsGiantButton(): void {
        cy.contains('.header-wrapper .header-text', /^Forms$/)
            .should('be.visible')
            .scrollIntoView()
            .closest('.header-wrapper')
            .click({ force: true });
    }


    clickPracticeFormInsideForms(): void {
        cy.contains('.element-list .menu-list li', 'Practice Form')
            .should('be.visible')
            .click({ force: true });
    }


}
