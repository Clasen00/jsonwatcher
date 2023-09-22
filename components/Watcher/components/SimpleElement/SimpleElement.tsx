import React, {
	useRef, useState,
} from 'react';
import styles from './SimpleElement.module.css';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import InputWithType from './components/InputWithType';
import { getInputType } from '@/lib/utils/inputType';

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

interface IObjectProps {
  id: string
  type: string
  value: string
}
export default function SimpleElement({ id, type, value }: IObjectProps): React.JSX.Element {
	const elementRef = useRef<HTMLInputElement>(null);
	const [hasInputForEdit, setHasInputForEdit] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);

	const handleChange = (valueFromChange: string) => {
		setCurrentValue(valueFromChange);
	};

	const showEditor = () => {
		setHasInputForEdit(true);
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
				onKeyUp={showEditor}
				className={`${styles.json__value} ${cssClass(type)} ${!hasInputForEdit ? '' : styles.hidden}`}
				onClick={showEditor}
			>
				{currentValue}
			</div>
			{hasInputForEdit ? (
				<InputWithType type={getInputType(type, currentValue) as TInputType} value={currentValue} onChange={handleChange} />
			) : null}
		</div>
	);
}
