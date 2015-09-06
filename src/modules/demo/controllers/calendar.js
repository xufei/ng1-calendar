export default class CalendarController {
	constructor($scope) {
		$scope.now = new Date(2011, 2, 3);
		$scope.min = new Date(2015, 8, 3);
		$scope.max = new Date(2016, 2, 1);
	}
}

CalendarController.$inject = ["$scope"];