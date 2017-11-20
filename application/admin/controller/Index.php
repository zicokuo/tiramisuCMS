<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/9/28
 * Time: 10:10
 */

namespace app\admin\controller;

use app\admin\common\BaseController;
use think\Controller;
use think\Request;

class Index extends Controller
{
    use BaseController;

    public function __construct(Request $request = null)
    {
        $this->initialization();
        parent::__construct($request);
    }




    public function index()
    {
        var_dump($this->userInfo);
        return 'welcome';
    }

}