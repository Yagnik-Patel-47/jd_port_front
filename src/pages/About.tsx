import Nav from "../components/Nav";
import { Typography, Box, Stack, TextField, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WipeBox from "../components/WipeBox";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { RiUser4Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { SiBlender, SiUnrealengine, SiAdobeaftereffects } from "react-icons/si";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import client from "../sanityClient";
import { setAboutData } from "../redux/about";
import LoadingScreen from "../components/LoadingScreen";
import emailjs from "@emailjs/browser";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionStack = motion(Stack);
const MotionTextField = motion(TextField);
const MotionButton = motion(Button);

const query = `
  *[_type == "aboutme"] {
    "light_logo": light_logo.asset->url,
    "dark_logo": dark_logo.asset->url,
    title,
    description[]{
      children[]{text, marks}
    },
  }[0]
`;

const stackContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const toolVariant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

const About = () => {
  const tools = [<SiBlender />, <SiAdobeaftereffects />, <SiUnrealengine />];
  const dispatch = useAppDispatch();
  const { title, description } = useAppSelector((store) => store.about);
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (title === "") {
      client
        .fetch(query)
        .then((data) => {
          dispatch(setAboutData(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.REACT_APP_EMAILJS_USER_ID!
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      {title === "" ? (
        <LoadingScreen />
      ) : (
        <>
          <Nav
            routes={[{ to: "/", label: "Home", type: "route" }]}
            animateExit={true}
          />
          <MotionBox
            sx={{ py: { lg: 20, xs: 15 }, px: { lg: 15, xs: 5 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0">
              <Stack spacing={3} sx={{ flexBasis: "50%" }}>
                <Stack spacing={1}>
                  <WipeBox>
                    <Typography
                      fontWeight="700"
                      fontSize={{ xs: "1.7rem", lg: "2rem" }}
                    >
                      About Me.
                    </Typography>
                  </WipeBox>
                  <WipeBox>
                    <Typography fontWeight="500">{title}</Typography>
                  </WipeBox>
                </Stack>
                <Stack spacing={0.5}>
                  {description.map((paragraph, index) => (
                    <MotionTypography
                      key={index}
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.3 + index * 0.2 }}
                    >
                      {paragraph.children.map((para, innerIndex) =>
                        para.marks.includes("strong") ? (
                          <HighLightedText key={innerIndex}>
                            {para.text}
                          </HighLightedText>
                        ) : (
                          para.text
                        )
                      )}
                    </MotionTypography>
                  ))}
                </Stack>
                <WipeBox>
                  <Typography
                    fontWeight="700"
                    fontSize={{ xs: "1.7rem", lg: "2rem" }}
                  >
                    Tools I Use.
                  </Typography>
                </WipeBox>
                <MotionStack
                  justifyContent="space-around"
                  alignItems="center"
                  sx={{ width: "100%", flexWrap: "wrap" }}
                  direction="row"
                  variants={stackContainer}
                  initial="hidden"
                  animate="show"
                >
                  {tools.map((tool, index) => (
                    <motion.div
                      variants={toolVariant}
                      transition={{ duration: 0.3 }}
                      key={index}
                      className="md:text-7xl text-5xl"
                    >
                      {tool}
                    </motion.div>
                  ))}
                </MotionStack>
              </Stack>
              <Stack
                sx={{ pl: { xs: 0, lg: 10 }, flexBasis: "50%" }}
                spacing={3}
              >
                <Stack spacing={1}>
                  <WipeBox>
                    <Typography
                      fontWeight="700"
                      fontSize={{ xs: "1.7rem", lg: "2rem" }}
                    >
                      Contact
                    </Typography>
                  </WipeBox>
                  <WipeBox>
                    <Typography fontWeight="500">
                      Feel free to contact me and I'll get back to you as soon
                      as I can.
                    </Typography>
                  </WipeBox>
                </Stack>
                <Stack
                  spacing={2}
                  onSubmit={submitForm}
                  component="form"
                  ref={formRef}
                >
                  <MotionStack
                    spacing={1}
                    direction="row"
                    alignItems="flex-end"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <RiUser4Line fontSize="1.6rem" />
                    <TextField
                      required
                      variant="standard"
                      label="Name"
                      fullWidth
                      name="userName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </MotionStack>
                  <MotionStack
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    spacing={1}
                    direction="row"
                    alignItems="flex-end"
                  >
                    <HiOutlineMail fontSize="1.6rem" />
                    <TextField
                      required
                      variant="standard"
                      label="Email"
                      fullWidth
                      name="userEmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </MotionStack>
                  <MotionTextField
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    label="Tell me why you are here?"
                    multiline
                    rows={5}
                    variant="standard"
                    required
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <MotionStack layout direction="row" spacing={2}>
                    <AnimatePresence>
                      <MotionButton
                        sx={{ bgcolor: "#1565c0", color: "#fff" }}
                        variant="contained"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 1, duration: 0.6 },
                        }}
                        type="submit"
                        fullWidth
                        layout
                      >
                        Send
                      </MotionButton>
                      {Boolean(
                        email.length > 0 ||
                          name.length > 0 ||
                          message.length > 0
                      ) && (
                        <MotionButton
                          variant="contained"
                          color="warning"
                          fullWidth
                          layout
                          sx={{ transformOrigin: "right" }}
                          initial={{
                            scaleX: 0,
                            opacity: 0,
                            transformOrigin: "right",
                          }}
                          animate={{
                            scaleX: 1,
                            opacity: 1,
                            transformOrigin: "right",
                          }}
                          exit={{
                            scaleX: 0,
                            opacity: 0,
                            transformOrigin: "right",
                          }}
                          transition={{ duration: 0.4 }}
                          onClick={() => {
                            setName("");
                            setEmail("");
                            setMessage("");
                          }}
                        >
                          Clear
                        </MotionButton>
                      )}
                    </AnimatePresence>
                  </MotionStack>
                </Stack>
              </Stack>
            </div>
          </MotionBox>
        </>
      )}
    </>
  );
};

export default About;

const HighLightedText = ({ children }: { children: ReactNode }) => {
  return (
    <Typography component="span" fontWeight={500}>
      {children}
    </Typography>
  );
};
