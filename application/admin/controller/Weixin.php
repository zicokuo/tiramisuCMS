<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/13
 * Time: 11:15
 */

namespace app\admin\controller;

use think\Controller;
use app\tiramisu\Base as TiramisuBase;
use think\Request;

class Weixin extends Controller
{
    function __construct(Request $request = null)
    {
        parent::__construct($request);
        if ($this->request->action() != 'get_ticket') {
            if ($this->request->isAjax() && TiramisuBase::check_ticket()) {
            } else {
                $this->error('无效的数据交互');
            }
        }
    }

    public function get_config()
    {
        $data = ['app_name' => '', 'app_id' => '', 'app_secret' => ''];
        return $this->success('获取微信配置成功..', '', ['config' => $data]);
    }


    public function index()
    {
        return 'welcome';
    }
}