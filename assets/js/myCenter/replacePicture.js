$(function () {
    var $image = $('#image')
    const options = {
        aspectratio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)
    // 上传按钮
    $('#uploadFile').on('click', function () {
        // 点击上传框
        $("#selectFile").click()
    })
    // 上传框
    $("#selectFile").on('change', function (e) {
        var filelist = e.target.files
        // console.log(filelist);
        if (filelist.length === 0) {
            console.log(123);
            return layui.layer.msg('请选择照片');
        }
        var file = e.target.files[0]
        var imgurl = URL.createObjectURL(file)

        console.log(imgurl);
        $image.cropper('destroy').attr('src', imgurl).cropper(options)
    })
    // 确定按钮
    $('.layui-btn-danger').on('click', function () {
        var dataurl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        // console.log(dataurl);
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataurl
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更换失败');
                }
                layui.layer.msg('更换成功');
                console.log(res);
                window.parent.gitsut()
            }
        });

    })

})