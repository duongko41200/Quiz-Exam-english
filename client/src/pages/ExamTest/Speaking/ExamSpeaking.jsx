import { Box } from "@mui/material";
import React from "react";
import "./ExamSpeaking.css";
import { useDispatch, useSelector } from "react-redux";
import SpeakingPartOne from "./SpeakingPartOne/SpeakingPartOne";
import SpeakingPartTwo from "./SpeakingPartTwo/SpeakingPartTwo";
import SpeakingPartThree from "./SpeakingPartThree/SpeakingPartThree";
import SpeakingPartFour from "./SpeakingPartFour/SpeakingPartFour";

const ExamReading = () => {
  const testBankData = useSelector((state) => state.testBankStore.testBankData);

  const numberQuestion = useSelector(
    (state) => state.speakingStore.numberQuestion
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // padding: "1rem",
          marginBottom: "4rem",
        }}
        className="fluid"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "fit-content",
            marginTop: "3.25rem",
            padding: "1rem",
            width: "calc(100% - 500px)",
          }}
        >
          <Box
            sx={{
              fontWeight: "600",
              fontSize: "1.275rem",
            }}
          >
            Speaking
          </Box>
          <Box>
            <Box className="row">
              <Box
                style={{
                  marginBottom: "1.5em",
                  marginTop: 0,
                  fontWeight: "600",
                  fontSize: "1.275rem",
                }}
              >
                Question {numberQuestion} of 4
              </Box>
            </Box>
          </Box>
          {numberQuestion && numberQuestion === 1 && <SpeakingPartOne />}
          {numberQuestion && numberQuestion === 2 && <SpeakingPartTwo />}
          {numberQuestion && numberQuestion === 3 && <SpeakingPartThree />}
          {numberQuestion && numberQuestion === 4 && <SpeakingPartFour />}
        </Box>
      </Box>
    </>
  );
};

export default ExamReading;
