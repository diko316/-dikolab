import { MOCK_HANDLER_KEY } from '../../utils/constants/symbol-keys.constant.mjs';

function clearMockeUsecaseHandler(usecase) {
    usecase[MOCK_HANDLER_KEY] = null;
    return usecase;
}

export { clearMockeUsecaseHandler };
//# sourceMappingURL=clear-mock-usecase-handler.function.mjs.map
