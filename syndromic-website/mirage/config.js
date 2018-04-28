export default function() {
  this.namespace = '/api';

  this.get('/literature', function() {
    return {
      data: [{
        type: 'literature',
        id: '1',
        attributes: {
          journal: 'Journal of medical Internet research',
          source: 'pubmed',
          title: 'Performance of a Mobile Phone App-Based Participatory Syndromic Surveillance System for Acute Febrile Illness and Acute Gastroenteritis in Rural Guatemala.'
        }
      }, {
        type: 'literature',
        id: '2',
        attributes: {
          journal: 'African health sciences',
          source: 'pubmed',
          title: 'Evaluating the use of cell phone messaging for community Ebola syndromic surveillance in high risked settings in Southern Sierra Leone.'
        }
      }, {
        type: 'literature',
        id: '3',
        attributes: {
          journal: 'BMC research notes',
          source: 'pubmed',
          title: 'SCM: a practical tool to implement hospital-based syndromic surveillance.'
        }
      }]
    };
  });
}
