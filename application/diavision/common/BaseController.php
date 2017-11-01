<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 10:02
 */

namespace app\diavision\common;

trait BaseController
{
    static function output($e)
    {
        return json_encode($e);
    }

    /**
     * 标准化api接口返回数据
     * @param string $msg 处理信息
     * @param null $url 跳转url || 请求url
     * @param string $data 返回数据内容
     * @param int $code 处理结果,默认1成功,0失败
     * @return string 返回json
     */
    private function _package_return($msg = '', $url = null, $data = '', $code = 1)
    {
        return json_encode(['msg' => $msg, 'url' => $url || $this->request->path(), 'data' => $data, 'code' => $code]);
    }

    public function _is($res)
    {
        if ($res === false) {
            return false;
        } elseif (isset($res->errcode)) {
            return false;
        } else {
            return true;
        }
    }


}