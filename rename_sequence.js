const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'sequence');

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    // Filter for png files and sort them to ensure order
    const images = files.filter(f => f.endsWith('.png')).sort();

    images.forEach((file, index) => {
        // New name: 0001.png, 0002.png, ...
        // index is 0-based, so we add 1.
        const newName = String(index + 1).padStart(4, '0') + ".png";
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, newName);

        fs.rename(oldPath, newPath, (err) => {
            if (err) console.error(`Error renaming ${file} to ${newName}`, err);
            else console.log(`Renamed ${file} to ${newName}`);
        });
    });
});
