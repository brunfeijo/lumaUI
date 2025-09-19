// cypress.config.ts
import { defineConfig } from 'cypress';
import fs from 'fs';
import { globSync } from 'glob';

export default defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    supportFile: 'cypress/support/e2e.ts',
    downloadsFolder: 'cypress/downloads',
    experimentalModifyObstructiveThirdPartyCode: true,

    setupNodeEvents(on, config) {
      on('task', {
        // delete a single file if it exists
        deleteFileIfExists(filePath: string) {
          try {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            return true;
          } catch {
            return false;
          }
        },

        // delete files by glob pattern, e.g. "cypress/downloads/sampleFile*.jpeg"
        deleteByGlob(pattern: string) {
          try {
            const matches = globSync(pattern);
            for (const f of matches) {
              try { fs.unlinkSync(f); } catch { /* ignore */ }
            }
            return matches.length; // number of files removed
          } catch {
            return 0;
          }
        },
      });

      return config;
    },
  },
});
