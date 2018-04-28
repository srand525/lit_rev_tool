import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [{
      id: 'asthma',
      syndrome: 'Asthma',
      owner: 'Schachterle, Mathes et. al.',
      city: 'NYC',
      datasource: 'ED',
      analyticalmethods: 'GLMM',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      description: 'Syndromic data can be used for long-term asthma monitoring.'
    },
    {
      id: 'ili',
      syndrome: 'ILI',
      owner: 'Ramona',
      city: 'NYC',
      datasource: 'ED',
      analyticalmethods: 'Serfling',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      description: 'Syndromic data for rapid assessment of ILI.'
    },
    {
      id: 'injury',
      syndrome: 'Injury',
      owner: 'Ramona',
      city: 'NYC',
      datasource: 'ED',
      analyticalmethods: '',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      description: 'Syndromic data for near real-time surveillance of injuries and situational awareness.'
    },

    {
      id: 'k2',
      syndrome: 'K2-Synthetic Marijuana',
      owner: 'Ramona',
      city: 'NYC',
      datasource: 'ED',
      analyticalmethods: '',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      description: 'Monitor changes in drug-related emergency department visits.'
    }];
    }

});
