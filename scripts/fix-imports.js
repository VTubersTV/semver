import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function processDirectory(dir) {
    const files = readdirSync(dir);

    for (const file of files) {
        const fullPath = join(dir, file);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js')) {
            const content = readFileSync(fullPath, 'utf8');
            const updatedContent = content.replace(
                /from ['"](\.[^'"]+)['"]/g,
                (match, p1) => `from '${p1}.js'`
            );
            writeFileSync(fullPath, updatedContent);
        }
    }
}

processDirectory('dist');
