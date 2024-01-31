import axios from 'axios';
import { Flight, NewFlight } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllFlights = () => {
    return axios
        .get<Flight[]>(baseUrl)
        .then(response => response.data);
};

export const createFlight = (object: NewFlight) => {
    return axios
        .post<Flight>(baseUrl, object)
        .then(response => response.data);
};