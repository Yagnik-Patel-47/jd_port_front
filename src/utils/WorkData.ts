import vandal from "../assets/img/vandal.webp";
import milf from "../assets/img/milf.webp";
import milf2 from "../assets/img/milf2.webp";
import dino from "../assets/img/dino.webp";
import blunyell from "../assets/img/blunyell.webp";
import blunyell2 from "../assets/img/imageblur.webp";
import boatHouse from "../assets/img/boat_house.webp";
import simulationVideo from "../assets/video/boat_house_ue4.mp4";
import blunyellVideo from "../assets/video/blunyell_vid.mp4";

const workData = [
  {
    title: "Cerasa Redesign",
    short_desc: "Leader in bathroom furniture since 1983.",
    desc: "Cerasa is composed of an established team of Italian master craftsmen that produces and puts up bathrooms undisputed of exceptional 'Made in Italy' quality. Cerasa collections are designed to satisfy the most diverse housing styles, fit the style of the house and its inhabitants.",
    media: [
      { src: blunyellVideo, type: "video" },
      { src: blunyell, type: "image" },
      { src: blunyell2, type: "image" },
    ],
    id: "blunyell",
    tools: ["blender"],
    placeholder: blunyell2,
  },
  {
    title: "Project Lato",
    short_desc: "The Next generation Management System.",
    desc: "Lato aims to be a modern, solid and easy-to-use web-based software to manage content. With its intuitive dashboard and hand-crafted UI, Lato helps every customer to easily manage every kind of content he/she needs.",
    media: [{ src: vandal, type: "image" }],
    id: "vandal",
    tools: ["blender"],
    placeholder: "",
  },
  {
    title: "Villaggi La Francesca",
    short_desc: "A green oasis on the sea of the Cinque Terre.",
    desc: "A self-sufficient settlement, where you can spend your time with no hurry or constraint. Tourists, who nowadays are more and more desirous to discover landscapes, scents and natural flavours, find in La Francesca the ideal place for a stay in all seasons.",
    media: [{ src: dino, type: "image" }],
    id: "dino",
    tools: ["blender"],
    placeholder: "",
  },
  {
    title: "Project Sportland",
    short_desc: "The Nature of Wellness",
    desc: "Sportland aims to promote the economy and tourism in the foothills and the High Friuli thanks to the multiple sports that you can enjoy in the area. The municipal government is working on this project since a long time willing to relaunch the economy and tourism of the whole territory.",
    media: [
      { src: milf, type: "image" },
      { src: milf2, type: "image" },
    ],
    id: "milf",
    tools: ["blender"],
    placeholder: "",
  },
  {
    title: "Project Video",
    short_desc: "The Nature of Wellness",
    desc: "Sportland aims to promote the economy and tourism in the foothills and the High Friuli thanks to the multiple sports that you can enjoy in the area. The municipal government is working on this project since a long time willing to relaunch the economy and tourism of the whole territory.",
    media: [{ src: simulationVideo, type: "video" }],
    id: "boat-house",
    tools: ["ue4", "blender", "afterEffects"],
    placeholder: boatHouse,
  },
];

export default workData;
