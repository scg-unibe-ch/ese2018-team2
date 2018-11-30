// https://en.wikipedia.org/wiki/List_of_buzzwords
const data = {
  prefixes: [
    "Lead",
    "Senior",
    "Direct",
    "Corporate",
    "Dynamic",
    "Future",
    "Product",
    "National",
    "Regional",
    "District",
    "Central",
    "Global",
    "Relational",
    "Customer",
    "Investor",
    "Dynamic",
    "International",
    "Legacy",
    "Forward",
    "Interactive",
    "Internal",
    "Human",
    "Chief",
    "Principal",
    "Academic"
  ],
  words: [
    "Human Resources",
    "Solution",
    "Marketing",
    "Analytics",
    "Brand",
    "Client-centric",
    "Employer branding",
    "Enterprise",
    "Creative",
    "Granular",
    "Quick win",
    "Visibility",
    "Cloud",
    "SAAS",
    "Microservices",
    "End-to-end",
    "Data science",
    "Engineering",
    "Web"
  ],
  suffixes: [
    "Architect",
    "Ninja",
    "Unicorn",
    "Engineer",
    "Representative",
    "Manager",
    "Developer",
    "Monkey"
  ]
};

const rand = (start: number, end: number) =>
  Math.floor(Math.random() * end + start);

const choose = (from: string[]) =>
  from[Math.floor(Math.random() * from.length)];

export const generateTitle = () => {
  const titleLength = 7;
  const p = rand(1, 3);
  const w = rand(1, titleLength - p - 2);
  const s = rand(1, titleLength - p - w);

  let words: Array<string> = [];

  for (let i = 0; i < p; i++) {
    words.push(choose(data.prefixes.filter(e => words.indexOf(e) === -1)));
  }

  for (let i = 0; i < w; i++) {
    words.push(choose(data.words.filter(e => words.indexOf(e) === -1)));
  }

  for (let i = 0; i < s; i++) {
    words.push(choose(data.suffixes.filter(e => words.indexOf(e) === -1)));
  }

  return words
    .map((e, i) => (i === 0 ? e : e.toLowerCase()))
    .reduce((acc, e) => `${acc} ${e}`, "");
};

export default generateTitle;
