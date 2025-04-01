
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Court, getCourtBySlug } from '../data/courts';

const CourtDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [court, setCourt] = useState<Court | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (slug) {
        const courtData = getCourtBySlug(slug);
        if (courtData) {
          setCourt(courtData);
          setLoading(false);
        } else {
          setError('Court not found');
          setLoading(false);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="govuk-width-container py-8">
            <div className="animate-pulse">
              <div className="h-10 bg-govuk-light-grey rounded mb-4 w-1/2"></div>
              <div className="h-6 bg-govuk-light-grey rounded mb-8 w-full"></div>
              <div className="h-64 bg-govuk-light-grey rounded mb-4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !court) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="govuk-width-container py-8">
            <Link to="/" className="govuk-link mb-6 inline-block">← Back to search</Link>
            <h1 className="govuk-heading-xl">Court not found</h1>
            <p className="govuk-body">The court or tribunal you are looking for could not be found.</p>
            <p className="govuk-body">
              <Link to="/" className="govuk-link">
                Try searching again
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="govuk-width-container py-8 animate-fade-in">
          <Link to="/" className="govuk-link mb-6 inline-block">← Back to search</Link>
          
          <h1 className="govuk-heading-xl">{court.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="mb-10">
                <h2 className="govuk-heading-m">About this court</h2>
                <p className="govuk-body">{court.description}</p>
              </div>
              
              <div className="mb-10">
                <h2 className="govuk-heading-m border-b pb-2 mb-4">Contact this court</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="govuk-heading-m text-lg">Address</h3>
                    <address className="not-italic">
                      {court.address.map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                      <div>{court.town}</div>
                      <div>{court.postcode}</div>
                    </address>
                  </div>
                  <div>
                    <h3 className="govuk-heading-m text-lg">Phone and email</h3>
                    <p className="govuk-body mb-1">
                      <span className="font-bold">Telephone: </span>
                      {court.phoneNumber}
                    </p>
                    <p className="govuk-body">
                      <span className="font-bold">Email: </span>
                      <a href={`mailto:${court.email}`} className="govuk-link break-words">
                        {court.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <h2 className="govuk-heading-m border-b pb-2 mb-4">Opening times</h2>
                <dl>
                  {Object.entries(court.openingTimes).map(([day, hours]) => (
                    <div key={day} className="flex py-2 border-b border-govuk-mid-grey last:border-0">
                      <dt className="w-1/3 font-bold">{day}</dt>
                      <dd className="w-2/3">{hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              
              <div className="mb-10">
                <h2 className="govuk-heading-m border-b pb-2 mb-4">Areas of law covered</h2>
                <div className="space-y-2">
                  {court.areasOfLaw.map((area, index) => (
                    <div key={index} className="py-1">
                      {area}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-10">
                <h2 className="govuk-heading-m border-b pb-2 mb-4">Building facilities</h2>
                <div className="space-y-2">
                  {court.facilities.map((facility, index) => (
                    <div key={index} className="py-1">
                      {facility}
                    </div>
                  ))}
                </div>
              </div>
              
              {court.additionalInfo && (
                <div className="mb-10">
                  <h2 className="govuk-heading-m border-b pb-2 mb-4">Additional information</h2>
                  <p className="govuk-body">{court.additionalInfo}</p>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-govuk-light-grey p-6">
                <h2 className="govuk-heading-m">Helplines</h2>
                <p className="govuk-body mb-4">If you need to speak to someone about your case, check your court documents for the right number to call.</p>
                <p className="govuk-body">The court's phone number is:</p>
                <p className="govuk-body font-bold">{court.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourtDetails;
