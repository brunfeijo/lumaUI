import * as fs from 'fs';
import * as path from 'path';

const reportsDir = 'cypress/reports';

if (fs.existsSync(reportsDir)) {
    const files = fs.readdirSync(reportsDir);
    files.forEach(file => {
        const filePath = path.join(reportsDir, file);
        if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
        }
    });
    console.log('Cleaned up old reports');
} else {
    fs.mkdirSync(reportsDir, { recursive: true });
    console.log('Created reports directory');
}