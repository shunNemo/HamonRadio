<?php
  // POSTリクエストのみ受付
  if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Instagram 自分のメディア取得エンドポイント
    $self_media_endpoint = 'https://api.instagram.com/v1/users/self/media/recent/';
    // アクセストークン
    $access_token = '6468479037.389fc2a.f21fa35acc53498988960a884724ba8d';
    // JSONを取得して出力
    echo @file_get_contents("$self_media_endpoint?access_token=$access_token");

    exit;
  }
?>
