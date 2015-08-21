<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace mata\imperavi;
use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class LinkmatacmsImperaviRedactorPluginAsset extends AssetBundle
{
	public $sourcePath = '@vendor/mata/mata-imperavi-redactor/assets/plugins/linkmatacms';

	public $js = [
		'linkmatacms.js'
	];

    public $css = [

    ];

	public $depends = [
		'mata\imperavi\ImperaviRedactorAsset'
	];
}
