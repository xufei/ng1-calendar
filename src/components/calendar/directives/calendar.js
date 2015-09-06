import "../css/calendar.css";
import template from "../templates/calendar.html";
import Calendar from "../../../models/calendar/calendar";

export default class CalendarDirective {
	constructor() {
		// 视图模式，一个三个，可以切换，默认是显示日期的
		this.ViewStates = Object.freeze({
			DATE: 0,
			MONTH: 1,
			YEAR: 2
		});

		this.template = template;
		this.restrict = "E";

		this.scope = {
			minDate: "=",
			maxDate: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;

		var now = new Date();

		if (attrs["initYear"]) {
			scope.initYear = scope.$parent.$eval(attrs["initYear"]);
		}

		if (attrs["initMonth"]) {
			scope.initMonth = scope.$parent.$eval(attrs["initMonth"]);
		}

		if (attrs["initDate"]) {
			scope.initMonth = scope.$parent.$eval(attrs["initDate"]);
		}
	}

	controller($scope) {
		let calendar = new Calendar();
		$scope.calendar = calendar;

		$scope.viewMode = this.ViewStates.DATE;

		$scope.selectDate = function (day) {
			calendar.date = day;
		};

		$scope.selectMonth = function (month) {
			calendar.month = month;
			$scope.viewMode = this.ViewStates.DATE;
		}.bind(this);

		$scope.selectYear = function (year) {
			calendar.year = year;
			$scope.viewMode = this.ViewStates.MONTH;
		}.bind(this);
	}
}