import '../styl/style.styl'

import getInstagram from './api/getInstagram'

(() => {

  const _instList = document.getElementById('js--list-instagram');

  getInstagram( (json) => {
    const _obj = JSON.parse(json);

    let _instData;

    if(_obj.status === 200) {
      if(_obj.data instanceof Array) {
        _instData = _obj.data;


        _instData.forEach( (itm, idx) => {
          const _li = document.createElement('li');
          const _anchor = document.createElement('a');
          const _img = document.createElement('img');

          // li
          _li.classList.add('js--list-instagram-item');

          // anchor
          _anchor.setAttribute('href', itm.link);
          _anchor.setAttribute('target', '_blank');

          //img
          _img.src = itm.images.standard_resolution.url;

          // append children
          _anchor.appendChild(_img);
          _li.appendChild(_anchor);
          _instList.appendChild(_li);
        });
      }
    }
  });

})();

