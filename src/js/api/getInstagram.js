import 'whatwg-fetch'

// コールバック実行機構
const executeCallback = (response, callback) => {
  if (typeof callback === 'function') callback(JSON.stringify(response));
};

export default (() => {
  const getInstagram = callback => {
    // レスポンスオブジェクト（コールバックの引数として返却）
    const response = {status: 'unknown'};

    // 拠点一覧取得用API
    const requestURL = '/api/getInstMedias.php';

    const option = {
      credentials: 'same-origin',
      cache: 'no-cache',
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json'}
    }

    // APIにデータをリクエスト
    fetch(requestURL, option).then(response => {
      const _json = response.json();
      return _json;
    }).then(json => {
      // ステータスをレスポンスオブジェクトに格納
      response.status = json.meta.code;

      if(json.data !== undefined){
        response.data = json.data;
      }

      // コールバックを実行
      executeCallback(response, callback);
    });
  };

  return getInstagram;
})();
