const uuid = require('uuid')

const sectors = [
  'Finance',
  'Technology',
  'Oil',
  'Household',
  'Transport',
  'Catering',
  'Health',
  'Tourism',
  'Informatics',
  'Mining',
]

const regions = [
  'Europe',
  'North America',
  'South America',
  'Africa',
  'South Asia',
  'East Asia',
  'Antarctic',
  'Arctic',
]

const pe = [
  '0 - 9.9',
  '10 - 19.9',
  '20 - 29.9',
  '30 - 39.9',
  '40 - 49.9',
  '50 +'
]

const uuidArray = [...new Array(100)].map(() => uuid())

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const names = uuidArray.map(u =>
  [...new Array(3)].map(() => alphabet[Math.floor(Math.random() * alphabet.length)]).join('').toUpperCase()
);

const assets = uuidArray.map((u,i) => (
  {
    id: u,
    name: `${names[i]}`,
    sector: sectors[Math.floor(Math.random() * sectors.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    pe: pe[Math.floor(Math.random() * pe.length)],
    price: Math.floor(Math.random() * 20000) / 10000,
  }
));

module.exports = assets
