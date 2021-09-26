import { createSTEventTarget } from "@mizdra/strictly-typed-event-target"
import { Message } from "./message"

// moncky patching
export type WebSocketReadyState = 0 | 1 | 2 | 3

type ControlPlaneClientEventDetailMap = {
    close: { code: number; reason: string; wasClean: boolean }
    error: undefined
    message: { data: Message }
    open: undefined
}

const [ControlPlaneEvent, ControlPlaneEventTarget] =
    createSTEventTarget<ControlPlaneClientEventDetailMap>()

export class ControlPlaneClient extends ControlPlaneEventTarget {
    #socket: WebSocket
    constructor(url: string, protocols?: string | string[]) {
        super()
        this.#socket = new WebSocket(url, protocols)
        this.#socket.addEventListener("close", this.#onClose.bind(this))
        this.#socket.addEventListener("error", this.#onError.bind(this))
        this.#socket.addEventListener("message", this.#onMessage.bind(this))
        this.#socket.addEventListener("open", this.#onOpen.bind(this))
    }
    send(message: Message) {
        return this.#socket?.send(JSON.stringify(message))
    }
    get readyState() {
        return this.#socket.readyState as WebSocketReadyState
    }
    // handlers to handle raw WebSocket event and wrap it as CustomEvent, and dispatch it
    #onClose(event: CloseEvent) {
        const customCloseEvent = new ControlPlaneEvent("close", {
            detail: {
                code: event.code,
                reason: event.reason,
                wasClean: event.wasClean,
            },
        })
        this.dispatchEvent(customCloseEvent)
    }
    #onError(event: Event) {
        const customErrorEvent = new ControlPlaneEvent("error")
        this.dispatchEvent(customErrorEvent)
    }
    #onMessage(event: MessageEvent) {
        const message: Message = JSON.parse(event.data)
        const customMessageEvent = new ControlPlaneEvent("message", {
            detail: {
                data: message,
            },
        })
        this.dispatchEvent(customMessageEvent)
    }
    #onOpen(event: Event) {
        const customOpenEvent = new ControlPlaneEvent("open")
        this.dispatchEvent(customOpenEvent)
    }
}
