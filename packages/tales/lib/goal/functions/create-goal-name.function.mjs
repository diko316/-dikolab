import { NAME_KEY } from '../../utils/constants/symbol-keys.constant.mjs';

function createGoalName(title, boundary) {
    const boundaryName = boundary[NAME_KEY];
    return `${boundaryName}-${title}`;
}

export { createGoalName };
//# sourceMappingURL=create-goal-name.function.mjs.map
