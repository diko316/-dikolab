import { createBoundaryNameDetails } from '../../boundary/functions/create-boundary-name-details.function.mjs';
import { defineBoundary } from '../../boundary/functions/define-boundary.function.mjs';
import { Scope } from '../classes/scope.class.mjs';

function defineScope(name) {
    const [type, title] = createBoundaryNameDetails(name);
    const boundary = defineBoundary(type, title);
    return new Scope(boundary);
}

export { defineScope };
//# sourceMappingURL=define-scope.function.mjs.map
