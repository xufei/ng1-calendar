import "../css/datepicker.css";
import template from "../templates/datepicker.html";
//import Calendar from "../../../models/calendar/calendar";

export default class DatePickerDirective {
	constructor($document, $filter) {
		// 视图模式，一个三个，可以切换，默认是显示日期的
		this.ViewStates = Object.freeze({
			DATE: 0,
			MONTH: 1,
			YEAR: 2
		});

		this.template = template;
		this.restrict = "E";

		this.scope = {
			placeholder: "=",
			currentDate: "=ngModel"
		};

		this.$document = $document;
		this.$filter = $filter;
	}

	link(scope, element, attrs) {
		this.$scope = scope;
		scope.placeholder = scope.placeholder || "请选择日期";

		this.$document.on("click", function (evt) {
			var src = evt.srcElement ? evt.srcElement : evt.target;
			if ((scope.pop) && (!element[0].contains(src))) {
				scope.pop = false;
				scope.currentDate = scope.selectedDate;
				scope.$digest();
			}
		});
	}

	controller($scope) {
		$scope.$watch("currentDate", function(newDate) {
			$scope.selectedDate = newDate;
			//$scope.currentDateStr = this.$filter('date')(newDate, "yyyy-MM-dd HH:mm:ss");
		});
	}
}

DatePickerDirective.$inject = ["$document", "$filter"];