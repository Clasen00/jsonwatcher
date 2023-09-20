import { ReactNode } from 'react';
import React from 'react';
import styles from './NestedElement.module.css';

interface IObjectProps {
  children: ReactNode,
  id: string
  type: string
  value: string
}

export default function NestedElement({
	id, type, value, children,
}: IObjectProps): React.JSX.Element {
	return (
		<div className={`${styles.json__item} ${styles.json__itemNested}`}>
			<div className={styles.json__key}>{id}</div>
			<div className={`${styles.json__key} json__value--type--${type}`}>{value}</div>
			{children}
		</div>
	);
}
