
import React from 'react';
import { Link } from 'react-router-dom';
import { Court } from '../data/courts';

interface CourtCardProps {
  court: Court;
}

const CourtCard: React.FC<CourtCardProps> = ({ court }) => {
  return (
    <div className="border-b border-govuk-mid-grey py-6 animate-fade-in">
      <h2 className="govuk-heading-m mb-2">
        <Link to={`/courts/${court.slug}`} className="govuk-link">
          {court.name}
        </Link>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <address className="not-italic">
            {court.address.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
            <div>{court.town}</div>
            <div>{court.postcode}</div>
          </address>
        </div>
        <div>
          <div className="mb-2">
            <span className="font-bold">Visit or contact us:</span>
          </div>
          <div className="mb-2">
            <span>Telephone: {court.phoneNumber}</span>
          </div>
          <Link to={`/courts/${court.slug}`} className="govuk-link text-base">
            Full details for this court
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourtCard;
