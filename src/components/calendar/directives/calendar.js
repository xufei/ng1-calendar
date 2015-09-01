import "../css/calendar.css";
import template from "../templates/calendar.html";
import Calendar from "../../../models/calendar/calendar";

export default class CalendarDirective {
	constructor() {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			minDate: "=",
			maxDate: "="
		};
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

	controller($scope) {
		let calendar = new Calendar();
		$scope.calendar = calendar;

		$scope.viewMode = 0;

		function init() {
			var now = new Date();
			$scope.currentYear = $scope.currentYear || now.getFullYear();
			$scope.currentMonth = $scope.currentMonth || now.getMonth();
			$scope.currentDate = $scope.currentDate || now.getDate();
		}

		init();

		$scope.$watch("currentYear", function (newYear, oldYear) {
			calendar.year = newYear;
		});

		$scope.$watch("currentMonth", function (newMonth, oldMonth) {
			calendar.month = newMonth;
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

		$scope.dateClass = function (date) {
			if (!angular.isNumber(date)) {
				return "empty";
			}
			else if (dateOutOfRange(date)) {
				return "day disabled"
			}
			else if ($scope.currentDate == date) {
				return "active today";
			}
			else if (date) {
				return "day";
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

		$scope.selectDate = function (date, dblClick) {
			// 标记这个是不是双击引发的
			$scope.dblClick = dblClick;

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
			return $scope.currentYear + "年 " + Calendar._months[$scope.currentMonth];
		};

		$scope.currentAgeStr = function () {
			var startIndex = Math.floor($scope.currentYear / 10) * 10 + 1;
			return startIndex + " - " + (startIndex + 9);
		};

		function resetDate() {
			var current = new Date($scope.currentYear, $scope.currentMonth, $scope.currentDate);

			$scope.currentYear = current.getFullYear();
			$scope.currentMonth = current.getMonth();
			$scope.currentDate = current.getDate();
		}

		$scope.switchView = function (view) {
			//0：日期；1：月；2：年
			$scope.viewMode = view;
		};
	}
}