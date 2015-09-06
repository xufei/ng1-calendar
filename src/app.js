import angular from "angular";

import components from "./components/index";

import schedule from "./modules/schedule/index";

angular.module("app", [components, schedule]);