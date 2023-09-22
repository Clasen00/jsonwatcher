import { RefObject, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!ref.current?.contains(event.target as Node)) {
				callback();
			}
		};

		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, [ref, callback]);
};
