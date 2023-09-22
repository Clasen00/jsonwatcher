import React from 'react';
import { TInputType } from '../SimpleElement';

interface IInputProps {
  type: TInputType
  value: any
  onChange: (value: string, id: string) => void
}

const getUniqId = () => {
	return Math.random().toString(16).slice(2) + (new Date()).getTime();
};

const getInput = (value: string, type: string, onChange: (value: string, id: string) => void) => {
	return (
		<input
			type={type}
			id={getUniqId()}
			value={value}
			onChange={event => onChange(event.target.value, event.target.id)}
		/>
	);
};

export const getInputByType = ({ type, value, onChange }: IInputProps) => {
	switch (type) {
	case 'boolean':
		return (
			<>
				{getInput(value, 'checkbox', onChange)}
			</>
		);
	case 'number':
		return (
			<>
				{getInput(value, 'number', onChange)}
			</>
		);
	case 'email':
		return (
			<>
				{getInput(value, 'email', onChange)}
			</>
		);
	case 'date':
		return (
			<>
				{getInput(value, 'date', onChange)}
			</>
		);
	case 'loongtext':
		return (
			<textarea
				name=""
				id={getUniqId()}
				cols={30}
				rows={10}
				value={value}
				onChange={event => onChange(event.target.value, event.target.id)}
			/>
		);
	case 'string':
		return (
			<>
				{getInput(value, 'text', onChange)}
			</>
		);
	default: return <span />;
	}
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

export const getCustomInputType = (value: string) => {
	if (isEmail(value)) {
		return 'email';
	}

	if (isDate(value)) {
		return 'date';
	}

	return '';
};
