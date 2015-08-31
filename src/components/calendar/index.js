"use strict";

import angular from "angular";

import CalendarDirective from "directives/calendar";

export default angular.module("components.calendar", [])
	.directive('ngCalendar', CalendarDirective)
	.name;