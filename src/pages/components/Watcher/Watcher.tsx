import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { selectJson } from '@/store/slices/CommonSlice';
import React, { ReactNode } from 'react';
import NestedElement from './components/NestedElement';
import SimpleElement from './components/SimpleElement';
import styles from './Watcher.module.css';

export function Watcher() {
	const json = useAppSelector(selectJson);

	function createItem(key: string, value: string, type: string) {
		return (
			<SimpleElement id={key} value={value} type={type} />
		);
	}

	function createCollapsibleItem(key: string, type: string, children: ReactNode) {
		return (
			<NestedElement id={key} value={type} type={type}>
				{children}
			</NestedElement>
		);
	}

	function handleChildren(key: string, value: object, type: string) {
		const html = () => (
			<>
				{
					Object.keys(value).map((key): React.JSX.Element => {
						return handleItem(key, value[key as keyof typeof value]);
					})
				}
			</>
		);

		return createCollapsibleItem(key, type, html());
	}

	function handleItem(key: string, value: any): React.JSX.Element {
		const type = typeof value;

		if (typeof value === 'object') {
			return handleChildren(key, value, type);
		}

		return createItem(key, value, type);
	}

	const parseJson = (jsonObj: object) => (
		<div className={styles.json}>
			{
				Object.keys(jsonObj).map((key): React.JSX.Element => {
					return handleItem(key, jsonObj[key as keyof typeof jsonObj]);
				})
			}
		</div>
	);

	return (
		<div>
			{parseJson(json)}
		</div>
	);
}
