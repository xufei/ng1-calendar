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
		let now = new Date();

		let calendar = new Calendar();
		$scope.calendar = calendar;

		$scope.viewMode = this.ViewStates.DATE;

		function dateOutOfRange(date) {
			if (($scope.minDate && before(new Date(calendar.year, calendar.month, date), $scope.minDate))
				|| ($scope.maxDate && before($scope.maxDate, new Date(calendar.year, calendar.month, date)))) {
				return true;
			}
			else {
				return false;
			}
		}

		function before(date1, date2) {
			return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) <= new Date(date2.getFullYear(), date2.getMonth(), date2.getDate() - 1);
		}

		$scope.dateClass = function (day) {
			if (!day) {
				return "empty";
			}
			else {
				var date = day.date;

				if (dateOutOfRange(date)) {
					return "disabled"
				}
				else if (calendar.date.valueOf() == day.valueOf()) {
					return "active";
				}
			}
		};

		$scope.selectDate = function (day) {
			var date = day.date.getDate();

			if (dateOutOfRange(date)) {
				return;
			}

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