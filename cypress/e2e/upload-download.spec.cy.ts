import { LandingPage } from '../pageObjects/LandingPage';
import { ElementsPage } from '../pageObjects/ElementsPage';
import { UploadDownloadPage } from '../pageObjects/UploadDownload';

describe('Upload & Download — download → verify → upload same file', () => {
    const landing = new LandingPage();
    const elements = new ElementsPage();
    const updown = new UploadDownloadPage();

    beforeEach(() => {
        cy.blockAds();
        updown.cleanDownloads();

        cy.visit('/');  
        landing.clickElementsButton();
        elements.clickUpandDownloadLeftMenu(); 
    });

    it('downloads, verifies, uploads, and verifies', () => {
        updown.clickDownload();
        updown.verifyDownloaded();

        updown.uploadDownloaded();
        updown.verifyUploaded();
    });
});
