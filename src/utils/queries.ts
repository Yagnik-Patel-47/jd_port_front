const getAboutData = `
  *[_type == "aboutme"] {
    "light_logo": light_logo.asset->url,
    "dark_logo": dark_logo.asset->url,
    title,
    description[]{
      children[]{text, marks}
    },
  }[0]
`;

const getWorkData = (workID: string) => {
  return `
    *[_type == "work" && id.current=="${workID}"] {
      title,
      description[]{
        children[]{text, marks}
      },
      "placeholder": placeholder.asset->url,
      tools,
      "media": media[]{
        _type=="videoType" => {
          "src": video.asset->url,
          type
        },
        _type=="imageType" => {
          "src": image.asset->url,
          type
        }
      },
      "id": id.current,
    }[0]
  `;
};

const getAllWorkData = `
  *[_type == "work"] | order(title) {
    "media": media[]{
      _type=="videoType" => {
        "src": video.asset->url,
        type
      },
      _type=="imageType" => {
        "src": image.asset->url,
        type
      }
    },
    title,
    short_description,
    "id": id.current,
    "placeholder": placeholder.asset->url
  }
`;

export { getAboutData, getWorkData, getAllWorkData };
