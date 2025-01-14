import React, { useEffect, useState } from "react";
import "../../Reading/ExamReading.css";
import { useDispatch, useSelector } from "react-redux";
import { RES_DATA } from "../../../../Constant/global";
import { useNavigate } from "react-router-dom";



const SpeakingPartOne = () => {
  const testBankData = useSelector((state) => state.testBankStore.testBankData);

  const numberQuestionEachPart = useSelector(
    (state) => state.speakingStore.numberQuestionEachPart
  );

  const [resSpeakingPartOne, setResSpeakingPartOne] = useState();
  const [contentPartOne, setContentPartOne] = useState();
  const [subQuestions, setSubQuestions] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();



  useEffect(() => {
    if (testBankData.speaking.part1.length <= 0) {
      navigate("/");
      return;
    }
    const SpeakingPartOne = testBankData.speaking.part1[RES_DATA];
    console.log("testBankData",testBankData)

    setResSpeakingPartOne(SpeakingPartOne);
    setContentPartOne(SpeakingPartOne?.questions);

    setSubQuestions(SpeakingPartOne?.questions[RES_DATA].subQuestion);
  }, [testBankData]);




  return (
    <div>
      <div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
        <b>
          {subQuestions.length > 0 &&
            subQuestions[numberQuestionEachPart - 1].contdent}
        </b>
      </div>


    </div>
  );
};

export default SpeakingPartOne;
