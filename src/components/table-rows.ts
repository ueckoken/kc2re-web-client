import { Host } from ".."
import { Instance } from "../message"
import { generateTableRow } from "./table-row"

type Props = {
    hosts: Host[]
    onStartClick?: (event: MouseEvent, instance: FlatInstance) => void
    onStopClick?: (event: MouseEvent, instance: FlatInstance) => void
    onRestartClick?: (event: MouseEvent, instance: FlatInstance) => void
    onDestroyClick?: (event: MouseEvent, instance: FlatInstance) => void
}

export type FlatInstance = Instance & {
    host: string
    updatedAt: Date
}

export function* generateTableRows({
    hosts,
    onStartClick,
    onStopClick,
    onRestartClick,
    onDestroyClick,
}: Props) {
    for (const host of hosts) {
        for (const instance of host.instances) {
            const flatInstance: FlatInstance = {
                ...instance,
                host: host.name,
                updatedAt: host.updatedAt,
            }
            yield generateTableRow({
                instance: flatInstance,
                onStartClick,
                onStopClick,
                onRestartClick,
                onDestroyClick,
            })
        }
    }
}
