"use strict";

import CalendarController from "./controllers/calendar";

export default angular.module("modules.demo", [])
	.controller("CalendarController", CalendarController)
	.name;