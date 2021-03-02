$(function () {
    const data = {
        username: $('.form-02 [name=username]').val(),
        password: $('.form-02 [name=password]').val()
    }
    // 登录切换注册
    $('#zhu-ce').on('click', function () {
        $('form').eq(0).hide()
        $('form').eq(1).show()
    })
    // 注册切换登录
    $('#deng-lu').on('click', function () {
        $('form').eq(1).hide()
        $('form').eq(0).show()
    })
    // 密码校验
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.form-02 [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 获取用户名注册
    $('.form-02').on('submit', function (e) {
        e.preventDefault();
        const data = {
            username: $('.form-02 [name=username]').val(),
            password: $('.form-02 [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            console.log(data);
            layui.form.val('formUserInfo', data)
            $('#deng-lu').click()
        })
    })
    $('.form-01').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败！');
                }
                layui.layer.msg('登录成功');
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    })
})