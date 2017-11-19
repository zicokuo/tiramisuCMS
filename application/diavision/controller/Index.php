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

    /**
     * 首页
     * @return string
     */
    public function index()
    {
        return 'welcome';
    }

    /**
     * 首页 - 别名
     * @return string
     */
    public function dashboard()
    {
        return $this->index();
    }

    /**
     * 获取用户提交列表接口
     * @return string
     */
    public function get_list()
    {
        $pageSize = $this->request->param('page_size', 20);
        $paged = $this->request->param('paged', 1);
        $total = db('weixin_design_submit')->count();
        $data['formData'] = db('weixin_design_submit')->order('create_time', 'desc')->page($paged)->limit($pageSize)->select();
        $data['totals'] = $total;
        $data['pages'] = ceil($total / $pageSize);    //  进一法取整,保持多一页页
        $data['paged'] = $paged;
        $data['size'] = intval($pageSize);
        $this->success('获取用户提交数据列表成功', '', $data);
    }

    public function export_list()
    {
        $itemsId = $this->request->param('exports_ids');
        $result = db('weixin_design_submit')->whereIn('id', explode(',', $itemsId))->select();
        $fileName = 'weixin submits export';
        $excelHandle = new \phpToExcel();
        $fields = db('weixin_design_submit')->getTableFields();
        return $excelHandle->push($result, $fields, $fileName);
    }




    /**
     * 单个提交完成
     * @return string
     */
    public function finished()
    {
        $id = $this->request->param('id');
        $id = explode(',', $id);
        if (count($id) < 1) {
            return $this->_package_return('无效操作', '', '', 0);
        }
        $result = '';
        foreach ($id as $i) {
            $result .= db('weixin_design_submit')->where('id', '=', $i)->update(['status' => 1]);
        }
        return $this->success('修改订单状态成功', '', $result);
    }

    /**
     * 单个删除
     * @return string
     */
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