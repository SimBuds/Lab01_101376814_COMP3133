const fs = require('fs');
const csv = require('csv-parser');

const canadaFilePath = 'canada.txt';
const usaFilePath = 'usa.txt';

const deleteFileIfExists = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

deleteFileIfExists(canadaFilePath);
deleteFileIfExists(usaFilePath);

const writeToFile = (filePath, data) => {
    fs.appendFileSync(filePath, data + '\n');
};

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            writeToFile(canadaFilePath, JSON.stringify(row));
        } else if (row.country === 'United States') {
            writeToFile(usaFilePath, JSON.stringify(row));
        }
    })
    .on('end', () => {
        console.log('CSV has been processed successfully.');
    });