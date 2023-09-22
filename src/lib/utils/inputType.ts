import { TInputType } from '../../../components/Watcher/components/SimpleElement/SimpleElement';

const getCustomInputType = (value: string) => {
	if (isEmail(value)) {
		return 'email';
	}

	if (isDate(value)) {
		return 'date';
	}

	return '';
};

export const getInputType = (type: string, value: string): TInputType => {
	if (type === 'string' && value.length >= 100) {
		return 'loongtext';
	}

	if (type === 'number') {
		return 'number';
	}

	if (type === 'boolean') {
		return 'number';
	}

	const inputType = getCustomInputType(value);

	if (inputType) {
		return inputType;
	}

	return type as TInputType;
};

const isEmail = (value: string) => {
	// eslint-disable-next-line max-len,no-control-regex
	const emailRegEx = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

	return value.match(emailRegEx);
};

const isDate = (value: string) => {
	const dateRegEx = /\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/g;

	return value.match(dateRegEx);
};
