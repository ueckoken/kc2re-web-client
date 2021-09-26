export type QueryHostMessage = {
    type: "QUERY_HOST"
}

export type CommandStartMessage = {
    type: "COMMAND_START"
    host: string
    instance: string
}

export type CommandStopMessage = {
    type: "COMMAND_STOP"
    host: string
    instance: string
}

export type CommandRestartMessage = {
    type: "COMMAND_RESTART"
    host: string
    instance: string
}

export type CommandDestroyMessage = {
    type: "COMMAND_DESTROY"
    host: string
    instance: string
}

export type CommandCreateMessage = {
    type: "COMMAND_CREATE"
    host: string
    alias: string
    name: string
    user: string
    password: string
}

export type AdvertiseHostMessage = {
    type: "ADVERTISE_HOST"
    images: Image[]
    host: string
    instances: Instance[]
}

export type Message =
    | QueryHostMessage
    | CommandStartMessage
    | CommandStopMessage
    | CommandRestartMessage
    | CommandDestroyMessage
    | CommandCreateMessage
    | AdvertiseHostMessage

export type Image = {
    aliases: string[]
    os: string
    release: string
}

export type Instance = {
    name: string
    status: "Running" | "Stopped" | "Frozen" | "Error" // ref: https://github.com/lxc/lxd/blob/lxd-4.18/shared/api/instance_state.go#L32
    addresses: InstanceAddress[]
}

export type InstanceAddress = {
    address: string
    netmask: string
}
