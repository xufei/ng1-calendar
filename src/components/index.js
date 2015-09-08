"use strict";

import angular from "angular";

import calendar from "./calendar/index";
import datePicker from "./datepicker/index";

export default angular.module("components", [calendar, datePicker])
	.name;