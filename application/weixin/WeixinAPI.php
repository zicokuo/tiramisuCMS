<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 11:36
 */

namespace app\weixin;

trait WeixinAPI
{

    static function buildApi($url, $params)
    {
        //  拆解apiurl
        $api = parse_url($url);
        parse_str($api['query'], $api['params']);
//        var_dump($api);
        //  过滤参数
        $params = array_intersect_key(array_merge($api['params'], $params), $api['params']);
//        var_dump($params);
        return vsprintf('%s://%s%s', $api) . '?' . http_build_query($params);
    }

    /**
     * 发起请求
     * @param $url
     * @param array $post_data
     * @return int
     */
    static function send($url, $post_data = [])
    {
        // 初始化一个 cURL 对象
        $curl = curl_init();
        // 设置你需要抓取的URL
        curl_setopt($curl, CURLOPT_URL, $url);
        // 设置header 响应头是否输出
        curl_setopt($curl, CURLOPT_HEADER, false);
        // 设置cURL 参数，要求结果保存到字符串中还是输出到屏幕上。
        // 1如果成功只将结果返回，不自动输出任何内容。如果失败返回FALSE
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        // post的变量
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1);
        if (stripos($url, "https://") !== FALSE) {
            curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        } else {
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, TRUE);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);//严格校验
        }
        // 运行cURL，请求网页
        $data = curl_exec($curl);
        // 关闭URL请求
        curl_close($curl);
        // 显示获得的数据
        return $data ? json_decode($data, true) : curl_errno($curl);
    }

}