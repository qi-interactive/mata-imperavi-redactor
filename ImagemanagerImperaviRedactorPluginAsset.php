<?php

namespace mata\imperavi;
use yii\web\AssetBundle;

class ImagemanagerImperaviRedactorPluginAsset extends AssetBundle
{
    public $sourcePath = '@yii/imperavi/assets/plugins/imagemanager';
    public $js = [
        'imagemanager.js'
    ];
    public $css = [

    ];
    public $depends = [
        'mata\imperavi\ImperaviRedactorAsset'
    ];
}