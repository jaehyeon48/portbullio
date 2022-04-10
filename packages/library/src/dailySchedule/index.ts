type JobCallback = () => void;

const ONE_DAY_IN_MILLI_SEC = 24 * 60 * 60 * 1000;

export default function dailySchedule(timePattern: string, cb: JobCallback) {
	validateTimePattern(timePattern);
	const curDate = new Date();
	const [hh, mm, ss] = timePattern.split(':').map(Number);
	const [curHour, curMinute, curSecond] = [
		curDate.getHours(),
		curDate.getMinutes(),
		curDate.getSeconds()
	];
	const timePatternInMilliSec = transformToMilliSeconds(hh, mm, ss);
	const curTimeInMilliSec = transformToMilliSeconds(curHour, curMinute, curSecond);

	if (hh > curHour || mm > curMinute || ss > curSecond) {
		scheduleJob(cb, curTimeInMilliSec - timePatternInMilliSec + ONE_DAY_IN_MILLI_SEC);
	} else {
		scheduleJob(cb, curTimeInMilliSec - timePatternInMilliSec);
	}
}

function validateTimePattern(timePattern: string) {
	if (timePattern.trim() === '') throw new Error('Invalid time pattern');
	if (timePattern.match(/[^\d:]/g)) throw new Error('Invalid time pattern');
	if (!timePattern.match(/^([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9]$/))
		throw new Error('Invalid time pattern');
}

function scheduleJob(cb: JobCallback, initialScheduleTime: number) {
	setTimeout(() => {
		cb();
		setInterval(cb, ONE_DAY_IN_MILLI_SEC);
	}, initialScheduleTime);
}

function transformToMilliSeconds(hour: number, minute: number, second: number) {
	return (hour * 3600 + minute * 60 + second) * 1000;
}
