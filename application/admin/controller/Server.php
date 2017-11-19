<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/13
 * Time: 11:15
 */

namespace app\admin\controller;

use app\tiramisu\units\ticket;
use think\Cache;
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
        //  生成门票
        $ticket = $this->request->param('user_ticket', null);
        $ticket = is_null($ticket) ? ticket::build(session_id()) : $ticket;

        //  缓存门票列表
        $tickets = Cache::get('ticket_list', []);
        array_push($tickets, $ticket);
        Cache::set('ticket_list', $tickets);
        return $this->success('前端申请票据成功', '', ['user_ticket' => $ticket]);
    }

    public function index()
    {
        return 'welcome';
    }
}