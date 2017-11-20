<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/20
 * Time: 11:53
 */

namespace app\common;
trait Tool
{
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