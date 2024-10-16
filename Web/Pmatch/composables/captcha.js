import { ref } from 'vue';

export default function useCaptcha() {
    const captchaCode = ref('');

    function GVerify(options) {
        this.con = document.getElementById(options.id); // 根據 options.id 找到對應容器
        this.options = {
            // 預設的 options 參數
            canvasId: 'verifyCanvas', // Canvas ID
            width: this.con.offsetWidth, // 預設 Canvas 寬度
            height: this.con.offsetHeight, // 預設 Canvas 高度
            type: 'number', // 設定為數字類型的驗證碼
            code: '',
        };

        if (Object.prototype.toString.call(options) === '[object Object]') {
            for (var i in options) {
                this.options[i] = options[i];
            }
        } else {
            this.options.id = options;
        }

        this.options.numArr = '0,1,2,3,4,5,6,7,8,9'.split(','); // 數字字符集

        this._init();
        this.refresh();
    }

    GVerify.prototype = {
        /** 初始化方法 **/
        _init: function () {
            var canvas = document.createElement('canvas');
            canvas.id = this.options.canvasId;
            let { width, height } = this.options;
            canvas.width = width;
            canvas.height = height;
            canvas.style.cursor = 'pointer';
            canvas.innerHTML = '您的瀏覽器版本不支持canvas';
            this.con.appendChild(canvas);
            var parent = this;
            canvas.onclick = function () {
                parent.refresh();
            };
        },

        /** 生成驗證碼 **/
        refresh: function () {
            var canvas = document.getElementById(this.options.canvasId);
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
            }
            ctx.textBaseline = 'middle';

            ctx.fillStyle = randomColor(180, 240); // 背景顏色
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            var txtArr = this.options.numArr; // 只生成數字
            this.options.code = '';
            for (var i = 1; i <= 4; i++) {
                // 生成4位數
                var txt = txtArr[randomNum(0, txtArr.length)];
                this.options.code += txt;
                ctx.font = randomNum(this.options.height / 2, this.options.height) + 'px SimHei'; // 隨機生成字體大小
                ctx.fillStyle = randomColor(50, 160); // 隨機生成字體顏色
                ctx.shadowOffsetX = randomNum(-3, 3);
                ctx.shadowOffsetY = randomNum(-3, 3);
                ctx.shadowBlur = randomNum(-3, 3);
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                var x = (this.options.width / 5) * i;
                var y = this.options.height / 2;
                var deg = randomNum(-30, 30);
                /** 設定旋轉角度和座標原點 **/
                ctx.translate(x, y);
                ctx.rotate((deg * Math.PI) / 180);
                ctx.fillText(txt, 0, 0);
                /** 恢復旋轉角度和座標原點 **/
                ctx.rotate((-deg * Math.PI) / 180);
                ctx.translate(-x, -y);
            }

            /** 繪製干擾線 **/
            for (var i = 0; i < 4; i++) {
                ctx.strokeStyle = randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.stroke();
            }

            /** 繪製干擾點 **/
            for (var i = 0; i < this.options.width / 4; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        },

        /** 驗證驗證碼 **/
        validate: function (code) {
            var code = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            return code === v_code;
        },
    };

    /** 生成隨機數 **/
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /** 生成隨機顏色 **/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return `rgb(${r},${g},${b})`;
    }

    return {
        GVerify,
        captchaCode,
    };
}
