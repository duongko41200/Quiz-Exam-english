import ApiService from './api.service';


const params = {
	pagination: { page: 1, perPage: 100 },
	sort: { field: 'name', order: 'ASC' },
	filter: {},
};

const { page, perPage } = params.pagination;
const { field, order } = params.sort;
const query = {
	sort: JSON.stringify([field, order]),
	range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
	filter: JSON.stringify(params.filter),
};

const requestParams = `sort=${query.sort}&&range=${query.range}&&filter=${query.filter}`;

const serviceURL = 'test-banks';
const TestBankService = {
	//suy nghĩ xem gộp api của câu vào không
	createWord({ TestBank, defind, topicId, typeTestBank, attributes }) {
		return ApiService.post(
			`${serviceURL}/info/all`,
			{
				TestBank: TestBank,
				defind: defind,
				topicId: topicId,
				typeTestBank: typeTestBank,
				attributes: attributes,
			},
			{
				'Content-Type': 'application/json',
				'x-api-key': import.meta.env.APP_API_KEY,
				'x-client-id': localStorage.getItem('userId'),
				authorization: localStorage.getItem('accessToken'),
			}
		);
	},
	getAllTestBank() {
		return ApiService.get(
			`${serviceURL}/batch`,

			{
				'Content-Type': 'application/json',
				'x-api-key': import.meta.env.APP_API_KEY,
				'x-client-id': localStorage.getItem('userId'),
				authorization: localStorage.getItem('accessToken'),
			},
			{

			}
		);
	},

	getListTestBankByFilter({ page, limit, level, typeTestBank, date }) {
		return ApiService.get(
			`${serviceURL}/review`,

			{
				'x-api-key': import.meta.env.APP_API_KEY,
				'x-client-id': localStorage.getItem('userId'),
				authorization: localStorage.getItem('accessToken'),
			},
			{
				page,
				limit,
				level,
				typeTestBank,
				date,
			}
		);
	},
	deleteTestBank({
		page,
		limit,
		level,
		typeTestBank,
		date,
		TestBankId,
	}) {
		return ApiService.delete(
			`${serviceURL}/delete`,

			{
				'x-api-key': import.meta.env.APP_API_KEY,
				'x-client-id': localStorage.getItem('userId'),
				authorization: localStorage.getItem('accessToken'),
			},
			{
				page,
				limit,
				level,
				typeTestBank,
				date,
				TestBankId,
			}
		);
	},

	patchTestBank({
		TestBankId,
		TestBank,
		defind,
		typeTestBank,
		attributes,
		topicId,
	}) {
		return ApiService.patch(
			`${serviceURL}/update-id`,
			{
				TestBankId,
				TestBank,
				defind,
				typeTestBank,
				attributes,
				topicId,
			},

			{
				'x-api-key': import.meta.env.APP_API_KEY,
				'x-client-id': localStorage.getItem('userId'),
				authorization: localStorage.getItem('accessToken'),
			}
		);
	},

	getListPendding() {
		return ApiService.get(
			`${serviceURL}/listPending`,

			{
				'x-api-key': import.meta.env.APP_API_KEY,
				'x-client-id': localStorage.getItem('userId'),
				authorization: localStorage.getItem('accessToken'),
			},
			{}
		);
	},

	updateLevelTestBank({ TestBankId, repeat, dayReview }) {
		return ApiService.patch(
			`${serviceURL}/update-level`,
			{ TestBankId, repeat, dayReview },

			{
				'x-api-key': import.meta.env.APP_API_KEY,
				'x-client-id': localStorage.getItem('userId'),
				authorization: localStorage.getItem('accessToken'),
			}
		);
	},
	getAll({ userId, accessToken }) {
		return ApiService.get(
			`${serviceURL}/all-TestBank`,

			{
				'x-api-key': import.meta.env.APP_API_KEY,
				'x-client-id': userId,
				authorization: accessToken,
			},
			{}
		);
	},
};

export default TestBankService;
