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
			scope.currentYear = scope.$parent.$eval(attrs["initYear"]);
		}
		else {
			scope.currentYear = now.getFullYear();
		}

		if (attrs["initMonth"]) {
			scope.currentMonth = scope.$parent.$eval(attrs["initMonth"]);
		}
		else {
			scope.currentMonth = now.getMonth();
		}

		if (attrs["initDate"]) {
			scope.currentDate = scope.$parent.$eval(attrs["initDate"]);
		}
		else {
			scope.currentDate = now.getDate();
		}
	}

	controller($scope) {
		$scope.calendar = new Calendar();

		$scope.viewMode = this.ViewStates.DATE;

		function dateOutOfRange(date) {
			if (($scope.minDate && before(new Date($scope.currentYear, $scope.currentMonth, date), $scope.minDate))
				|| ($scope.maxDate && before($scope.maxDate, new Date($scope.currentYear, $scope.currentMonth, date)))) {
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

				/*if (dateOutOfRange(date)) {
					return "day disabled"
				}
				else*/ if ($scope.currentDate == date.getDate()) {
					return "active today";
				}
				else if (date) {
					return "day";
				}
			}
		};

		$scope.selectDate = function (day, dblClick) {
			// 标记这个是不是双击引发的
			$scope.dblClick = dblClick;

			var date = day.date.getDate();

			if (dateOutOfRange(date)) {
				return;
			}

			if (date) {
				if (date == $scope.currentDate) {
					$scope.$emit("sn.controls.calendar:dateChanged", date);
				} else {
					$scope.currentDate = date;
				}
			}
		};

		$scope.selectMonth = function (month) {
			$scope.calendar.month = month;
			$scope.viewMode = this.ViewStates.DATE;
		}.bind(this);

		$scope.selectYear = function (year) {
			$scope.calendar.year = year;
			$scope.viewMode = this.ViewStates.MONTH;
		}.bind(this);
	}
}