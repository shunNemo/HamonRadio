import '../styl/style.styl'

import getInstagram from './api/getInstagram'

(() => {

  const _instList = document.getElementById('js--list-instagram');

  getInstagram( (json) => {
    const _obj = JSON.parse(json);

    let _instData;

    window.console.log(_obj);

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

          if(itm.images.standard_resolution.width > itm.images.standard_resolution.height) {
            _img.classList.add('c-list__img--landscape');
          }

          if(itm.images.standard_resolution.height > itm.images.standard_resolution.width) {
            _img.classList.add('c-list__img--portrait');
          }

          // append children
          _anchor.appendChild(_img);
          _li.appendChild(_anchor);
          _instList.appendChild(_li);
        });

        if(_instData.length % 3 > 0) {
          for(let _i = 0; _i < (3 - (_instData.length % 3)); _i++) {
            const _dummyNode = document.createElement('li');

            _instList.classList.add('js--list-instagram-item');

            _instList.appendChild(_dummyNode);
          }
        }
      }
    }
  });

})();

