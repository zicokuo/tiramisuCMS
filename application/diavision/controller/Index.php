<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/24
 * Time: 15:50
 */

namespace app\diavision\controller;

use app\diavision\common\BaseController;
use think\Config;
use think\Controller;
use think\Db;

class Index extends Controller
{
    use BaseController;
    public $db_configs;

    private function _get_db()
    {
        return Db::connect(Config::get('database'));
    }

    public function index()
    {
        $this->test_sql();
        return 'welcome';
    }

    public function dashboard()
    {

    }

    public function get_list()
    {
        $pageSize = $this->request->param('page_size', 1);
        $paged = $this->request->param('paged', 1);
        $total = db('weixin_design_submit')->count();
        $data['data'] = db('weixin_design_submit')->page($paged, $pageSize)->order('create_time', 'desc')->select();
        $data['totals'] = $total;
        $data['pages'] = ceil($total / $pageSize);    //  进一法取整,保持单页
        $data['paged'] = $paged;
        $data['size'] = $pageSize;
        return $this->_package_return('获取用户提交数据列表成功', '', $data);
    }

    public function get_user()
    {

    }

    public function finished()
    {
        $id = $this->request->param('id');
        $id = explode(',', $id);
        if (count($id) < 1) {
            return $this->_package_return('无效操作', '', '', 0);
        }
        $result = '';
        foreach ($id as $i) {
//            $updateArray[] = ['id' => $i, 'status' => 1];
            $result .= db('weixin_design_submit')->where('id', '=', $i)->update(['status' => 1]);
        }
        return $this->_package_return('修改订单状态成功', '', $result);
    }

    public function deleted()
    {
        $id = $this->request->param('id');
        $id = explode(',', $id);
        if (count($id) < 1) {
            return $this->_package_return('无效操作', '', '', 0);
        }
        $result = '';
        foreach ($id as $i) {
            $result .= db('weixin_design_submit')->where('id', '=', $i)->delete();
        }
        return $this->_package_return('已删除订单' . $result, '', $result);
    }

//    public function design_submit()
//    {
//        $params = $this->request->param();
////        var_dump($params);
//        $weixinNick = $params['userInfo']['nickName'];
//        $result = db('weixin_design_submit');
//
//
//        if (isset($params['userInfo']['nickName'])) {
//            $dbConfigs = Config::get('database');
//            $sql = 'INSERT INTO weixin_design_submit (user_id,create_time,status,contact,from_data) VALUES (:user,:createTime,:status,:contact,:fromData)';
//            $bindData = ['user_id' => 1, 'create_time' => time(), 'status' => 0, 'from_data' => json_encode($params)];
//            $db = db('weixin_design_submit')->insert($bindData);
//            return $this->_package_return('成功提交设计', null, '', 1);
//        } else {
//            return $this->_package_return('提交失败,请重试', null, '', 0);
//        }
//    }

    public function test()
    {
        $this->design_submit();
        $params = $this->request->param();
        if (!is_null($params)) {
            return $this->_package_return('服务器成功接收数据', $this->request->path(), $params);
        } else {
            return '';
        }
    }

    public function test_sql()
    {
//        Config::load('database.php', '', 'diavision');
        $this->db_configs = Config::get();
        $db = Db::connect(Config::get('database'));
        $tables = $db->getTables();
        $userRouter = $this->db_configs;
        var_dump($tables);
        return 'welcome';
    }

}