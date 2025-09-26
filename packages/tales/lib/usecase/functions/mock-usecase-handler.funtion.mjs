import { MOCK_HANDLER_KEY } from '../../utils/constants/symbol-keys.constant.mjs';

function mockUsecaseHandler(usecase, handler) {
    usecase[MOCK_HANDLER_KEY] = handler;
    return usecase;
}

export { mockUsecaseHandler };
//# sourceMappingURL=mock-usecase-handler.funtion.mjs.map
