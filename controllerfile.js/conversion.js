const conversionfn = async (req, res, next) => {
	const sender = req.cheackerMiddlewareSender;
	const receiver = req.cheackerMiddlewareReceiver;
	const startingTime = req.startingTime;
	if (sender == "earth" && receiver == "mars") {
		let dataSequence = stringToSequence(req.body.message)
		timeTakenForTranslation(startingTime)
		res.status(200).json({ "Response from Earth": req.body.message, "Nokia Translation": dataSequence })

	}
	else if (sender == "mars" && receiver == "earth") {
		let dataSentence = sequenceTostring(req.body.message)
		timeTakenForTranslation(startingTime)
		res.status(200).json({ "Response from Mars": req.body.message, "Nokia Translation": dataSentence })

	}

}

function timeTakenForTranslation(startingTime) {
	let endTime = new Date();

	let diff = endTime.getTime() - startingTime.getTime();

	let msec = diff, hh = 0, mm = 0, ss = 0;
	if (msec > (1000 * 60 * 60)) {
		hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
	}
	if (msec > (1000 * 60)) {
		mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
	}
	if (msec > (1000)) {
		ss = Math.floor(msec / 1000);
		msec -= ss * 1000;
	}

	console.log("Total time taken " + hh + ":" + mm + ":" + ss + ":" + diff);


}

function stringToSequence(str) {
	str = str.trim();
	str = str.toUpperCase()
	let i = 0, passingDatachunck = "", resultData = ""
	while (i < str.length) {
		if (str[i] == " ") {
			let stringConvertedData = printSequence(passingDatachunck);
			resultData = resultData + " " + stringConvertedData;
			passingDatachunck = ""
		} else if (i == (str.length - 1)) {
			passingDatachunck = passingDatachunck + str[i]
			let stringConvertedData = printSequence(passingDatachunck);
			resultData = resultData + " " + stringConvertedData;
			passingDatachunck = ""
		}
		else {
			passingDatachunck = passingDatachunck + str[i]
		}
		i++;
	}
	return resultData;
}
function printSequence(input) {
	let arr = ["2", "22", "222",
		"3", "33", "333",
		"4", "44", "444",
		"5", "55", "555",
		"6", "66", "666",
		"7", "77", "777", "7777",
		"8", "88", "888",
		"9", "99", "999", "9999"]
	let output = "";

	let n = input.length;
	for (let i = 0; i < n; i++) {
		if (input[i] == ' ')
			output = output + "0".charCodeAt(0);

		else {
			let position = input[i].charCodeAt(0) - 'A'.charCodeAt(0);
			output = output + arr[position];
		}
	}
	return output;
}





function sequenceTostring(str) {
	str = str.trim();

	let i = 0, passingDatachunck = "", resultData = ""
	while (i < str.length) {
		if (str[i] == " ") {
			let stringConvertedData = printSentence(passingDatachunck);
			resultData = resultData + " " + stringConvertedData;
			passingDatachunck = ""
		} else if (i == (str.length - 1)) {
			passingDatachunck = passingDatachunck + str[i]
			let stringConvertedData = printSentence(passingDatachunck);
			resultData = resultData + " " + stringConvertedData;
			passingDatachunck = ""
		}
		else {
			passingDatachunck = passingDatachunck + str[i]
		}
		i++;
	}
	resultData = resultData.toLowerCase()
	return resultData
}

function printSentence(S) {
	let stringData = "";
	let nums = ["", "", "ABC", "DEF", "GHI",
		"JKL", "MNO", "PQRS", "TUV", "WXYZ"];

	let str = S.split("");
	let i = 0;
	while (i < str.length) {
		if (str[i] == '.') {
			i++;
			continue;
		}
		let count = 0;
		while (i + 1 < str.length &&
			str[i] == str[i + 1]) {

			if (count == 2 && ((str[i] >= '2' &&
				str[i] <= '6') || (str[i] == '8')))
				break;

			else if (count == 3 && (str[i] == '7' ||
				str[i] == '9'))
				break;

			count++;
			i++;
			if (i == str.length)
				break;
		}
		if (str[i] == '7' || str[i] == '9') {
			stringData = stringData + (nums[str[i].charCodeAt(0) - 48][count % 4]);
		}
		else {

			stringData = stringData + (nums[str[i].charCodeAt(0) - 48][count % 3]);
		}
		i++;
	}
	return stringData
}


module.exports = { conversionfn };