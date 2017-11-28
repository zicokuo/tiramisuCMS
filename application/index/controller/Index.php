<?php

namespace app\index\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        $template = "<a href='/admin'>后台</a>";
        return $this->display($template);
    }
}
