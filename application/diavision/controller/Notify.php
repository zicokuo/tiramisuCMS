<?php

namespace app\diavision\controller;

use think\Controller;
use think\Exception;

/**
 * 专门用作接收微信通知服务
 * Class Notify
 * @package app\diavision\controller
 */
class Notify extends Controller
{
    public function index()
    {
        try {
            $signature = $this->_check_signature();
            if ($signature) {
                echo $this->request->param('echostr');
            }
        } catch (Exception $e) {

        }

        return;
    }


    /**
     * 微信官方验证签名
     * @return bool
     */
    private function _check_signature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $token = 'logods';
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode($tmpArr);
        $tmpStr = sha1($tmpStr);

        if ($tmpStr == $signature) {
            return true;
        } else {
            return false;
        }
    }

}