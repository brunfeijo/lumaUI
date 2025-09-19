// cypress/pageObjects/uploadDownload.ts
export class UploadDownloadPage {
    readonly downloadsDir = 'cypress/downloads';
    readonly fileName = 'sampleFile.jpeg';
    readonly fileGlob = `${this.downloadsDir}/sampleFile*.jpeg`;
    readonly filePath = `${this.downloadsDir}/${this.fileName}`;
  
    cleanDownloads(): void {
      cy.task('deleteByGlob', this.fileGlob);
    }
  
    clickDownload(): void {
      cy.get('#downloadButton').should('be.visible').click();
    }
  
    verifyDownloaded(): void {
      cy.readFile(this.filePath, { timeout: 15000 }).should('exist');
    }
  
    uploadDownloaded(): void {
      cy.get('#uploadFile').should('exist').selectFile(this.filePath, { force: true });
    }
  
    verifyUploaded(): void {
      cy.get('#uploadedFilePath').should('be.visible').and('contain', this.fileName);
    }
  }
  