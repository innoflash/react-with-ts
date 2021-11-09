import React, { useReducer } from 'react';

export interface InputState {
	value: string;
	touched: boolean;
}

export type ActionType = {
	type: string,
	[key: string]: string | null
}

export type InputUseResult = InputState & {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onBlur: () => void,
	hasError: boolean,
	valid: boolean
};

const reduceTypes = {
	VALUE_CHANGE: 'value_change',
	BLUR: 'blur'
};

const initialState: InputState = {
	value: '',
	touched: false
};

const inputReducer = (state: InputState, action: ActionType): InputState => {
	console.log({ state, action });
	const actionsMap = {
		[reduceTypes.VALUE_CHANGE]: () => ({ value: action.value, touched: true }),
		[reduceTypes.BLUR]: () => ({ touched: true })
	};

	return { ...state, ...actionsMap[action.type]() || {} };
};

const useInput = (validate: (value: string) => boolean): InputUseResult => {
	const [inputState, dispatchInputState] = useReducer(inputReducer, initialState);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatchInputState({
		type: reduceTypes.VALUE_CHANGE,
		value: event.target.value
	});

	const onBlur = () => dispatchInputState({ type: reduceTypes.BLUR });

	//check for input validity.
	const isValid = validate(inputState.value);
	const hasError = !isValid && inputState.touched;

	return {
		...inputState,
		valid: isValid,
		hasError,
		onChange,
		onBlur
	};
};

export default useInput;