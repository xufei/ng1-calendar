"use strict";

import angular from "angular";

import CalendarController from "./controllers/calendar";
import CalendarDirective from "./directives/calendar";

import DirectiveFactory from "../../utils/directive";

export default angular.module("components.calendar", [])
	.directive('ngCalendar', DirectiveFactory.create(CalendarDirective))
	.controller("CalendarController", CalendarController)
	.name;