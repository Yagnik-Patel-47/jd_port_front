import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.REACT_APP_PROJECT_ID,
  token: process.env.REACT_APP_TOKEN,
  apiVersion: "2022-02-01",
  useCdn: true,
  dataset: "production",
});

export default client;
