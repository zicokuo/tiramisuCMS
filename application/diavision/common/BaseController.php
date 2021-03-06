<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 10:02
 */

namespace app\diavision\common;
/**
 * Trait BaseController
 * @package app\diavision\common
 * @deprecated 本基础类即将废弃,部分方法已经转移到app/common/tool.php下
 */
trait BaseController
{

    /**
     * 标准化api接口返回数据
     * @deprecated 弃用 _package_return,将一致采用thinkphp原配的success和error
     * @param string $msg 处理信息
     * @param null $url 跳转url || 请求url
     * @param string $data 返回数据内容
     * @param int $code 处理结果,默认1成功,0失败
     * @return string 返回json
     */
    private function _package_return($msg = '', $url = null, $data = '', $code = 1, $isEnd = false)
    {
        $result = ['msg' => $msg, 'url' => $url, 'content' => $data, 'code' => $code];
        if ($isEnd) {
            echo json_encode($result);
            exit();
        }
        return json_encode($result);
    }

    public function _is($res)
    {
        if ($res === false) {
            return false;
        } elseif (isset($res['errcode'])) {
            return false;
        } else {
            return true;
        }
    }

    public function array_match($array, $values = [])
    {
        foreach ($array as $key => $item) {
            $array[$key] = isset($values[$key]) ?: '';
        }
        return $array;
    }

    public function table_fields_trans($dataArray)
    {
        $newArray = [];
        foreach ($dataArray as $key => $data) {
            $newArray[self::toUnderScore($key)] = $data;
        }
        return array_merge($dataArray, $newArray);
    }


    //驼峰命名法转下划线风格
    public static function toUnderScore($str)
    {
        return strtolower(preg_replace('/((?<=[a-z])(?=[A-Z]))/', '_', $str));
        $array = array();
        for ($i = 0; $i < strlen($str); $i++) {
            if ($str[$i] == strtolower($str[$i])) {
                $array[] = $str[$i];
            } else {
                if ($i > 0) {
                    $array[] = '_';
                }
                $array[] = strtolower($str[$i]);
            }
        }

        $result = implode('', $array);
        return $result;
    }

    //下划线风格转驼峰命名法
    public static function toCamelCase($str)
    {

        $array = explode('_', $str);
        $result = '';
        foreach ($array as $value) {
            $result .= ucfirst($value);
        }

        return $result;
    }


}