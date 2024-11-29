import React, { useEffect, useState } from "react";
import "../../Reading/ExamReading.css";
import { useDispatch, useSelector } from "react-redux";
import { RES_DATA } from "../../../../Constant/global";
import { SET_RESPONSE_RESULT_READING } from "../../../../store/feature/testBank";
import { useNavigate } from "react-router-dom";

const TITLE = 0;
const DEAR_PERSON = 1;
const FOOT_FISH = 2;
const SIGNAL = 3;

const PART_ONE = 1;

const SpeakingPartFour = () => {
  const testBankData = useSelector((state) => state.testBankStore.testBankData);

  const numberQuestionEachPart = useSelector(
    (state) => state.speakingStore.numberQuestionEachPart
  );

  const [resSpeakingPartFour, setResSpeakingPartFour] = useState();
  const [contentPartFour, setContentPartFour] = useState();
  const [subQuestions, setSubQuestions] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const selectOption = (e, index) => {
    const value = e.target.value;

    dispatch(SET_RESPONSE_RESULT_READING({ part: PART_ONE, index, value }));
  };

  useEffect(() => {
    if (testBankData.speaking.part2.length <= 0) {
      navigate("/");
      return;
    }
    const SpeakingPartFour = testBankData.speaking.part2[RES_DATA];

    setResSpeakingPartFour(SpeakingPartFour);
    setContentPartFour(SpeakingPartFour?.questions[RES_DATA]);

    setSubQuestions(SpeakingPartFour?.questions[RES_DATA].subQuestion);
  }, [testBankData]);

  return (
    <div>
      <div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5 flex flex-col gap-4">
        {subQuestions.length > 0 &&
          subQuestions.map((item, index) => {
            return (
              <div key={index}>
                <b>{item.content}</b>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SpeakingPartFour;
