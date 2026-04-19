import {
  getRoleName
} from "./chunk-NQGCVMYI.mjs";
import {
  getBoundaryName
} from "./chunk-67JGDFGE.mjs";
import {
  getGoalBoundary
} from "./chunk-H2F5IBXB.mjs";
import {
  getGoalTitle
} from "./chunk-CYZVMAVA.mjs";

// src/usecase/functions/create-usecase-title.function.ts
function createUsecaseTitle(title, goal, ...roles) {
  const rolesNames = roles.map((role) => getRoleName(role)).join(",");
  const goalTitle = getGoalTitle(goal);
  const boundaryName = getBoundaryName(getGoalBoundary(goal));
  return `As Role<${rolesNames}>, I can ${title} in ${boundaryName}. So that, ${goalTitle}`;
}

export {
  createUsecaseTitle
};
//# sourceMappingURL=chunk-AYHS67CE.mjs.map
