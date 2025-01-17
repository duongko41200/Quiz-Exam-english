import * as React from "react";
import Box from "@mui/material/Box";
import ResultTestReading from "../../pages/ExamTest/ResultTest/ResultReading/ResultReading";
import ResultTestWriting from "../../pages/ExamTest/ResultTest/ResultWritiing/ResultWriting";
import ResultTestSpeaking from "../../pages/ExamTest/ResultTest/ResultSpeaking/ResultSpeaking";
import ResultTestListening from "../../pages/ExamTest/ResultTest/ResultListening/ResultListening";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_IS_SHOW_OVERALL_SCORE,
  SET_IS_SHOW_RESULT,
  SET_SCORE_4_PART,
} from "../../store/general";
import {
  INDEXED_DB_APTIS,
  INDEXED_DB_APTIS_STORE,
  RES_DATA,
} from "../../Constant/global";
import useIndexedDB from "../../hook/useIndexedDB";

export default function BasicTabsResult({ resultReading, resultWriting }) {
  const [value, setValue] = React.useState(0);
  const [partSkill, setPartSkill] = React.useState("Reading");
  const [numberLession, setNumberLession] = React.useState(1);
  const [numberListening, setNumberListening] = React.useState(1);

  const { saveObjectToDB, getDataFromDB, isSaving, error } = useIndexedDB(
    INDEXED_DB_APTIS,
    INDEXED_DB_APTIS_STORE,
    "id"
  );

  const isShowResult = useSelector(
    (state: any) => state.generalStore.isShowResult
  );
  const isShowOverallScore = useSelector(
    (state: any) => state.generalStore.isShowOverallScore
  );
  const currentExamPart = useSelector(
    (state: any) => state.generalStore.currentExamPart
  );
  const testBankData = useSelector(
    (state: any) => state.testBankStore.testBankData
  );
  const dispatch = useDispatch();

  const handleChange = React.useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const moveLession = React.useCallback(
    (number: number, title: string) => {
      if (title !== partSkill) {
        setPartSkill(title);
      }
      if (title === "Listening") {
        if (number >= 1 && number <= 13) {
          setNumberLession(1);
        } else if (number === 14) {
          setNumberLession(2);
        } else if (number === 15) {
          setNumberLession(3);
        } else if (number >= 16) {
          setNumberLession(4);
        }
        setNumberListening(number);
      } else {
        setNumberLession(number);
      }
    },
    [partSkill]
  );

  const BackHistoryScreen = React.useCallback(() => {
    dispatch(SET_IS_SHOW_RESULT(false));
  }, [dispatch]);

  const passages = React.useMemo(
    () => [
      {
        title: "Speaking",
        questions: Array.from({ length: 4 }, (_, i) => ({
          questionId: i + 1,
          resultCheck: false,
          isActive: false,
        })),
      },
      {
        title: "Listening",
        questions: Array.from({ length: 17 }, (_, i) => ({
          questionId: i + 1,
          resultCheck: false,
          isActive: false,
        })),
      },
      {
        title: "Reading",
        questions: Array.from({ length: 5 }, (_, i) => ({
          questionId: i + 1,
          resultCheck: false,
          isActive: false,
        })),
      },
      {
        title: "Writing",
        questions: Array.from({ length: 4 }, (_, i) => ({
          questionId: i + 1,
          resultCheck: false,
          isActive: false,
        })),
      },
    ],
    []
  );

  React.useEffect(() => {
    console.log({ testBankData });
    const dataClonePassages = [...passages];

    let coreListening = 0;

    let coreReading = 0;

    const mapListeningPart = (part, questionId) => {
      for (const item of part) {
        if (item.responseUser !== item.correctAnswer) {
          return { questionId, resultCheck: false, isActive: false };
        }
      }
      return { questionId, resultCheck: true, isActive: false };
    };

    const listeningParts = [
      testBankData.listening.part1[RES_DATA].questions[RES_DATA].subQuestion,
      testBankData.listening.part2[RES_DATA].questions[RES_DATA].subQuestion,
      testBankData.listening.part3[RES_DATA].questions[RES_DATA].subQuestion,
      testBankData.listening.part4[0].questions[RES_DATA].subQuestion,
      testBankData.listening.part4[1].questions[RES_DATA].subQuestion,
    ];

    const readingParts = [
      testBankData.reading.part1[RES_DATA].data.questions.subQuestion,
      testBankData.reading.part2[RES_DATA].data.questions?.responseUser ?? [],
      testBankData.reading.part3[RES_DATA].data.questions?.responseUser ?? [],
      testBankData.reading.part4[RES_DATA].data?.questions.subQuestion,
      testBankData.reading.part5[RES_DATA].data.questions.subQuestion,
    ];

    // Reading part 4

    const resultReadingFourUser = testBankData.reading.part4[
      RES_DATA
    ].data?.questions.answerList.map((item) => ({ ...item }));
    const subQuestionReadingFourUser = testBankData.reading.part4[
      RES_DATA
    ].data?.questions.subQuestion.map((item) => ({ ...item }));

    if (resultReadingFourUser) {
      resultReadingFourUser.forEach((userItem) => {
        userItem.resultUser = [];
        userItem.resultSystem = [];

        subQuestionReadingFourUser.forEach((subItem) => {
          if (userItem.content === subItem.responseUser) {
            userItem.resultUser.push(subItem.content);
          }
          if (userItem.content === subItem.correctAnswer) {
            userItem.resultSystem.push(subItem.content);
          }
        });

        const isCorrect =
          userItem.resultUser.length === userItem.resultSystem.length &&
          userItem.resultUser.every((userAnswer) =>
            userItem.resultSystem.includes(userAnswer)
          );

        userItem.statusResult = isCorrect ? "Correct" : "Incorrect";
      });

      console.log({ resultReadingFourUser });
    }

    // Listening part 1, 2, 3, 4

    const listening = listeningParts[0].map((item, index) => {
      if (item.responseUser === item.correctAnswer) {
        coreListening += 2;
      }
      return {
        questionId: index + 1,
        resultCheck: item.responseUser === item.correctAnswer,
        isActive: false,
      };
    });

    [1, 2, 3, 4].forEach((partIndex) => {
      listeningParts[partIndex].forEach((item) => {
        if (item.responseUser === item.correctAnswer) {
          coreListening += 2;
        }
      });
    });

    listening.push(mapListeningPart(listeningParts[1], 14));
    listening.push(mapListeningPart(listeningParts[2], 15));
    listening.push(mapListeningPart(listeningParts[3], 16));
    listening.push(mapListeningPart(listeningParts[4], 17));

    // Reading part 1, 2, 3, 4, 5

    readingParts[0].forEach((item, index) => {
      if (index !== 0 && item.responseUser === item.correctAnswer) {
        coreReading += 2;
      }
    });

    readingParts[1].forEach((item, index) => {
      if (item?.id && parseInt(item?.id) === index + 1) {
        console.log("item", item);
        coreReading += 1;
      }
    });
    readingParts[2].forEach((item, index) => {
      if (item?.id && parseInt(item.id) === index + 1) {
        coreReading += 1;
      }
    });

    resultReadingFourUser.forEach((item) => {
      if (item.statusResult === "Correct") {
        coreReading += 4;
      }
    });
    readingParts[4].forEach((item, index) => {
      if (index !== 0 && item.responseUser === item.correctAnswer) {
        coreReading += 2;
      }
    });

    const reading = readingParts.map((part, index) => {
      if (part.length < 0) {
        return {
          questionId: index + 1,
          resultCheck: false,
          isActive: false,
        };
      }
      if (index === 0 || index === 4) {
        return mapListeningPart(part, index + 1);
      }
      if (index === 3) {
        for (let i = 0; i < resultReadingFourUser.length; i++) {
          if (resultReadingFourUser[i].statusResult === "Incorrect") {
            return {
              questionId: index + 1,
              resultCheck: false,
              isActive: false,
            };
          }
        }
        return {
          questionId: index + 1,
          resultCheck: true,
          isActive: false,
        };
      }

      for (let i = 0; i < 4; i++) {
        if (!part[i]) {
          return {
            questionId: index + 1,
            resultCheck: false,
            isActive: false,
          };
        }
        if (part[i]?.id && parseInt(part[i].id) !== i + 1) {
          return {
            questionId: index + 1,
            resultCheck: false,
            isActive: false,
          };
        }
        if (i === part.length - 1) {
          return {
            questionId: index + 1,
            resultCheck: true,
            isActive: false,
          };
        }
      }
    });

    dataClonePassages[1].questions = listening;
    dataClonePassages[2].questions = reading.filter(
      (question) => question !== undefined
    );
    console.log("coreListening", coreListening);

    console.log("coreReading", coreReading);
    console.log({ dataClonePassages });

    dispatch(
      SET_SCORE_4_PART({
        listening: coreListening,
        reading: coreReading,
        speaking: 0,
        writing: 0,
      })
    );

    if (currentExamPart !== "result") return;

    const objectsToSave = {
      id: Date.now(),
      data: testBankData,
      coreListening,
      coreReading,
      dateTest: new Date().toLocaleDateString(),
    };

    saveObjectToDB(objectsToSave);
  }, [testBankData, passages]);

  return (
    <>
      <div
        className={`w-full flex ${
          !isShowResult ? "justify-center" : "justify-between gap-20"
        } gap-2 font-bold items-center h-[50px] text-[18px]`}
      >
        <div className="flex gap-2">
          {isShowResult && (
            <div
              className="w-fit p-1 px-4 bg-blue-100 rounded-xl font-sans font-medium cursor-pointer hover:bg-blue-200"
              onClick={BackHistoryScreen}
            >
              Quay lại
            </div>
          )}

          <div
            className="w-fit p-1 px-4 bg-blue-100 rounded-xl font-sans font-medium cursor-pointer hover:bg-blue-200"
            onClick={() => dispatch(SET_IS_SHOW_OVERALL_SCORE(true))}
          >
            Tổng quát
          </div>
          <div
            className="w-fit p-1 px-4 bg-blue-100 rounded-xl font-sans font-medium cursor-pointer hover:bg-blue-200"
            onClick={() => dispatch(SET_IS_SHOW_OVERALL_SCORE(false))}
          >
            Chi tiết
          </div>
        </div>
        <div className="text-[#45368f]">
          Đáp án/transcript: Aptis Test - {partSkill} - Part {numberLession}
        </div>
        {isShowResult && <div> </div>}
      </div>
      <Box
        sx={{
          width: `${
            !isShowResult ? "calc(100vw - 40px) !important" : "100% !important"
          }`,
          display: "flex",
          gap: 1,
          background: "#f8f9fa",
          marginBottom: `${isShowResult ? "0px" : "70px"}`,
          height: "580px",
        }}
      >
        <Box>
          {partSkill === "Reading" && (
            <ResultTestReading
              resultReading={resultReading}
              numberLession={numberLession}
            />
          )}
          {partSkill === "Writing" && (
            <ResultTestWriting
              resultWriting={resultWriting}
              numberLession={numberLession}
            />
          )}
          {partSkill === "Speaking" && (
            <ResultTestSpeaking numberLession={numberLession} />
          )}
          {partSkill === "Listening" && (
            <ResultTestListening
              numberLession={numberLession}
              numberListening={numberListening}
            />
          )}
        </Box>
        <div className="h-full flex justify-center shadow-md bg-gray-100">
          <div className="p-4 pb-0 pt-3 bg-white shadow-md w-[220px] rounded-md w-full">
            {passages.map((passage, index) => (
              <div key={index} className="mb-4">
                <h2 className="font-bold mb-2">{passage.title}</h2>
                <div className="grid xl:grid-cols-4 sm:grid-cols-3 2xl:xl:grid-cols-4 gap-1">
                  {passage.questions.map((question, idx) => (
                    <button
                      key={idx}
                      className={`w-10 h-10 border border-gray-500 font-medium rounded-md hover:text-white hover:bg-[#45368f] focus:bg-[#45368f] focus:text-white ${
                        question.resultCheck
                          ? "bg-green-200"
                          : passage.title === "Speaking" ||
                            passage.title === "Writing"
                          ? "bg-gray-50"
                          : "bg-red-200"
                      }`}
                      onClick={() =>
                        moveLession(question.questionId, passage.title)
                      }
                    >
                      {question.questionId}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </>
  );
}
