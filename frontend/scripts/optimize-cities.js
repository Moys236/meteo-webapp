const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'city.list.json');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'cities-optimized.json');

console.log('Lecture du fichier original...');
const rawData = fs.readFileSync(inputPath, 'utf8');
const cities = JSON.parse(rawData);

console.log(`Traitement de ${cities.length} villes...`);


const optimized = cities.map(c => `${c.name}|${c.country}`);

optimized.sort();

// On retire les doublons exacts (même nom et même pays)
const uniqueOptions = [...new Set(optimized)];

console.log(`Nombre de villes après optimisation : ${uniqueOptions.length}`);

fs.writeFileSync(outputPath, JSON.stringify(uniqueOptions));
console.log(`Fichier optimisé sauvegardé dans : ${outputPath}`);
console.log(`Taille finale estimée : ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
