import '@codear/lilac/dist/lilac.css';
import App from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';
import { ANALYTICS_ID } from '../data/constants';

export default withGA(ANALYTICS_ID, Router)(App);
