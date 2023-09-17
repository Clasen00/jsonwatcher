import { useAppDispatch } from '@/lib/hooks/useAppDispatcher'
import { setJson } from '@/store/slices/CommonSlice'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Watcher } from './components/watcher/watcher'

type Json = {
  name: object
}

export const getServerSideProps = (async (context) => {
  const res = await fetch('http://localhost:3000/generated.json')
  const json = await res.json()
  return { props: { json } }
}) satisfies GetServerSideProps<{
  json: Json
}>

export default function Index({
  json,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useAppDispatch()
  dispatch(setJson(json))

  return (
    <Watcher />
  )
}