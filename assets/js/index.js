$(function () {

    (function () {
        if (window.localStorage) {
            if (!localStorage.getItem('firstLoad')) {
                localStorage['firstLoad'] = true;

                window.location.reload();
            }
            else
                localStorage.removeItem('firstLoad');
        }
    })();

    gitsut()
    exitFunction()
})
// 获取数据
function gitsut() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取数据失败');
            }
            // 头像
            headPortrait(res.data)
        }
    });
}
// 头像
function headPortrait(hp) {
    // console.log(hp.user_pic);
    const name = hp.nickname || hp.username
    $('.Personal').html('欢迎 ' + name)
    if (hp.user_pic !== null) {
        $('.tx-img').attr('src', hp.user_pic).show()
        $('.tx-text').hide()
    } else {
        $('.tx-text').html(name[0].toUpperCase()).show()
        $('.tx-img').hide()
    }

}
// 退出功能
function exitFunction() {
    $('.exit').on('click', function (e) {
        e.preventDefault();
        layui.layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
}