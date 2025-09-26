'use strict';

var privateParts = require('@dikolab/private-parts');
var EventEmitter = require('events');

const ID_KEY = Symbol('ID');
const NAME_KEY = Symbol('Name');
const TYPE_KEY = Symbol('Type');
const TITLE_KEY = Symbol('Title');
const ACTOR_KEY = Symbol('Actor');
const ROLES_KEY = Symbol('Roles');
const ROLE_NAMES_KEY = Symbol('Role Names');
const BOUNDARY_KEY = Symbol('Boundary');
const SUBTYPE_KEY = Symbol('Subtype');
const GOAL_KEY = Symbol('Goal');
const HANDLER_KEY = Symbol('Handler');
const TRANSACTION_SESSION = Symbol('Transaction Session');
const TRANSACTION_SIGNATURE = Symbol('Transaction Signature');

const SYMBOL_LOOKUP = new Map();

function createSymbolId(typeOrId, name) {
    if (typeof name === 'string') {
        return `${typeOrId}<${name}>`;
    }
    return typeOrId;
}

const EVENT_EMITTER_KEY = Symbol('Event Emitter');

class UsecaseSymbol {
    get [TYPE_KEY]() {
        return privateParts.get(this, TYPE_KEY);
    }
    get [NAME_KEY]() {
        return privateParts.get(this, NAME_KEY);
    }
    get [ID_KEY]() {
        return privateParts.get(this, ID_KEY);
    }
    get [EVENT_EMITTER_KEY]() {
        return privateParts.get(this, EVENT_EMITTER_KEY);
    }
    constructor(type, name) {
        const id = createSymbolId(type, name);
        // symbols are unique
        if (SYMBOL_LOOKUP.has(id)) {
            throw new ReferenceError(`Symbol ${id} already exist.`);
        }
        privateParts.set(this, EVENT_EMITTER_KEY, new EventEmitter({
            captureRejections: true,
        }));
        privateParts.set(this, TYPE_KEY, type);
        privateParts.set(this, NAME_KEY, name);
        privateParts.set(this, ID_KEY, id);
        // register to symbol lookup
        SYMBOL_LOOKUP.set(id, this);
    }
    toString() {
        return this[ID_KEY];
    }
    toJSON() {
        return {
            type: this[TYPE_KEY],
            name: this[NAME_KEY],
        };
    }
}

const ACTOR_TYPE = 'Actor';
const ROLE_TYPE = 'Role';
const BOUNDARY_TYPE = 'Boundary';
const USECASE_TYPE = 'Usecase';
const GOAL_TYPE = 'Goal';

class Actor extends UsecaseSymbol {
    get [ROLES_KEY]() {
        return privateParts.get(this, ROLES_KEY);
    }
    constructor(name, roles) {
        super(ACTOR_TYPE, name);
        privateParts.set(this, ROLES_KEY, roles);
    }
    toJSON() {
        const roles = this[ROLES_KEY].map((role) => role[NAME_KEY]);
        return {
            ...super.toJSON(),
            roles: roles,
        };
    }
}

class Role extends UsecaseSymbol {
    constructor(name) {
        super(ROLE_TYPE, name);
    }
}

function defineRole(name) {
    return new Role(name);
}

function getSymbolById(typeOrId, name) {
    const fullId = typeof name === 'string'
        ? createSymbolId(typeOrId, name)
        : createSymbolId(typeOrId);
    if (SYMBOL_LOOKUP.has(fullId)) {
        return SYMBOL_LOOKUP.get(fullId);
    }
    return null;
}

function getOrDefineRoles(...roleNames) {
    return roleNames.map((name) => {
        if (typeof name !== 'string') {
            throw new TypeError(`"${name}" in roleNames parameter is invalid.`);
        }
        return getSymbolById(ROLE_TYPE, name) || defineRole(name);
    });
}

function defineActor(name, ...roleOrNames) {
    if (!name || typeof name !== 'string') {
        throw new TypeError(`"${name}" name parameter is invald.`);
    }
    // get role or create if do not exist!
    const [role] = getOrDefineRoles(name);
    const others = getOrDefineRoles(...roleOrNames);
    const roles = [role, ...others];
    return new Actor(name, roles);
}

class IAmChain {
    get [TITLE_KEY]() {
        return privateParts.get(this, TITLE_KEY);
    }
    constructor(actorName) {
        privateParts.set(this, TITLE_KEY, actorName);
    }
    as(...roles) {
        return defineActor(this[TITLE_KEY], ...roles);
    }
}

function iAm(name) {
    if (!name || typeof name !== 'string') {
        throw new TypeError(`"${name}" name parameter is invald.`);
    }
    return new IAmChain(name);
}

const BOUNDARY_NAME_PATTERN = /^([^:]+):(.+)$/;
function createBoundaryNameDetails(name) {
    if (!BOUNDARY_NAME_PATTERN.test(name)) {
        throw new SyntaxError(`${name} Boundary Name is malformed.`);
    }
    const [rawType, rawTitle] = name
        .match(BOUNDARY_NAME_PATTERN)
        ?.slice(1) || ['', ''];
    const type = rawType.trim();
    const title = rawTitle.trim();
    const id = `${type}:${title}`;
    return [type, title, id];
}

class Boundary extends UsecaseSymbol {
    get [SUBTYPE_KEY]() {
        return privateParts.get(this, SUBTYPE_KEY);
    }
    get [TITLE_KEY]() {
        return privateParts.get(this, TITLE_KEY);
    }
    constructor(type, title) {
        super(BOUNDARY_TYPE, `${type}:${title}`);
        privateParts.set(this, SUBTYPE_KEY, type);
        privateParts.set(this, TITLE_KEY, title);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            subtype: this[SUBTYPE_KEY],
        };
    }
}

function defineBoundary(type, title) {
    return new Boundary(type, title);
}

function createGoalName(title, boundary) {
    const boundaryName = boundary[NAME_KEY];
    return `${boundaryName}-${title}`;
}

class Goal extends UsecaseSymbol {
    get [TITLE_KEY]() {
        return privateParts.get(this, TITLE_KEY);
    }
    get [BOUNDARY_KEY]() {
        return privateParts.get(this, BOUNDARY_KEY);
    }
    constructor(title, boundary) {
        super(GOAL_TYPE, createGoalName(title, boundary));
        privateParts.set(this, TITLE_KEY, title);
        privateParts.set(this, BOUNDARY_KEY, boundary);
    }
}

function defineGoal(title, boundary) {
    return new Goal(title, boundary);
}

function getRoleName(role) {
    return privateParts.get(role, NAME_KEY);
}

function getBoundaryName(boundary) {
    return privateParts.get(boundary, NAME_KEY);
}

function getGoalBoundary(goal) {
    return privateParts.get(goal, BOUNDARY_KEY);
}

function getGoalTitle(goal) {
    return privateParts.get(goal, TITLE_KEY);
}

function createUsecaseTitle(title, goal, ...roles) {
    const rolesNames = roles
        .map((role) => getRoleName(role))
        .join(',');
    const goalTitle = getGoalTitle(goal);
    const boundaryName = getBoundaryName(getGoalBoundary(goal));
    return `As Role<${rolesNames}>, I can ${title} in ${boundaryName}. So that, ${goalTitle}`;
}

function getSymbolName(usecaseSymbol) {
    return usecaseSymbol[NAME_KEY];
}

class Usecase extends UsecaseSymbol {
    get [TITLE_KEY]() {
        return privateParts.get(this, TITLE_KEY);
    }
    get [ROLES_KEY]() {
        return privateParts.get(this, ROLES_KEY);
    }
    get [GOAL_KEY]() {
        return privateParts.get(this, GOAL_KEY);
    }
    get [HANDLER_KEY]() {
        return privateParts.get(this, HANDLER_KEY);
    }
    get [BOUNDARY_KEY]() {
        return privateParts.get(this[GOAL_KEY], BOUNDARY_KEY);
    }
    constructor(title, roles, goal, handler) {
        super(USECASE_TYPE, createUsecaseTitle(title, goal, ...roles));
        privateParts.set(this, TITLE_KEY, title);
        privateParts.set(this, ROLES_KEY, roles);
        privateParts.set(this, HANDLER_KEY, handler);
        privateParts.set(this, GOAL_KEY, goal);
    }
    toString() {
        return getSymbolName(this);
    }
}

function defineUsecase(title, roles, goal, handler) {
    return new Usecase(title, roles, goal, handler);
}

class AsICanSoThatChain {
    // InBoundary
    get [BOUNDARY_KEY]() {
        return privateParts.get(this, BOUNDARY_KEY);
    }
    get [ROLE_NAMES_KEY]() {
        return privateParts.get(this, ROLE_NAMES_KEY);
    }
    get [TITLE_KEY]() {
        return privateParts.get(this, TITLE_KEY);
    }
    get [GOAL_KEY]() {
        return privateParts.get(this, GOAL_KEY);
    }
    constructor(boundary, roleNames, title, goal) {
        privateParts.set(this, BOUNDARY_KEY, boundary);
        privateParts.set(this, ROLE_NAMES_KEY, roleNames);
        privateParts.set(this, TITLE_KEY, title);
        privateParts.set(this, GOAL_KEY, goal);
    }
    implementedAs(handler) {
        const roles = getOrDefineRoles(...this[ROLE_NAMES_KEY]);
        const title = this[TITLE_KEY];
        const goal = this[GOAL_KEY];
        return defineUsecase(title, roles, goal, handler);
    }
}

class AsICanChain {
    get [BOUNDARY_KEY]() {
        return privateParts.get(this, BOUNDARY_KEY);
    }
    get [ROLE_NAMES_KEY]() {
        return privateParts.get(this, ROLE_NAMES_KEY);
    }
    get [TITLE_KEY]() {
        return privateParts.get(this, TITLE_KEY);
    }
    constructor(boundary, roleNames, title) {
        privateParts.set(this, BOUNDARY_KEY, boundary);
        privateParts.set(this, ROLE_NAMES_KEY, roleNames);
        privateParts.set(this, TITLE_KEY, title);
    }
    soThat(goal) {
        return new AsICanSoThatChain(this[BOUNDARY_KEY], this[ROLE_NAMES_KEY], this[TITLE_KEY], goal);
    }
}

class AsChain {
    get [BOUNDARY_KEY]() {
        return privateParts.get(this, BOUNDARY_KEY);
    }
    get [ROLE_NAMES_KEY]() {
        return privateParts.get(this, ROLE_NAMES_KEY);
    }
    constructor(boundary, roleNames) {
        privateParts.set(this, BOUNDARY_KEY, boundary);
        privateParts.set(this, ROLE_NAMES_KEY, roleNames);
    }
    iCan(actionTitle) {
        return new AsICanChain(this[BOUNDARY_KEY], this[ROLE_NAMES_KEY], actionTitle);
    }
}

class Scope {
    get [BOUNDARY_KEY]() {
        return privateParts.get(this, BOUNDARY_KEY);
    }
    constructor(boundary) {
        privateParts.set(this, BOUNDARY_KEY, boundary);
    }
    defineGoal(title) {
        return defineGoal(title, this[BOUNDARY_KEY]);
    }
    /**
     * Creates definition of Roles that can execute the Use-case
     *
     * @param roles Role names or Roles included in the context
     * @returns definition chain object
     */
    as(...roles) {
        const roleNames = roles.map((roleOrName) => {
            if (typeof roleOrName === 'string') {
                return roleOrName;
            }
            if (roleOrName instanceof Role) {
                return roleOrName[NAME_KEY];
            }
            throw new TypeError(`Role parameter ${roleOrName} is invalid.`);
        });
        return new AsChain(this[BOUNDARY_KEY], roleNames);
    }
}

function defineScope(name) {
    const [type, title] = createBoundaryNameDetails(name);
    const boundary = defineBoundary(type, title);
    return new Scope(boundary);
}

function emitSymbolEvent(symbol, type, ...args) {
    symbol[EVENT_EMITTER_KEY].emit(type, ...args);
}

function intersectRoles(pool, target) {
    const set = new WeakSet(pool);
    return target.filter((role) => set.has(role));
}

function isActorAllowToPerform(actor, roles) {
    return intersectRoles(roles, actor[ROLES_KEY]).length > 0;
}

function createSessionData(data) {
    return Object.keys(data).reduce((newData, key) => {
        privateParts.set(newData, key, data[key]);
        Object.defineProperty(newData, key, {
            enumerable: true,
            configurable: false,
            get() {
                return privateParts.get(newData, key);
            },
        });
        return newData;
    }, {});
}

class Transaction {
    [TRANSACTION_SIGNATURE] = 1;
    get [ACTOR_KEY]() {
        return privateParts.get(this, ACTOR_KEY);
    }
    get [TRANSACTION_SESSION]() {
        return privateParts.get(this, TRANSACTION_SESSION);
    }
    constructor(data, actor) {
        privateParts.set(this, TRANSACTION_SESSION, data);
        privateParts.set(this, ACTOR_KEY, actor);
    }
    get(name) {
        const session = this[TRANSACTION_SESSION];
        return Object.prototype.hasOwnProperty.call(session, name)
            ? session[name]
            : undefined;
    }
    override(overrides) {
        const session = this[TRANSACTION_SESSION];
        const newData = Object.assign({}, session, overrides);
        return new Transaction(newData, this[ACTOR_KEY]);
    }
    async perform(usecase, ...params) {
        const roles = usecase[ROLES_KEY];
        const actor = this[ACTOR_KEY];
        if (!isActorAllowToPerform(actor, roles)) {
            throw new Error(`${this[ACTOR_KEY]} is not allowed to perform "${usecase}"`);
        }
        const handler = usecase[HANDLER_KEY];
        const transaction = new Transaction(createSessionData(this[TRANSACTION_SESSION]), actor);
        const result = await handler(...params, transaction);
        return result;
    }
}

function assume(actor) {
    const transaction = new Transaction({}, actor);
    if (actor instanceof Actor) {
        emitSymbolEvent(actor, 'assume', actor);
    }
    return transaction;
}

function listenSymbolEvent(symbol, type, listener) {
    symbol[EVENT_EMITTER_KEY].on(type, listener);
}

function unlistenSymbolEvent(symbol, type, listener) {
    symbol[EVENT_EMITTER_KEY].removeListener(type, listener);
}

function clearAllSymbolListeners() {
    let eventEmitter;
    SYMBOL_LOOKUP.forEach((symbol) => {
        eventEmitter = symbol[EVENT_EMITTER_KEY];
        eventEmitter
            .eventNames()
            .forEach((key) => eventEmitter?.removeAllListeners(key));
    });
    eventEmitter = null;
}

function clearSymbolEventListeners(symbol, type) {
    symbol[EVENT_EMITTER_KEY].removeAllListeners(type);
}

function clearSymbols() {
    SYMBOL_LOOKUP.clear();
}

exports.Transaction = Transaction;
exports.assume = assume;
exports.clearAllListeners = clearAllSymbolListeners;
exports.clearListeners = clearSymbolEventListeners;
exports.clearSymbols = clearSymbols;
exports.defineScope = defineScope;
exports.iAm = iAm;
exports.listen = listenSymbolEvent;
exports.unlisten = unlistenSymbolEvent;
//# sourceMappingURL=index.js.map
