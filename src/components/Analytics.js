import ReactGA from 'react-ga';

ReactGA.initialize('UA-60947732-1', {
    debug: false,
    gaOptions: {
      sampleRate: 100
    }
  });
ReactGA.pageview(window.location.pathname + window.location.search);

const a = null

export default a;