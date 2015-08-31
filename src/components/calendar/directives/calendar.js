import template from "../templates/pager.html";

import Calendar from "../../models/calendar/calendar";

export default class CalendarDirective {
	constructor($http) {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			currentPage: "=",
			setPage: "&"
		};

		this.controller = new Pager();
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

CalendarDirective.$inject = ["Calendar"];