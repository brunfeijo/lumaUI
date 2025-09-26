import { LandingPage } from "../pageObjects/LandingPage";
import { PracticeFormPage } from "../pageObjects/PracticeForm";

describe("Forms — Practice Form", () => {
  const landing = new LandingPage();
  const form = new PracticeFormPage();

  beforeEach(() => {
    cy.blockAds();
    cy.visit("/");
    landing.clickFormsButton();
    landing.clickPracticeFormInsideForms();
  });

  it("shows required validation when submitting empty form", () => {
    form.submitEmptyAndAssertRequireds();
  });

  it("fills with faker, selects subject from list, hobby Music, NCR→Delhi, then submits", () => {
    form.fillWithFakerThenSubmit();
  });
});
