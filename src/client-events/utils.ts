// Generic types for additions, modifications, and removals
export type AdditionsType<Additions> = {
  [Event in keyof Additions]: Additions[Event]
}

export type ModificationsType<Modifications> = {
  [Event in keyof Modifications]: Modifications[Event]
}

export type RemovalsType<Removals extends string[]> = {
  [Event in Removals[number]]: never
}
