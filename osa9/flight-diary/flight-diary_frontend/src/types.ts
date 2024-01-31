export interface Flight {
    id: number,
    date: string,
    weather: string,
    visibility: string,
    comment: string
}

export type NewFlight = Omit<Flight, 'id'>