"use strict";

import calendar from "./calendar/index";
import datePicker from "./datepicker/index";

export default angular.module("components", [calendar, datePicker])
	.name;