import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return[{
      id: '3'
      journal: 'BMC research notes',
      source: 'pubmed',
      title: 'SCM: a practical tool to implement hospital-based syndromic surveillance.'
    },{
      id: '2'
      journal: 'African health sciences',
      source: 'pubmed',
      title: 'Evaluating the use of cell phone messaging for community Ebola syndromic surveillance in high risked settings in Southern Sierra Leone.'
    },{
      id: '3'
      journal: 'Journal of medical Internet research',
      source: 'pubmed',
      title: 'Performance of a Mobile Phone App-Based Participatory Syndromic Surveillance System for Acute Febrile Illness and Acute Gastroenteritis in Rural Guatemala.'
    }];
  }
});
