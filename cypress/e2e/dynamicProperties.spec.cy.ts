// cypress/e2e/dynamic-properties.spec.cy.ts
import { LandingPage } from '../pageObjects/LandingPage';
import { ElementsPage } from '../pageObjects/ElementsPage';
import { DynamicPropertiesPage } from '../pageObjects/DynamicProperties';

describe('Dynamic Properties via menus only', () => {
    const landing = new LandingPage();
    const elements = new ElementsPage();
    const dynamicPage = new DynamicPropertiesPage();

    beforeEach(() => {
        cy.visit("/")
        cy.blockAds();
        cy.clock();                     // freeze timers
        landing.clickElementsButton();
        elements.clickDynamicPropertiesLeftMenu();
    });

    it('verifies dynamic behaviors deterministically', () => {
        dynamicPage.assertColorChangeInitial();
        dynamicPage.verifyEnableAfterButton();
        dynamicPage.assertColorChangeFinal();
        dynamicPage.verifyVisibleAfterButton();
    });
});
