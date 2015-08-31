"use strict";

import angular from "angular";

import CalendarController from "./controllers/calendar";
import CalendarDirective from "./directives/calendar";

export default angular.module("components.calendar", [])
	.controller("CalendarController", CalendarController)
	.directive('ngCalendar', CalendarDirective)
	.name;