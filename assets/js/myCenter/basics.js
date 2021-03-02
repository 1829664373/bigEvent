$(function () {
    dataLoad()
    validation()
    submit()
    reset()
})
// 昵称邮箱
function validation() {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称长度要为1-6'
            }
        }
    })
    layui.form.verify()
}
// 数据
function dataLoad() {
    $.get('/my/userinfo', function (res) {
        console.log(res.data);
        if (res.status !== 0) {
            layui.layer.msg(res.message);
        }
        layui.form.val('formUserInfo', res.data)
    })
}
// 重置表单
function reset() {
    $('.layui-btn-primary').click(function (e) {
        e.preventDefault();
        dataLoad()
    })
}
// 提交数据
function submit() {
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                window.parent.gitsut()
            }
        });
    })
}