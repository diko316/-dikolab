import { UsecaseSymbol } from '../../symbol/classes/usecase-symbol.class';
import { SUBTYPE_KEY, TITLE_KEY } from '../../utils/constants/symbol-keys.constant';
import { BOUNDARY_TYPE } from '../../utils/constants/symbol-tag.constant';
import { BoundaryModel } from '../types/boundary-model.interface';
export declare class Boundary<Type extends string, Title extends string> extends UsecaseSymbol<typeof BOUNDARY_TYPE, `${Type}:${Title}`> implements BoundaryModel<Type, Title> {
    get [SUBTYPE_KEY](): Type;
    get [TITLE_KEY](): Title;
    constructor(type: Type, title: Title);
    toJSON(): {
        subtype: Type;
        type: "Boundary";
        name: `${Type}:${Title}`;
    };
}
