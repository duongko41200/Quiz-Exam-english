import React, { useEffect, useState } from "react";
import "../../Reading/ExamReading.css";
import { useDispatch, useSelector } from "react-redux";
import { RES_DATA } from "../../../../Constant/global";
import { SET_RESPONSE_RESULT_READING } from "../../../../store/feature/testBank";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const TITLE = 0;
const DEAR_PERSON = 1;
const FOOT_FISH = 2;
const SIGNAL = 3;

const PART_ONE = 1;

const SpeakingPartThree = () => {
  const testBankData = useSelector((state) => state.testBankStore.testBankData);

  const numberQuestionEachPart = useSelector(
    (state) => state.speakingStore.numberQuestionEachPart
  );

  const [resSpeakingPartThree, setResSpeakingPartThree] = useState();
  const [contentPartThree, setContentPartThree] = useState();
  const [subQuestions, setSubQuestions] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const selectOption = (e, index) => {
    const value = e.target.value;

    dispatch(SET_RESPONSE_RESULT_READING({ part: PART_ONE, index, value }));
  };

  useEffect(() => {
    if (testBankData.speaking.part3.length <= 0) {
      navigate("/");
      return;
    }
    const SpeakingPartThree = testBankData.speaking.part3[RES_DATA];

    setResSpeakingPartThree(SpeakingPartThree);
    setContentPartThree(SpeakingPartThree?.questions[RES_DATA]);

    setSubQuestions(SpeakingPartThree?.questions[RES_DATA].subQuestion);
  }, [testBankData]);

  return (
    <Box>
      <Box className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
        <b>
          {subQuestions.length > 0 &&
            subQuestions[numberQuestionEachPart - 1].content}
        </b>
      </Box>

      {numberQuestionEachPart === 1 && contentPartThree && (
        <Box className="flex gap-2">
          <Box sx={{
            with: {
              
            }
          }}>
            <img src={contentPartThree.image && contentPartThree?.image[0]?.path} />
          </Box>

          <Box>
            <img src={contentPartThree.image && contentPartThree?.image[1]?.path} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SpeakingPartThree;
