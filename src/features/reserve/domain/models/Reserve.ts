import { Time } from "../../../scheduler/entries/domain/models/Entry"

export type Reserve= {
    owner: string
    event: String
    day: string
    scheduled: Time[]
    slot: string
    key?: string
}
