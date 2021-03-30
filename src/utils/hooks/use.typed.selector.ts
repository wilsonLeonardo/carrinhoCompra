import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { ApplicationState } from '../../services/ducks';

export const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
