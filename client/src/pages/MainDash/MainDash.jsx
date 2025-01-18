import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TestBankService from '../../services/API/testBank.service';
import { RES_DATA } from '../../Constant/global';
import { SET_TESTBANK_DATA } from '../../store/feature/testBank';
import { SET_IS_SHOW_RESULT, SET_RESET_PART_SKILL } from '../../store/general';
import './MainDash.css';

const MainDash = () => {
  const auth = useSelector((state) => state.authStore.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveToExam = (router) => {
    navigate(`/${router}`);
    dispatch(SET_IS_SHOW_RESULT(false));
    dispatch(SET_RESET_PART_SKILL());
  };

  const fetchData = async () => {
    try {
      const getTestBank = await TestBankService.getAllTestBank();
      const data = getTestBank[RES_DATA].metadata[RES_DATA];
      console.log('test data:', data);
      dispatch(SET_TESTBANK_DATA(data));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="MainDash pb-4">
      <section
        className="bg-between section-top margin-navbar position-relative"
        style={{
          backgroundColor: '#edf2f9',
          backgroundImage: `url(https://res.cloudinary.com/dys0lk3ly/image/upload/v1735137288/bg-aptis_aesbrs.png),url(https://res.cloudinary.com/dys0lk3ly/image/upload/v1735137288/bg-aptiit_zaxu4o.png)`,
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="row justify-center col-12 col-md-10 col-lg-3">
            <div className="text-center">
              <h1 className="font-medium text-black">Thi thử ApTis trực tuyến miễn phí</h1>
              <p className="text-lg justify-center text-gray-700" style={{ color: `var(--text-color)` }}>
                Đơn vị luyện thi Aptis uy tín, đảm bảo đầu ra B1, B2, C. Cung cấp bộ đề thi thử Aptis chuẩn và phương pháp học độc quyền.
              </p>
              <Button
                variant="contained"
                className="pt-3 btn btn-primary shadow lift me-1 mr-1"
                onClick={() => moveToExam('exam-test')}
              >
                Vào thi ngay <i className="fe fe-headphones ms-2"></i>
              </Button>
              <Button
                variant="outlined"
                className="m-2 pt-3 w-fit btn btn-primary shadow"
                onClick={() => moveToExam('history')}
              >
                Lịch sử làm bài
              </Button>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
          <a href="#dichvu" className="btn btn-outline-primary btn-rounded-circle shadow">
            <i className="fe fe-chevrons-down"></i>
          </a>
        </div>
      </section>

      <section className="bg-[#fafafa99] mt-8">
        <div className="2xl:max-w-7xl md:max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-4 pt-8">
            <div className="w-full md:w-2/3 text-center md:text-left sm:text-sm md:text-md 2xl:text-lg">
              <div className="2xl:text-xl sm:text-lg font-semibold">Dịch vụ của chúng tôi</div>
              <div className="text-gray-500 mt-2 text-[15px] 2xl:text-lg pr-2">
                Được thiết kế để đem lại tối đa lợi ích cho thí sinh trong quá trình ôn luyện thi Aptis.
                <strong>Cam kết đạt kết đạt B1, B2, C với tất cả đối tượng sau:</strong>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 border border-green-200 p-4 rounded-lg bg-white sm:text-md">
                {[
                  'Người cần lấy chứng chỉ Aptis cấp tốc',
                  'Người mất gốc hoặc lâu ngày không dùng tiếng anh',
                  'Người bận bựu, ít thời gian để luyên tập',
                  'Người có tâm lý hồi hộp, căng thẳng khi đi thi',
                ].map((text, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon fontSize="sm" color="success"/>
                    <span className="sm:text-[14px] 2xl:text-[17px] ml-2">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="https://luyenthivstep.vn/assets/theme/landkit/assets/img/illustrations/illustration-3.png"
                className="w-full h-auto"
                alt="luyen-thi-vstep-banner3"
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="2xl:text-xl sm:text-lg font-semibold">
              Tại sao chúng tôi tự tin vậy?
              <span className="text-[24px] text-blue-700 ml-2">Bởi vì...</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              {
                title: 'Bộ đề mới nhất',
                items: [
                  `Bộ đề key tháng ${new Date().getMonth() + 1} mới được cập nhập và có tỷ lệ trúng cao.`,
                  'Cung cấp file nghe của listening, cũng như đề bài và đáp án của các kỹ năng giúp bạn ôn luyện hiệu quả.',
                  'Bộ đề sẽ được gửi sớm cũng như cập nhập lên phần mềm luyện thi + thiết lập trợ lý ảo giúp bạn linh đông và có nhiều thời gian luyện tập.',
                ],
              },
              {
                title: 'Phần mềm luyện thi',
                items: [
                  'Giao diện phần mềm thi thử Aptis được thiết kế giống với phần mềm thi thật, tạo môi trường giúp bạn tự tin khi đi thi.',
                  'Tích hợp AI tự động đánh giá bài làm theo từng tiêu chí chấm điểm riêng của Aptis. Đồng thời cung cấp gợi ý giúp bài làm của bạn hoàn thiện hơn.',
                  'Cung cấp những tiện ích trong phần mềm giúp bạn luyện tập dễ dàng hơn.',
                ],
              },
              {
                title: 'Trợ lý ảo Aptis',
                items: [
                  'Gói gọn các bài giảng cũng như những thắc mắc về bài thì Aptis trong trợ lý ảo. Từ đó, bạn có thể học mọi lúc mọi nơi.',
                  'Cung cấp bài tập ngắn hàng ngày cũng như nhắc nhở bạn mỗi ngày. (giúp bạn ghi nhớ, mà không phải tốn sức)',
                  'Theo dõi quá trình luyện tập của bạn từ đó chúng tôi có thể nắm bắt được kiến thức của bạn để hỗ trợ tốt nhất cho bạn.',
                ],
              },
              {
                title: 'Phương pháp học mới',
                items: [
                  'Thay vì học 30 - 40 đề thì với phương pháp của chúng tôi bạn chỉ cần học 4 -5 đề là có thể áp dụng cho mọi đề. (tích kiệm thời gian)',
                  'Nhờ có trợ lý ảo chúng tôi sẽ biết được tình hình luyện tập của bạn, để có thể hộ trợ bạn.',
                ],
              },
            ].map((section, index) => (
              <div key={index} className="border border-blue-200 p-6 rounded-lg bg-white">
                <h2 className="text-blue-600 font-semibold">{section.title}</h2>
                <div className="mt-4 space-y-2 text-gray-700">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <TaskAltIcon fontSize="small" className="text-blue-600" />
                      <span className="sm:text-[15px] 2xl:text-[17px] ml-2">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 pt-8">
            <div className="w-full md:w-2/3 text-center md:text-left sm:text-sm md:text-md 2xl:text-lg">
              <div className="2xl:text-xl sm:text-lg font-semibold">Chúng tôi luôn đồng hành với bạn!</div>
              <div className="text-gray-500 mt-2 text-[15px] 2xl:text-lg pr-2">
                Nếu bạn không đạt được target chúng tôi sẽ hỗ trợ bạn miễn phí tới khi pass. Bạn sẽ được hỗ trợ đầy đủ như bên trên.
              </div>
              <div className="text-gray-500 mt-2 text-[15px] 2xl:text-lg pr-2">
                Ngoài ra bạn sẽ được trải nghiệm phần mềm học tiếng anh mới mà chúng tôi sắp ra mắt.
              </div>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="https://res.cloudinary.com/dys0lk3ly/image/upload/v1737214409/11_r3kl0p.png"
                className="w-full h-auto"
                alt=""
              />
            </div>
          </div>
          <div className="mt-10">
            <div className="2xl:text-2xl sm:text-xl flex justify-center items-center font-semibold">
              <div>Phản hồi của các bạn học viên trên cả nước về đội ngũ</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainDash;
