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

		$scope.$watch("currentYear", function (newYear, oldYear) {
			$scope.calendar.year = newYear;
		});

		$scope.$watch("currentMonth", function (newMonth, oldMonth) {
			$scope.calendar.month = newMonth;
		});

		$scope.$watch("currentDate", function (newDate, oldDate) {
		});

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

				if (dateOutOfRange(date)) {
					return "day disabled"
				}
				else if ($scope.currentDate == date.getDate()) {
					return "active today";
				}
				else if (date) {
					return "day";
				}
			}
		};

		$scope.monthClass = function (month) {
			if ($scope.currentMonth == month) {
				return "active month";
			} else {
				return "month";
			}
		};

		$scope.yearClass = function (year) {
			if ($scope.currentYear == year) {
				return "active year";
			} else {
				return "year";
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
			$scope.currentMonth = month;
			$scope.switchView(0);
		};

		$scope.selectYear = function (year) {
			$scope.currentYear = year;
			$scope.switchView(1);
		};

		$scope.currentMonthStr = function () {
			return $scope.calendar.year + "年 " + Calendar._months[$scope.calendar.month];
		};

		$scope.currentAgeStr = function () {
			var startIndex = Math.floor($scope.calendar.year / 10) * 10 + 1;
			return startIndex + " - " + (startIndex + 9);
		};

		$scope.switchView = function (view) {
			//0：日期；1：月；2：年
			$scope.viewMode = view;
		};
	}
}