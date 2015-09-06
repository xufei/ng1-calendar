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
			maxDate: "=",
			defaultDate: "="
		};
	}

	link(scope, element, attrs) {
		this.$scope = scope;
	}

	controller($scope) {
		let calendar = new Calendar();
		$scope.calendar = calendar;

		if ($scope.defaultDate) {
			calendar.year = $scope.defaultDate.getFullYear();
			calendar.month = $scope.defaultDate.getMonth();
			calendar.date = $scope.defaultDate.getDate();
		}

		$scope.viewMode = this.ViewStates.DATE;

		$scope.dateInRange = function(day) {
			if (!day) {
				return true;
			}

			if ($scope.minDate) {
				if (day.date - $scope.minDate < 0) {
					return false;
				}
			}
			if ($scope.maxDate) {
				if (day.date - $scope.maxDate > 0) {
					return false;
				}
			}
			return true;
		};

		$scope.selectDate = function (day) {
			if ($scope.dateInRange(day)) {
				calendar.selectedDate = day;
			}
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