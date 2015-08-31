import "../css/calendar.css";
import template from "../templates/calendar.html";

import CalendarController from "../controllers/calendar";

export default class CalendarDirective {
	constructor(CalendarController) {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			currentPage: "=",
			setPage: "&"
		};

		this.controller = new CalendarController();
	}

	link($scope, element, attrs) {
		this.$scope = $scope;

		if (attrs["initYear"]) {
			scope.currentYear = scope.$parent.$eval(attrs["initYear"]);
		}

		if (attrs["initMonth"]) {
			scope.currentMonth = scope.$parent.$eval(attrs["initMonth"]);
		}

		if (attrs["initDate"]) {
			scope.currentDate = scope.$parent.$eval(attrs["initDate"]);
		}
	}
}

CalendarDirective.$inject = ["CalendarController"];