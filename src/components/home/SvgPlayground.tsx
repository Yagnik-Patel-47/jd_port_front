import { Box, useMediaQuery } from "@mui/material";
import SvgObject from "./SvgObject";

const SvgPlayground = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      justifyContent={{ xs: "space-around", md: "space-evenly" }}
    >
      <SvgObject isEven={false} />
      <SvgObject isEven={true} />
      {!isMobile && <SvgObject isEven={false} />}
      {!isMobile && <SvgObject isEven={true} />}
    </Box>
  );
};

export default SvgPlayground;
