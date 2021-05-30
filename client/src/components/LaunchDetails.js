import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const LaunchDetails = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    mission_name,
    launch_year,
    launch_success,
    launch_date_local,
    rocket: { rocket_id, rocket_name, rocket_type },
  } = data.launch;

  return (
    <div className="row">
      <div className="col-md-8">
        <h1 className="my-4">{mission_name}</h1>
        <div className="section-details mb-5">
          <h5 className="mb-3">Launch Details</h5>
          <ul className="list-group">
            <li className="list-group-item">Flight Number: {flight_number}</li>
            <li className="list-group-item">
              Launch Date:{' '}
              <Moment format="MM-DD-YYYY">{launch_date_local}</Moment>
            </li>
            <li className="list-group-item">
              Launch Time: <Moment format="HH:mm">{launch_date_local}</Moment>
            </li>
            <li className="list-group-item">
              Launch Status:{' '}
              <span
                className={`badge ${
                  launch_success ? 'bg-success' : 'bg-danger'
                }`}
              >
                {launch_success ? 'Success' : 'Failed'}
              </span>
            </li>
          </ul>
        </div>

        <div className="section-details mb-5">
          <h5 className="mb-3">Rocket Details</h5>
          <ul className="list-group">
            <li className="list-group-item">Rocket ID: {rocket_id}</li>
            <li className="list-group-item">Rocket Name: {rocket_name}</li>
            <li className="list-group-item">Rocket Type: {rocket_type}</li>
          </ul>
        </div>

        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>{' '}
          Back
        </Link>
      </div>
    </div>
  );
};

export default LaunchDetails;
