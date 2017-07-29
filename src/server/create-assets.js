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

const PE = [
  '0 - 9.9',
  '10 - 19.9',
  '20 - 29.9',
  '30 - 39.9',
  '40 - 49.9',
  '50 +'
]

const uuidArray = [...new Array(100)].map(() => uuid())

const names = uuidArray.map(u => u.slice(0,6));

const assets = uuidArray.map((u,i) => (
  {
    id: u,
    name: `Asset ${names[i]}`,
    sector: sectors[Math.floor(Math.random() * sectors.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    PE: PE[Math.floor(Math.random() * PE.length)],
    price: Math.floor(Math.random() * 20000) / 10000,
  }
));

module.exports = assets
