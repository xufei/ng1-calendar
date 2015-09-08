"use strict";

import angular from "angular";

import CalendarDirective from "./directives/calendar";

import DirectiveFactory from "../../utils/directive";

export default angular.module("components.calendar", [])
	.directive("ngCalendar", DirectiveFactory.create(CalendarDirective))
	.name;