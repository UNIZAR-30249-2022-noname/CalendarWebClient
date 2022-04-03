import { Time } from "../../../scheduler/entries/domain/models/Entry"

export type Book= {
    owner: string
    event: String
    day: string
    scheduled: Time[]
    slot: string

}
