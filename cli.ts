import { geocode, getCurrentWeather } from "./api.ts"
import { parseArgs } from "https://deno.land/std/cli/parse_args.ts";

function printHelp() {
    console.log(`
Usage: js-weather [OPTIONS...]

Optional flags:
    -h, --help: Display this help and exit
    -a, --auth: Set an authentication key
    -d, --delete: Remove an authentication key

    `)
}

async function main(inputArgs: string[]) {

    const args = parseArgs(inputArgs, { alias: { "help": "h", "a": "auth", "d": "delete" } })

    if (args.help) {
        printHelp();
        Deno.exit(0);
    }
    else if (args.auth) {
        console.log("Setting new authentication key...")
        localStorage.setItem("apiKey", args.auth)
        Deno.exit(0)
    }
    else if (args.delete) {
        console.log("Deleting authentication key...")
        localStorage.removeItem("apiKey")
        Deno.exit(0)
    }

    const token = localStorage.getItem("apiKey")
    if (!token) {
        console.error("%cerror:%c no api key found. please provide one.", "color: red", "")
        Deno.exit(1)
    }
    const coordinates = await geocode(inputArgs.join("+"), token)
    const currentWeather = await getCurrentWeather(coordinates.lat, coordinates.lon, token)
    console.log(currentWeather)
}

if (import.meta.main) {
    main(Deno.args)
}