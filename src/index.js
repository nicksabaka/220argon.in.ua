import Inferno from 'inferno';
import Axios   from 'axios';

import Advantages from './Advantages-com/Advantages';
import Services   from './Services-com/Services';
import Related    from './Related-com/Related';

import * as Host from './hostlib.js';

import './index.css';


Axios.get(document.getElementById('host-data').src)
  .then(function (response) {
    let uSearch = Host.parseUrlSearch();

    [ [ 'com-advantages', <Advantages data={ response.data.blocks.advantages } /> ],

      [ 'com-services', <Services
          openId={ (uSearch.go !== undefined && uSearch.go.length > 1) ? uSearch.go : '' }
          data={ response.data.blocks.services }
        /> ],

      [ 'com-related', <Related data={ response.data.blocks.related } /> ],

    ].forEach(function(component) {
      Inferno.render(component[1], document.getElementById(component[0]));
    });


    let locateIcon = document.getElementById('locate-icon');
    let prevLocateClass = locateIcon.className;

    let animateIcon = function(t) {
      locateIcon.className += '  animated  bounce';
      setTimeout(function() { locateIcon.className = prevLocateClass; }, 4000);
    };

    animateIcon();
    setInterval(animateIcon, 10000);
  })
  .catch(function (error) {
    console.log(error);
  });
