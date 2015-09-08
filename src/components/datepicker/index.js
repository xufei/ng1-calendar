"use strict";

import angular from "angular";

import DatePickerDirective from "./directives/datepicker";

import DirectiveFactory from "../../utils/directive";

export default angular.module("components.datepicker", [])
	.directive("ngDatePicker", DirectiveFactory.create(DatePickerDirective))
	.name;