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

class Server extends Controller
{
    function __construct(Request $request = null)
    {
        parent::__construct($request);
        if ($this->request->action() != 'get_ticket') {
            if ($this->request->isAjax() && TiramisuBase::interactionCheck()) {
            } else {
                $this->error('无效的数据交互');
            }
        }
    }

    /**
     * 前端ticket获取 - 唯一一个不需检票的入口
     */
    public function get_ticket()
    {
        $this->request->isAjax(true);
        $user_ticket = $this->request->param('user_ticket');
        $user_ticket = empty($user_ticket) || is_null($user_ticket) ? base64_encode(md5(time())) : $user_ticket;
//        return json_encode(['body' => ['code' => 1, 'data' => ['user_ticket'=>$user_ticket]]]);
        return $this->success('前端申请票据成功', '', ['user_ticket' => $user_ticket]);
    }

    public function index()
    {
        return 'welcome';
    }
}