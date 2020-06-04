<template>
<el-drawer :before-close="cancelForm" :visible.sync="dialog" direction="rtl" custom-class="demo-drawer" ref="drawer">
    <div class="demo-drawer__content">
        <h2>登录</h2>
        <el-form :model="form">
            <el-form-item>
                <el-input type="text" style="width:80%" v-model="form.username" autocomplete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" style="width:80%" v-model="form.password" autocomplete="off" show-password placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="margin-right:50px;">
                <el-input type="text" style="width:46%" v-model="form.verifyCode" autocomplete="off" placeholder="验证码"></el-input>
                <div id="verifyImg" @mouseover="cut=true" @mouseout="cut=false" style="display: inline;width:45%;">
                    <div :style="{backgroundImage:'url('+form.verifyImg+')',height: '48px',width:'130px'}" style="float:right;">
                        <div class="bg-cut" v-show="cut" @click="getVertifyCode()"><span>换一张</span></div>
                    </div>
                </div>
            </el-form-item>
            <el-checkbox-group v-model="form.rememberMe" style="text-align:left;margin:25px 0; margin-left:50px;">
                <el-checkbox label="记住我" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form>
        <div class="demo-drawer__footer">
            <el-button type="primary" style="width:80%" @click="login()" :loading="loading">{{ loading ? '登录中 ...' : '登 录' }}</el-button>
        </div>
    </div>
</el-drawer>
</template>

<script>
export default {
    data() {
        return {
            table: false,
            dialog: false,
            loading: false,
            cut: false,
            form: {
                username: '',
                password: '',
                verifyCode: '',
                verifyImg: '',
                rememberMe: false,
                delivery: false,
                resource: '',
                desc: ''
            },
            inputSize: '70px',
            timer: null,
        };
    },
    created() {
        this.pageShow()
        this.getVertifyCode()
        let _this = this;
        document.onkeydown = function (e) {
            let loginMenu = document.querySelector('.el-drawer__wrapper');
            if (loginMenu && loginMenu.style.cssText.indexOf('display') == -1 && window.event.keyCode == 13) {
                _this.login();
            }
        }
    },
    methods: {
        cancelForm() {
            this.loading = false
            this.dialog = false
            clearTimeout(this.timer)
        },
        pageShow() {
            if (localStorage.getItem('user')) {
                let user = localStorage.getItem('user').split('&')
                let boo = {
                    'true': true,
                    'false': false
                }
                this.form.username = user[0]
                this.form.password = user[1]
                this.form.rememberMe = boo[user[2]]
            }
        },
        getVertifyCode() { //获取验证码
            let _this = this;
            this.$axios('verifyImage/', {
                    method: 'get',
                    responseType: 'arraybuffer'
                })
                .then(res => {
                    _this.form.verifyImg = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((res, byte) => res + String.fromCharCode(byte), ''))
                })
        },
        login() { //登录
            let _this = this
            this.$axios.defaults.withCredentials = true
            this.$axios('login', {
                    method: 'post',
                    data: {
                        "username": _this.form.username,
                        "password": _this.form.password,
                        "rememberMe": Number(_this.form.rememberMe),
                        "verifyCode": _this.form.verifyCode
                    },
                    credentials: "include"
                })
                .then(res => {
                    if (res.data.status === 200) {
                        _this.open('成功', '登录成功', 'success')
                        if (_this.form.rememberMe) {
                            localStorage.setItem('user', _this.form.username + '&' + _this.form.password + '&' + _this.form.rememberMe)
                        } else {
                            localStorage.removeItem('user');
                        }
                        console.log(res.data)
                        this.$cookies.set('activeUser', res.data.userDetail.id + '&' + res.data.userDetail.username, 10 * 60 * 60)
                        localStorage.setItem('HEADER_TOKEN', res.data.headerToken)
                        // if (res.data.userDetail.power == "ROLE_ADMIN") { //需改动
                        this.$router.push('/Backstage')
                        // }
                    } else {
                        _this.getVertifyCode(); //更新验证码
                        _this.open('错误', res.data.error, 'error')
                    }
                })
                .catch(err => {
                    if (err.response) {
                        _this.open('错误', err.response.data.message, 'error')
                    }
                })
        },
        open(title, msg, type) {
            this.$notify({
                title: title,
                message: msg,
                type: type,
                duration: 2000,
                showClose: false
            });
        }
    }
}
</script>

<style scoped>
.bg-cut {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    line-height: 48px;
    text-align: center;
    color: white;

}
</style>
