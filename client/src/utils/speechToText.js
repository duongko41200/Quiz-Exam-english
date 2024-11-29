export const speechToText = async(audioBlob) => { 


	const utterance = new SpeechSynthesisUtterance(audioBlob); // Tạo một câu để nói

	const availableVoices = await window.speechSynthesis.getVoices();

	console.log({availableVoices});
    utterance.lang = "en-US"; // Ngôn ngữ (vd: "vi-VN" cho tiếng Việt)
    utterance.rate = 1; // Tốc độ nói (0.1 đến 10)
	utterance.pitch = 1.; // Cao độ (0 đến 2)
	utterance.voice = availableVoices[5]

    window.speechSynthesis.speak(utterance);
}