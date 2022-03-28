import internal from "assert"
import { Time } from "../../../scheduler/entries/domain/models/Entry"


export type SlotsFilterForm= {
    day?: String
    hour?: Time
    floor: string
    capacity: number
    building: string
}