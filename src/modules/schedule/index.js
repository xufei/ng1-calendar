"use strict";

import ScheduleDirective from "./directives/schedule";

import DirectiveFactory from "../../utils/directive";

export default angular.module("modules.schedule", [])
	.directive("ngSchedule", DirectiveFactory.create(ScheduleDirective))
	.name;