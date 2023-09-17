import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { selectJson } from "@/store/slices/CommonSlice";
import { FC } from "react";

export const Watcher: FC = () => {
    const json = useAppSelector(selectJson)
console.log(json)
    return (
        <div>
            <pre>
                {JSON.stringify(json)}
            </pre>
        </div>
    )
}