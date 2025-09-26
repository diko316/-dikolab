import { Usecase } from '../classes/usecase.class.mjs';

function defineUsecase(title, roles, goal, handler) {
    return new Usecase(title, roles, goal, handler);
}

export { defineUsecase };
//# sourceMappingURL=define-usecase.function.mjs.map
