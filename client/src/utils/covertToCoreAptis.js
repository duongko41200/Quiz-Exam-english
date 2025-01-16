export const convertToCoreAptisListening = (score) => {
	if (score >= 42) return 'C';
	if (score < 42 && score >= 34) return 'B2';

	if (score < 34 && score >= 24) return 'B1';
	if (score < 24 && score >= 16) return 'A2';
	if (score < 16 && score >= 8) return 'A1';

	return 'A0';
};

export const convertToCoreAptisReading = (score) => {
	if (score >= 46) return 'C';
	if (score < 46 && score >= 38) return 'B2';

	if (score < 38 && score >= 26) return 'B1';
	if (score < 26 && score >= 18) return 'A2';
	if (score < 18 && score >= 6) return 'A1';

	return 'A0';
};
