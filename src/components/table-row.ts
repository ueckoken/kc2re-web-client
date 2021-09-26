import { generateActionDropdown } from "./action-dropdown"
import { FlatInstance } from "./table-rows"

type Props = {
    instance: FlatInstance
    onStartClick?: (event: MouseEvent, instance: FlatInstance) => void
    onStopClick?: (event: MouseEvent, instance: FlatInstance) => void
    onRestartClick?: (event: MouseEvent, instance: FlatInstance) => void
    onDestroyClick?: (event: MouseEvent, instance: FlatInstance) => void
}

export const generateTableRow = ({
    instance,
    onStartClick,
    onStopClick,
    onRestartClick,
    onDestroyClick,
}: Props): HTMLTableRowElement => {
    const $tr = document.createElement("tr")
    const $status = document.createElement("td")
    $status.textContent = instance.status
    const $instanceName = document.createElement("td")
    $instanceName.textContent = instance.name
    const $address = document.createElement("td")
    const $addressList = document.createElement("ul")
    $addressList.classList.add("list-unstyled", "mb-0")
    for (const address of instance.addresses) {
        const $li = document.createElement("li")
        $li.textContent = address.address + "/" + address.netmask
        $addressList.append($li)
    }
    $address.append($addressList)
    const $hostName = document.createElement("td")
    $hostName.textContent = instance.host
    const $actions = document.createElement("td")
    $actions.classList.add("text-end")
    const $dropdown = generateActionDropdown({
        instance,
        onStartClick: (event) => {
            onStartClick?.(event, instance)
        },
        onStopClick: (event) => {
            onStopClick?.(event, instance)
        },
        onRestartClick: (event) => {
            onRestartClick?.(event, instance)
        },
        onDestroyClick: (event) => {
            onDestroyClick?.(event, instance)
        },
    })
    $actions.append($dropdown)
    $tr.append(
        $status,
        $instanceName,
        $address,
        $hostName,
        $actions
    )
    return $tr
}
