import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { AppDispatch, AppStore } from './app/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
