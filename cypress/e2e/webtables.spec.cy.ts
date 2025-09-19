import { LandingPage } from '../pageObjects/LandingPage';
import { ElementsPage } from '../pageObjects/ElementsPage';
import { WebTablesPage } from '../pageObjects/WebTables';

describe('Landing page navigation and Web Tables', () => {
    const landingPage = new LandingPage();
    const elementsPage = new ElementsPage();
    const webTablesPage = new WebTablesPage();

    beforeEach(() => {
        cy.blockAds();
        cy.visit('/');
    });

    it('adds a user, validates it, deletes it, and validates it is gone', () => {
        landingPage.clickElementsButton();
        elementsPage.clickWebTablesLeftMenu();

        webTablesPage.addUser();
        webTablesPage.search(webTablesPage.user.email);
        webTablesPage.verifyRowVisibleByEmail(webTablesPage.user.email);

        webTablesPage.deleteRowByEmail(webTablesPage.user.email);
        webTablesPage.verifyRowNotPresentByEmail(webTablesPage.user.email);
    });

    it('adds 12 users and navigates between pages (10 rows per page)', () => {
        landingPage.clickElementsButton();
        elementsPage.clickWebTablesLeftMenu();

        // make sure we’re on 10 rows per page
        webTablesPage.setRowsPerPage(10);

        // add 12 random users 
        webTablesPage.addNRandomUsers(12);

        // Validate there are 2 total pages
        webTablesPage.verifyTotalPages(2);

        // Page 1
        webTablesPage.verifyCurrentPage(1);
        webTablesPage.verifyHasRowsOnPage();

        // Navigate forward to page 2
        webTablesPage.nextPage();
        webTablesPage.verifyCurrentPage(2);
        webTablesPage.verifyHasRowsOnPage();

        // Navigate back to page 1
        webTablesPage.prevPage();
        webTablesPage.verifyCurrentPage(1);
        webTablesPage.verifyHasRowsOnPage();
    });
});
