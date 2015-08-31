import Calendar from "../../models/calendar/calendar";

export default class CalendarController {
	constructor(Calendar) {
		this.calendar = new Calendar();

		this.viewMode = 1;
	}


}

CalendarController.$inject = ["Calendar"];