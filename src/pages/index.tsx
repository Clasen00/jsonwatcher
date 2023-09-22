import { useAppDispatch } from '@/lib/hooks/useAppDispatcher';
import { setJson } from '@/store/slices/CommonSlice';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import React from 'react';
import Watcher from '../../components/Watcher/Watcher';

type TJson = {
  name: object
}

export const getServerSideProps = (async () => {
	const res = await fetch('http://localhost:3000/generated.json');
	const json = await res.json();
	return { props: { json } };
}) satisfies GetServerSideProps<{
  json: TJson
}>;

export default function Index({
	json,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const dispatch = useAppDispatch();
	dispatch(setJson(json));

	return (
		<Watcher />
	);
}
