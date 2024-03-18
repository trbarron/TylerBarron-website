import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Your Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-5TBLHQRWFH';

// Initialize Google Analytics with your Measurement ID
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

// Send a pageview event to Google Analytics
const trackPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// Higher-Order Component (HOC) for tracking page views
export const withPageViewTracking = WrappedComponent => props => {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);

  return <WrappedComponent {...props} />;
};
