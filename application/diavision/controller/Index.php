<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/24
 * Time: 15:50
 */

namespace app\diavision\controller;

use app\admin\common\BaseController;
use think\Controller;

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
        $this->response_success('获取用户提交数据列表成功', '', $data);
    }

    public function export_list()
    {
        $itemsId = $this->request->param('exports_ids');
        $result = db('weixin_design_submit')->whereIn('id', explode(',', $itemsId))->select();
        $fileName = 'weixin submits export';
        $excelHandle = new \phpToExcel();
        $fields = db('weixin_design_submit')->getTableFields();
        $fileUrl = $excelHandle->push($result, $fields, $fileName);
        $this->response_success('提交列表已成功导出', $fileUrl, ['fileUrl' => $fileUrl, 'fileName' => $fileName]);
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
            $this->response_error('无效操作', '', $id);
        }
        $result = '';
        foreach ($id as $i) {
            $result .= db('weixin_design_submit')->where('id', '=', $i)->update(['status' => 1]);
        }
        $this->response_success('修改订单状态成功', '', $result);
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
            $this->response_error('无效操作');
        }
        $result = '';
        foreach ($id as $i) {
            $result .= db('weixin_design_submit')->where('id', '=', $i)->delete();
        }
        $this->response_success('已删除订单' . $result, '', $result);
    }


}