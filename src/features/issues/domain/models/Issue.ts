export const NewIssue=0
export const CurrentIssue=1
export const CompletedIssue=2
export type Issue= {
    tags: string[]
    title: string
    description: string
    key:string
    slot:string
    state:number

}

export type IssuesLists= {
    new: Issue[],
    current: Issue[],
    completed:Issue[]

}
