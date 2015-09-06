export default class CalendarController {
	constructor($scope) {
		$scope.now = new Date(2011, 2, 3);

		this.now = new Date(2011, 2, 3);
	}
}

//CalendarController.$inject = ["$scope"];