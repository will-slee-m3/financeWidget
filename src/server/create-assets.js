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

const uuidArray = [...new Array(10)].map(() => uuid())

const names = uuidArray.map(u => u.slice(0,6));

const assets = uuidArray.map((u,i) => (
  {
    id: u,
    name: `Asset ${names[i]}`,
    sector: sectors[Math.floor(Math.random() * sectors.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    price: Math.floor(Math.random() * 20000) / 10000,
  }
));

module.exports = assets
