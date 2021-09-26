import { Host } from ".."
import { Image } from "../message"

export const generateHostOption = (host: Host) =>
    new Option(host.name, host.name)

export function generateHostOptions(hosts: Host[]) {
    return hosts.map((host) => generateHostOption(host))
}

export const generateOsOption = (image: Image) => {
    const text = image.os + " " + image.release
    return new Option(text, image.aliases[0])
}

export function generateOsOptions(images: Image[]) {
    return images.map((image) => generateOsOption(image))
}
