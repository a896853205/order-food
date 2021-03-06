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

let TWEEN = require('tween.js');

(function (){
    function App(){
        this.init = function (){
            new Vue({
            	el: '#main',
	            data: {
		            allData: mainData,
		            nowPrice: 0,
		            nowNum: 0,
		            animatedNumber: 0
	            },
	            methods:{
		            /**
		             * 增加菜
		             *
		             * @param {object} price 当前菜
		             * @param {object} unit 当前菜单
		             */
            		addMeal(price, unit) {
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
            			this.nowPrice = pointAdd(this.nowPrice, window.parseFloat(price.cPrice));
                        this.nowNum++;
                        // 当前菜数量增加
			            price.pointNum++;
			            // 单元数量增加
			            unit.unitPointNum++;
            		},
		            /**
		             * 减菜
		             *
		             * @param {object} price 当前菜
		             * @param {object} unit 当前菜单
		             */
		            minusMeal(price, unit){
			            /**
			             * 1位小数相减
			             *
			             * @param {number} num1 第一个数
			             * @param {number} num2 第二个数
			             * @result {number} result 相减结果
			             */
			            function pointMinus (num1, num2){
				            num1 *= 10;
				            num2 *= 10;
				            return (num1 - num2) / 10;
			            }
			            this.nowPrice = pointMinus(this.nowPrice, window.parseFloat(price.cPrice));
			            this.nowNum--;
			            // 当前菜数量减少
			            price.pointNum--;
			            // 单元数量减少
			            unit.unitPointNum--;
		            },
		            /**
		             * 菜单选择
		             *
		             * @param {object} 点击的li标签所在对象
		             */
		            changUnit(liActive) {
		            	this.allData.bodyData.forEach(item => {
                            item.isActive = false;
			            });
			            liActive.isActive = true;
		            },
		            /**
		             * 单独菜,菜单显示
		             *
		             * @param {object} 当前的菜
		             */
		            showMenu(item) {
			            item.nemuShow = !item.nemuShow;
		            },
		            /**
		             * 展示广告
		             */
		            showAdv() {
		            	this.allData.headData.isShow = !this.allData.headData.isShow;
		            }
	            },
	            watch: {
		            nowPrice : function(newValue, oldValue) {
			            let vm = this;
			            function animate (time) {
				            requestAnimationFrame(animate);
				            TWEEN.update(time);
			            }
			            new TWEEN.Tween({ tweeningNumber: oldValue })
				            .easing(TWEEN.Easing.Quadratic.Out)
				            .to({ tweeningNumber: newValue }, 500)
				            .onUpdate(function () {
					            vm.animatedNumber = this.tweeningNumber.toFixed(1)
				            })
				            .start();
			            animate();
		            }
	            }

            });
        }
    }
    window.app = new App();
    app.init();
})();