import React, { useEffect, useState } from "react";
import "../../Reading/ExamReading.css";
import { useDispatch, useSelector } from "react-redux";
import { RES_DATA } from "../../../../Constant/global";
import { useNavigate } from "react-router-dom";
import {
  SET_ATTEMPTED_QUESTION,
  SET_RESPONSE_RESULT_LISTENING,
} from "../../../../store/feature/testBank";

const convertToWord = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
};

const ListeningPartTwo = () => {
  const testBankData = useSelector((state) => state.testBankStore.testBankData);

  const numberQuestionEachPart = useSelector(
    (state) => state.listeningStore.numberQuestionEachPart
  );

  const [resSpeakingPartTwo, setResSpeakingPartTwo] = useState();
  const [contentPartTwo, setContentPartTwo] = useState();
  const [subQuestions, setSubQuestions] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const selectOption = (e, index) => {
    dispatch(
      SET_RESPONSE_RESULT_LISTENING({
        part: 2,
        index: index,
        value: e.target.value,
        number: 0,
      })
    );
    dispatch(
      SET_ATTEMPTED_QUESTION({
        part: numberQuestionEachPart,
        numberQuestion: 2,
        currentExamPart: "listening",
      })
    );
  };

  useEffect(() => {
    if (testBankData.speaking.part1.length <= 0) {
      navigate("/");
      return;
    }

    const ListeningPartTwo = testBankData.listening.part2[RES_DATA];

    console.log("ListeningPartTwo", ListeningPartTwo);
    console.log("testBankData", testBankData);

    setResSpeakingPartTwo(ListeningPartTwo);
    setContentPartTwo(ListeningPartTwo?.questions);

    setSubQuestions(ListeningPartTwo?.questions[RES_DATA].subQuestion);
  }, [testBankData]);

  return (
    <div className="flex flex-col gap-4">
      <div className=" mb-2">
        {contentPartTwo &&
          contentPartTwo[RES_DATA] &&
          contentPartTwo[RES_DATA].content}
      </div>

      <div className="hover:underline cursor-pointer w-fit">Play/Stop</div>
      <div className="flex flex-col gap-6">
        {subQuestions.length > 0 &&
          subQuestions.map((item, index) => (
            <div className="flex h-[40px] w-full   cursor-pointer  ">
              <div className="w-[7rem]   text-[15px] h-full flex items-center justify-start">
                <div> Speaker {convertToWord[index + 1]}</div>
              </div>

              <div className="w-1/2  px-[0.7rem] flex items-center text-md ">
                <select
                  aria-label="Response input area"
                  className="lrn-cloze-select lrn_cloze_response h-full w-full font-medium"
                  data-inputid="1"
                  onChange={(e) => {
                    selectOption(e, index);
                  }}
                  defaultValue={item.responseUser}
                >
                  <option
                    role="option"
                    value=""
                    aria-label="Please select an option - "
                  ></option>
                  {contentPartTwo[RES_DATA] &&
                    contentPartTwo[RES_DATA].answerList.map((answer, idx) => (
                      <option key={idx} role="option" value={answer.content}>
                        {answer.content}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListeningPartTwo;
