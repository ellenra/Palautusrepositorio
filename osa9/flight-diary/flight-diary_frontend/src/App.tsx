import { useState, useEffect } from "react";
import { Flight, NewFlight } from "./types";
import { getAllFlights, createFlight } from "./services/flightService";
import axios from "axios";
import "./styles/index.css";

const Flights = ({ flights }: {flights: Flight[]}): JSX.Element => {
  return (
    <div>
      <ul>
        {flights.map(flight => (
          <div key={flight.id}>
            <u><h4>{flight.date}</h4></u>
            <p>Weather: {flight.weather}</p>
            <p>Visibility: {flight.visibility}</p>
            <p>Comment: {flight.comment}</p>
          </div>
          ))}
      </ul>
    </div>
  );
};

const Error = ({ message }: { message: string }): JSX.Element => {
  return (
    <div className="error">
      {message}
    </div>
  );
};

const App = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [newFlight, setNewFlight] = useState<NewFlight>({
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    getAllFlights().then(data => {
      setFlights(data);
    });
  }, []);

  const flightCreation = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const data = await createFlight(newFlight);
      setFlights(flights.concat(data));

      setNewFlight({
        date: '',
        weather: '',
        visibility: '',
        comment: ''
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
        setTimeout(() => {
          setError('');
        }, 5000);
      } else console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewFlight(prev => ({
      ...prev, [name]: value
    }));
  };


  return (
    <div>
      <h2>Flight Diary</h2>
      <Error message={error} />
      <h4>Add new flight</h4>
      <form onSubmit={flightCreation}>
        <div>
          Date: <input type="date" name="date" value={newFlight.date} onChange={handleInputChange} min="2017-01-01" max="2024-01-25"/>
        </div>
        <div>
          Weather:
          sunny<input type="radio" name="weather" value="sunny" onChange={handleInputChange} />
          rainy<input type="radio" name="weather" value="rainy" onChange={handleInputChange} />
          cloudy<input type="radio" name="weather" value="cloudy" onChange={handleInputChange} />
          stormy<input type="radio" name="weather" value="stormy" onChange={handleInputChange} />
          windy<input type="radio" name="weather" value="windy" onChange={handleInputChange} />
        </div>
        <div>
          Visibility: 
          great<input type="radio" name="visibility" value="great" onChange={handleInputChange} />
          good<input type="radio" name="visibility" value="good" onChange={handleInputChange} />
          ok<input type="radio" name="visibility" value="ok" onChange={handleInputChange} />
          poor<input type="radio" name="visibility" value="poor" onChange={handleInputChange} />
        </div>
        <div>
          Comment: <input type="text" name="comment" value={newFlight.comment} onChange={handleInputChange} />
        </div>
        <button type="submit">Add flight</button>
      </form>
      <Flights flights={flights} />
    </div>
  );
};

export default App;