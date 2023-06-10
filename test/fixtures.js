import { db } from "../src/models/db.js";

export const serviceUrl = "http://pandapc:3000";

export const maggie = {
  firstName: "Maggie",
  lastName: "Simpson",
  email: "maggie@simpson.com",
  password: "secret",
};

export const maggieCredentials = {
  email: "maggie@simpson.com",
  password: "secret",
};

export const testUsers = [
  {
    firstName: "Homer",
    lastName: "Simpson",
    email: "homer@simpson.com",
    password: "secret",
  },
  {
    firstName: "Marge",
    lastName: "Simpson",
    email: "marge@simpson.com",
    password: "secret",
  },
  {
    firstName: "Bart",
    lastName: "Simpson",
    email: "bart@simpson.com",
    password: "secret",
  },
];

export const healthAndWellness = {
  name: "Health and Wellness",
  description: "Events centered around health, fitness, and well-being.",
};

export const testCategories = [
  {
    name: "Sports",
    description: "Events related to sports activities and competitions.",
  },
  {
    name: "Business",
    description: "Events focused on business, entrepreneurship, and networking.",
  },
  {
    name: "Technology",
    description: "Events highlighting the latest advancements and trends in technology.",
  },
  {
    name: "Art and Culture",
    description: "Events showcasing various forms of art, cultural exhibitions, and performances.",
  },
];

export const wellnessRetreat = {
  name: "Wellness Retreat",
  category: "Health and Wellness",
  description: "A retreat focusing on promoting holistic well-being and self-care.",
  views: 300,
};

export const testEvents = [
  {
    name: "Football Championship",
    categoryid: "",
    description: "The ultimate football championship featuring top teams from around the world.",
    views: 1000,
  },
  {
    name: "Business Summit",
    categoryid: "",
    description: "A summit bringing together industry leaders, entrepreneurs, and innovators.",
    views: 500,
  },
  {
    name: "Tech Conference",
    categoryid: "",
    description: "A conference showcasing the latest technologies and innovations in the tech industry.",
    views: 800,
  },
  {
    name: "Art Exhibition",
    categoryid: "",
    description: "An exhibition displaying a diverse range of artistic creations.",
    views: 200,
  },
];
