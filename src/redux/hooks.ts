import { useSelector, useDispatch, type TypedUseSelectorHook } from 'react-redux';
import type { ApplicationDispatch, ApplicationState } from './store';

export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;
