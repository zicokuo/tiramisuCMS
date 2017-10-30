<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/24
 * Time: 15:50
 */

namespace app\diavision\controller;

use think\Config;
use think\Controller;
use think\Db;

class Index extends Controller
{
    public $db_configs;

    private function _package_return($msg = '', $url = null, $content = '', $code = 1)
    {
        return json_encode(['msg' => $msg, 'url' => $url || $this->request->path(), 'data' => $content, 'code' => $code]);
    }

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
        $sql = 'SELECT * FROM weixin_design_submit';
        $data = db('weixin_design_submit')->select();
        return $this->_package_return('获取用户提交数据列表', '', $data);
    }

    public function get_user()
    {

    }

    public function design_submit()
    {
        $params = $this->request->param();
//        var_dump($params);
        if (isset($params['userInfo']['nickName'])) {
            $dbConfigs = Config::get('database');
            $sql = 'INSERT INTO weixin_design_submit (user_id,create_time,status,contact,from_data) VALUES (:user,:createTime,:status,:contact,:fromData)';
            $bindData = ['user_id' => 1, 'create_time' => time(), 'status' => 0, 'from_data' => json_encode($params)];
            $db = db('weixin_design_submit')->insert($bindData);
            return $this->_package_return('成功提交设计', null, '', 1);
        } else {
            return $this->_package_return('提交失败,请重试', null, '', 0);
        }
    }

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