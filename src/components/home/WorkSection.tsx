import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import WorkCard from "./WorkCard";
import client from "../../sanityClient";
import { useEffect, useState } from "react";
import { getAllWorkData } from "../../utils/queries";

const MotionTypography = motion(Typography);

interface WorkForCard {
  title: string;
  short_description: string;
  media: { src: string; type: string }[];
  id: string;
  placeholder: null | string;
}

const WorkSection = () => {
  const [worksData, setWorksData] = useState<WorkForCard[]>([]);
  useEffect(() => {
    client.fetch(getAllWorkData).then((data) => setWorksData(data));
  }, []);
  return (
    <section id="work">
      <Stack sx={{ py: 10 }} spacing={10} alignItems="center">
        <Stack spacing={3} alignItems="center">
          <MotionTypography
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            CASE STUDIES
          </MotionTypography>
          <MotionTypography
            fontSize={{ xs: "2rem", lg: "2.5rem" }}
            fontWeight="700"
            variant="h4"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Latest Works
          </MotionTypography>
        </Stack>
        <Stack
          sx={{ px: { lg: 20, xs: 4 }, width: "100%" }}
          alignItems="center"
          spacing={{ xs: 10, lg: 18 }}
        >
          {worksData.length !== 0 &&
            worksData.map((work, index) => (
              <WorkCard
                title={work.title}
                short_desc={work.short_description}
                src={work.media[0].src}
                index={index + 1}
                id={work.id}
                mediaType={work.media[0].type}
                videoPlaceholder={
                  work.placeholder !== null ? work.placeholder : ""
                }
                key={index}
              />
            ))}
        </Stack>
      </Stack>
    </section>
  );
};

export default WorkSection;
