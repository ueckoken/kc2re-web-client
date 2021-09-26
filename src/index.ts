import onChange from "on-change"
import {
    generateHostOptions,
    generateOsOptions,
} from "./components/create-form"
import { generateTableRows } from "./components/table-rows"
import { ControlPlaneClient, WebSocketReadyState } from "./control-plane-client"
import { Image, Instance } from "./message"

export type Host = {
    name: string
    images: Image[]
    instances: Instance[]
    updatedAt: Date
}

const QUERY_INTERVAL_SEC = 60
const INITIAL_HOST: Host[] = []
const $appRoot = document.getElementById("app")
const $connectionStatus = document.getElementById("connection-status")
const $instanceTable = document.getElementById("instance-table")
const $reloadButton = document.getElementById("reload-button")
const $createForm = document.getElementById("create-form")
if ($createForm === null || !($createForm instanceof HTMLFormElement)) {
    throw new Error("Failed to initialize")
}
const $hostSelect = $createForm.elements.namedItem("host")
const $osSelect = $createForm.elements.namedItem("os")
if (
    $appRoot === null ||
    $connectionStatus === null ||
    $instanceTable === null ||
    !($instanceTable instanceof HTMLTableElement) ||
    $reloadButton === null ||
    !($reloadButton instanceof HTMLButtonElement) ||
    $hostSelect === null ||
    !($hostSelect instanceof HTMLSelectElement) ||
    $osSelect === null ||
    !($osSelect instanceof HTMLSelectElement)
) {
    throw new Error("Failed to initialize")
}

// 状態
const hosts = onChange(INITIAL_HOST, function () {
    renderTableBody($instanceTable.tBodies[0], this)
    renderHostSelection($hostSelect, this)
})
const connectionStatus = onChange<{ state: WebSocketReadyState }>(
    { state: WebSocket.CLOSED as 3 },
    function () {
        renderConnectionStatus($connectionStatus, this.state)
        $reloadButton.disabled = this.state !== (WebSocket.OPEN as 1)
    }
)
const selectedHostname = onChange({ value: $hostSelect.value }, function () {
    renderOsSelection($osSelect, this.value)
})
let lastQueryHostDate: Date | undefined

const CONNECTION_MESSAGE_MAP = {
    0: "接続試行中",
    1: "接続完了",
    2: "切断中",
    3: "切断",
} as const
const renderConnectionStatus = (
    $root: HTMLElement,
    state: WebSocketReadyState
) => {
    $root.textContent = CONNECTION_MESSAGE_MAP[state]
}

const renderTableBody = ($tbody: HTMLTableSectionElement, hosts: Host[]) => {
    const rows = generateTableRows({
        hosts,
        onStartClick(_, instance) {
            client.send({
                type: "COMMAND_START",
                host: instance.host,
                instance: instance.name,
            })
        },
        onStopClick(_, instance) {
            client.send({
                type: "COMMAND_STOP",
                host: instance.host,
                instance: instance.name,
            })
        },
        onRestartClick(_, instance) {
            client.send({
                type: "COMMAND_RESTART",
                host: instance.host,
                instance: instance.name,
            })
        },
        onDestroyClick(_, instance) {
            client.send({
                type: "COMMAND_DESTROY",
                host: instance.host,
                instance: instance.name,
            })
        },
    })
    $tbody.replaceChildren(...rows)
}

const renderHostSelection = ($select: HTMLSelectElement, hosts: Host[]) => {
    const options = generateHostOptions(hosts)
    $select.replaceChildren(...options)
    selectedHostname.value = $select.value
}

const renderOsSelection = ($select: HTMLSelectElement, hostname: string) => {
    const selectedHost = hosts.find((host) => host.name === hostname)
    if (selectedHost === undefined) {
        $select.replaceChildren()
        return
    }
    const options = generateOsOptions(selectedHost.images)
    $select.replaceChildren(...options)
}

$reloadButton.addEventListener("click", () => {
    client.send({
        type: "QUERY_HOST",
    })
})

const url = prompt("Enter the control plane URI")
if (url === null) {
    throw new Error("URL was not provided")
}
const token = prompt("Enter token")
if (token === null) {
    throw new Error("Token was not provided")
}
const params = new URLSearchParams({
    t: token,
})
const client = new ControlPlaneClient(url + "?" + params.toString())
connectionStatus.state = client.readyState
let intervalQueryId: number | undefined

$hostSelect.addEventListener("input", (e) => {
    selectedHostname.value = $hostSelect.value
})

$createForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const hostname = (
        $createForm.elements.namedItem("host") as HTMLSelectElement
    ).value
    const os = ($createForm.elements.namedItem("os") as HTMLSelectElement).value
    const name = ($createForm.elements.namedItem("name") as HTMLInputElement)
        .value
    const username = (
        $createForm.elements.namedItem("username") as HTMLInputElement
    ).value
    const password = (
        $createForm.elements.namedItem("password") as HTMLInputElement
    ).value
    client.send({
        type: "COMMAND_CREATE",
        host: hostname,
        alias: os,
        name: name,
        user: username,
        password: password,
    })
})

client.addEventListener("message", (event) => {
    console.log("MESSAGE RECIEVED")
    console.log(event.detail)
    const message = event.detail.data
    if (message.type === "QUERY_HOST") {
        lastQueryHostDate = new Date()
    }
    if (message.type === "ADVERTISE_HOST") {
        const i = hosts.findIndex((host) => host.name === message.host)
        const host = {
            name: message.host,
            images: message.images,
            instances: message.instances,
            updatedAt: new Date(),
        }
        if (i === -1) {
            hosts.push(host)
        } else {
            hosts[i] = host
        }
    }
})
client.addEventListener("open", (event) => {
    connectionStatus.state = client.readyState
    client.send({
        type: "QUERY_HOST",
    })
    intervalQueryId = window.setInterval(() => {
        if (document.hidden) {
            console.log("非アクティブ節約")
            return
        }
        if (lastQueryHostDate === undefined) {
            return
        }
        const diffMs = Date.now() - lastQueryHostDate.getTime()
        if (diffMs / 1000 < QUERY_INTERVAL_SEC / 2) {
            console.log("頻回節約")
            return
        }
        client.send({
            type: "QUERY_HOST",
        })
    }, QUERY_INTERVAL_SEC * 1000)
})
client.addEventListener("close", (event) => {
    connectionStatus.state = client.readyState
    console.log(event.detail)
    if (intervalQueryId !== undefined) {
        clearInterval(intervalQueryId)
    }
})
client.addEventListener("error", (event) => {
    connectionStatus.state = client.readyState
    console.log(event)
})
