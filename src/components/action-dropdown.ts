import { Instance } from "../message"

type Props = {
    instance: Instance
    onStartClick?: (event: MouseEvent) => void
    onStopClick?: (event: MouseEvent) => void
    onRestartClick?: (event: MouseEvent) => void
    onDestroyClick?: (event: MouseEvent) => void
}

export const generateActionDropdown = ({
    instance,
    onStartClick,
    onStopClick,
    onRestartClick,
    onDestroyClick,
}: Props) => {
    const $dropdown = document.createElement("div")
    $dropdown.classList.add("dropdown")
    const $toggleButton = document.createElement("button")
    $toggleButton.type = "button"
    $toggleButton.classList.add("btn", "btn-sm", "dropdown-toggle")
    $toggleButton.dataset.bsToggle = "dropdown"
    $toggleButton.ariaExpanded = "false"
    $toggleButton.textContent = "操作"
    const $menu = document.createElement("ul")
    $menu.classList.add("dropdown-menu")
    const $startActionLi = document.createElement("li")
    const $startAction = document.createElement("button")
    $startAction.type = "button"
    $startAction.classList.add("dropdown-item")
    $startAction.textContent = "開始"
    if (onStartClick) {
        $startAction.addEventListener("click", onStartClick)
    }
    $startActionLi.append($startAction)
    const $stopActionLi = document.createElement("li")
    const $stopAction = document.createElement("button")
    $stopAction.type = "button"
    $stopAction.classList.add("dropdown-item")
    $stopAction.textContent = "停止"
    if (onStopClick) {
        $stopAction.addEventListener("click", onStopClick)
    }
    $stopActionLi.append($stopAction)
    const $restartActionLi = document.createElement("li")
    const $restartAction = document.createElement("button")
    $restartAction.type = "button"
    $restartAction.classList.add("dropdown-item")
    $restartAction.textContent = "再起動"
    if (onRestartClick) {
        $restartAction.addEventListener("click", onRestartClick)
    }
    $restartActionLi.append($restartAction)
    const $destroyActionLi = document.createElement("li")
    const $destroyAction = document.createElement("button")
    $destroyAction.type = "button"
    $destroyAction.classList.add("dropdown-item")
    $destroyAction.textContent = "消去"
    if (onDestroyClick) {
        $destroyAction.addEventListener("click", onDestroyClick)
    }
    $destroyActionLi.append($destroyAction)
    if (instance.status === "Running") {
        $startAction.disabled = true
        $destroyAction.disabled = true
    } else if (instance.status === "Stopped") {
        $stopAction.disabled = true
        $restartAction.disabled = true
    }
    $menu.append(
        $startActionLi,
        $stopActionLi,
        $restartActionLi,
        $destroyActionLi
    )
    $dropdown.append($toggleButton, $menu)
    return $dropdown
}
