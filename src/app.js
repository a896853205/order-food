/**
 * Created by HP on 2017/3/26.
 */
// 引入normalize.css文件
import 'normalize.css';
// 引入样式基本文件
import './style/base.css';
// 引入头部滚动样式文件
import './style/head-adv.css';
// 引入头部桌位样式文件
import './style/header-info.css';
// 引入左边导航样式文件
import './style/body-nav.css';
// 引入右边主体样式文件
import './style/body-right-div.css';
// 引入脚部主体样式文件
import './style/footer.css';

// 引入vue
import Vue from './script/vue.js';
// 引入暂时数据
import mainData from './data/main.json';

(function (){
    function App(){
        this.init = function (){
	        let rightData = mainData.right;
            new Vue({
            	el: '#main',
	            data: {
		            allData: rightData,
		            nowPrice: 0,
		            nowNum: 0
	            },
	            methods:{
		            /**
		             * 增加菜
		             *
		             * @param {string} price 当前菜的价格
		             */
            		addMeal(price){
			            /**
			             * 1位小数加和
			             *
			             * @param {number} num1 第一个数
			             * @param {number} num2 第二个数
			             * @result {number} result 加和结果
			             */
            			function pointAdd (num1, num2){
                            num1*=10;
                            num2*=10;
				            return (num1+num2)/10;
			            }
            			this.nowPrice = pointAdd(this.nowPrice, window.parseFloat(price));
                        this.nowNum++;
		            }
	            }
            });
        }
    }
    window.app = new App();
    app.init();
})();