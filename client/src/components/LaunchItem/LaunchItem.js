import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './launch-item.scss';

const LaunchItem = (props) => {
  const { flight_number, mission_name, launch_date_local, launch_success } =
    props.launch;

  return (
    <div className="card card--results card-body mb-3">
      <div className="wrapper">
        <h4 className="title my-1">
          <Link to={`/launch/${flight_number}`}>{mission_name}</Link>
        </h4>
        <span className="badge"></span>
        <p className="date my-0">
          Launch Date:{' '}
          <Moment format="MM-DD-YYYY HH:mm">{launch_date_local}</Moment>
        </p>
        <span
          className={`badge ${launch_success ? 'bg-success' : 'bg-danger'}`}
        >
          {launch_success ? 'Success' : 'Failed'}
        </span>
      </div>

      <div className="wrapper wrapper--actions">
        <Link
          to={`/launch/${flight_number}`}
          className="btn btn-sm btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LaunchItem;
