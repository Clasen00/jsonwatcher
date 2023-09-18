import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { selectJson } from '@/store/slices/CommonSlice';
import React from 'react';

export function Watcher() {
	const json = useAppSelector(selectJson);

	return (
		<div>
			<pre>
				{JSON.stringify(json)}
			</pre>
		</div>
	);
}
