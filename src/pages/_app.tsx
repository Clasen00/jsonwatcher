import type { AppProps } from 'next/app';
import { initStore } from '@/store';
import { Provider } from 'react-redux';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const store = initStore();

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
