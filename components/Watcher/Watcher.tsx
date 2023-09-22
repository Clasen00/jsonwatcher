import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { selectJson } from '@/store/slices/CommonSlice';
import React, { ReactNode, useCallback, useMemo } from 'react';
import NestedElement from './components/NestedElement';
import SimpleElement from './components/SimpleElement';
import styles from './Watcher.module.css';

function Watcher() {
	const json = useAppSelector(selectJson);

	const createSimpleElement = (key: string, value: string, type: string) => {
		return (
			<SimpleElement key={key} id={key} value={value} type={type} />
		);
	};

	const createNestedElement = (key: string, type: string, children: ReactNode) => {
		return (
			<NestedElement key={key} id={key} value={type} type={type}>
				{children}
			</NestedElement>
		);
	};

	const handleElements = useCallback((key: string, value: any): React.JSX.Element => {
		const type = typeof value;

		const handleNestedElement = (key: string, value: object, type: string) => {
			const html = () => (
				<>
					{
						Object.keys(value).map((key): React.JSX.Element => {
							return handleElements(key, value[key as keyof typeof value]);
						})
					}
				</>
			);

			return createNestedElement(key, type, html());
		};

		if (typeof value === 'object') {
			return handleNestedElement(key, value, type);
		}

		return createSimpleElement(key, value, type);
	}, []);

	const parseJson = useMemo(() => {
		return function (jsonObj: object) {
			return (
				<div className={styles.json}>
					{
						Object.keys(jsonObj).map((key): React.JSX.Element => {
							// eslint-disable-next-line react/destructuring-assignment
							return handleElements(key, jsonObj[key as keyof typeof jsonObj]);
						})
					}
				</div>
			);
		};
	}, [handleElements]);

	return (
		<div>
			{parseJson(json)}
		</div>
	);
}

export default React.memo(Watcher);
