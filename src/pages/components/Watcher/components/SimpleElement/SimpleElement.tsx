import React from 'react';
import styles from './SimpleElement.module.css';

interface IObjectProps {
  id: string
  type: string
  value: string
}

export default function SimpleElement({ id, type, value }: IObjectProps): React.JSX.Element {
	const cssClass = () => {
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

	return (
		<div className={styles.json__item}>
			<div className={styles.json__key}>{id}</div>
			<div className={`${styles.json__value} ${cssClass()}`} contentEditable>{value}</div>
		</div>
	);
}
