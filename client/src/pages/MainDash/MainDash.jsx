import React, { useEffect, useLayoutEffect, useState } from 'react';
import Cards from './Cards/Cards';
import './MainDash.css';
import Bars from '../../components/Bar/Bar';
import RightSide from './RigtSide/RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import TestBankService from '../../services/API/testBank.service';
import { RES_DATA } from '../../Constant/global';
import { SET_TESTBANK_DATA } from '../../store/feature/testBank';
import {
	SET_IS_SHOW_RESULT,
	SET_RESET_PART_SKILL,
} from '../../store/general';

const MainDash = () => {
	const auth = useSelector((state) => state.authStore.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const moveToExam = async (router) => {
		navigate(`/${router}`);
		dispatch(SET_IS_SHOW_RESULT(false));
		dispatch(SET_RESET_PART_SKILL());
	};

	const fetchData = async () => {
		try {
			const getTestBank = await TestBankService.getAllTestBank();

			const data = await getTestBank[RES_DATA].metadata[RES_DATA];

			console.log('tesst dataa:', data);

			dispatch(SET_TESTBANK_DATA(data));
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
    <div className="MainDash">
      <section
        className="bg-between section-top margin-navbar position-relative"
        style={{
          backgroundColor: "#edf2f9",
          backgroundImage: `url(https://res.cloudinary.com/dys0lk3ly/image/upload/v1735137288/bg-aptis_aesbrs.png),url(https://res.cloudinary.com/dys0lk3ly/image/upload/v1735137288/bg-aptiit_zaxu4o.png)`,
        }}
      >
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="row justify-center col-12 col-md-10 col-lg-3">
            <div className="text-center">
              <h1 className="font-medium text-black ">
                Thi thử ApTis trực tuyến miễn phí
              </h1>
              <p
                className="text-lg justify-center text-gray-700"
                style={{ color: `var(--text-color)` }}
              >
                Tra cứu toàn bộ thông tin về chứng chỉ tiếng Anh VSTEP, lịch thi
                VSTEP mới nhất, thi thử VSTEP trực tuyến miễn phí.
              </p>
              <Button
                variant="contained"
                className="pt-3 btn btn-primary shadow lift me-1 mr-1"
                onClick={() => moveToExam("exam-test")}
              >
                Vào thi ngay <i className="fe fe-headphones ms-2"></i>
              </Button>
              <Button
                variant="outlined"
                className="m-2 pt-3 w-fit btn btn-primary shadow"
                onClick={() => moveToExam("history")}
              >
                Lịch sử làm bài
              </Button>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
          <a
            href="#dichvu"
            className="btn btn-outline-primary btn-rounded-circle shadow"
          >
            <i className="fe fe-chevrons-down"></i>
          </a>
        </div>
      </section>

      <section>
        <div className="2xl:max-w-7xl md:max-w-6xl mx-auto p-6 bg-[#fafafa99]">
          <h1 className="text-2xl font-semibold text-gray-800">Our Services</h1>
          <p className="text-gray-600 mt-2">
            Designed to maximize the benefits for candidates during the exam
            preparation process, taking the exam until receiving the
            certificate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border border-blue-200 p-6 rounded-lg bg-white">
              <h2 className="text-blue-600 font-semibold">
                VSTEP test software
              </h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>Get
                  familiar with the interface and functions of the computer
                  testing software.
                </li>
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Understand the exam format and test taking steps.
                </li>
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Unlimited practice with a huge test bank that is updated
                  regularly.
                </li>
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Compatible with all devices: computers, phones... You can
                  practice anywhere.
                </li>
              </ul>
            </div>
            <div className="border border-blue-200 p-6 rounded-lg bg-white">
              <h2 className="text-blue-600 font-semibold">Practice test</h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Practice each skill (available), detailed solutions, listening
                  scripts, writing samples, speaking samples... (updating)
                </li>
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Unlimited practice with a huge test bank that is updated
                  regularly.
                </li>
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Compatible with all devices: computers, phones... You can
                  practice anywhere.
                </li>
              </ul>
            </div>
            <div className="border border-blue-200 p-6 rounded-lg bg-white">
              <h2 className="text-blue-600 font-semibold">
                VSTEP Exam Marking
              </h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>Get
                  immediate test results and self-assess your current abilities.
                </li>
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>Sign
                  up for essay grading with an experienced instructor.
                </li>
              </ul>
            </div>
            <div className="border border-blue-200 p-6 rounded-lg bg-white">
              <h2 className="text-blue-600 font-semibold">Other services</h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Provides all relevant information about the VSTEP exam.
                </li>
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Update the latest and most complete VSTEP exam schedule at all
                  units.
                </li>
                <li>
                  <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                  Admission and exit for the Centers.
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="mt-8 flex justify-center">
            <img
              src="https://placehold.co/200x200"
              alt="Illustration of a person sitting with a laptop and various icons around them"
              className="w-48 h-48"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default MainDash;
