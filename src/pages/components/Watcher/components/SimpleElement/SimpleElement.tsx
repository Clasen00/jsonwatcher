import React, {
	useRef, useState,
} from 'react';
import styles from './SimpleElement.module.css';
import { getInputByType, getCustomInputType } from './utils/inputType';
import { useClickOutside } from '@/lib/hooks/useClickOutside';

export type TInputType = 'string' | 'number' | 'email' | 'date' | 'boolean' | 'loongtext';

const cssClass = (type: any) => {
	switch (type) {
	case 'number':
		return styles['json__value--number'];
	case 'string':
		return styles['json__value--string'];
	case 'boolean':
		return styles['json__value--boolean'];
	default:
		return styles['json__value--string'];
	}
};

const getInputType = (type: string, value: string): TInputType => {
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

interface IObjectProps {
  id: string
  type: string
  value: string
}
export default function SimpleElement({ id, type, value }: IObjectProps): React.JSX.Element {
	const elementRef = useRef<HTMLInputElement>(null);
	const [hasInputForEdit, setHasInputForEdit] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);

	const handleValueClick = () => {
		setHasInputForEdit(!hasInputForEdit);
	};

	const handleChange = (valueFromChange: string) => {
		setCurrentValue(valueFromChange);
	};

	const hideEditor = () => {
		setHasInputForEdit(false);
	};

	useClickOutside(elementRef, hideEditor);

	return (
		<div className={styles.json__item} ref={elementRef}>
			<div className={styles.json__key}>{id}</div>
			<div
				role="button"
				tabIndex={0}
				onKeyUp={handleValueClick}
				className={`${styles.json__value} ${cssClass(type)} ${!hasInputForEdit ? '' : styles.hidden}`}
				onClick={handleValueClick}
			>
				{currentValue}
			</div>
			{hasInputForEdit ? (
				<>
					{getInputByType({
						type: getInputType(type, currentValue) as TInputType,
						value: currentValue,
						onChange: handleChange,
					})}
				</>
			) : null}
		</div>
	);
}
