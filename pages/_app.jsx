import '@codear/lilac/dist/lilac.css';
import App from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';

export default withGA('UA-148017514-2', Router)(App);
