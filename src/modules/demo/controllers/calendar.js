export default class CalendarController {
	constructor($scope) {
		$scope.now = new Date(2012, 3, 9);
		$scope.min = new Date(2015, 8, 2);
		$scope.max = new Date(2016, 2, 1);

		$scope.arr = Array.from(Array(3), (v, k) => Array.from(Array(4), (v1, k1) => new Date(2015, k * 4 + k1, 1)));
	}
}

CalendarController.$inject = ["$scope"];