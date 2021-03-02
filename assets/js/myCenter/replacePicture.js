$(function () {
    var $image = $('#image')
    const options = {
        aspectratio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)
    $('#uploadFile').on('click', function () {
        $("#selectFile").click()
    })
    $("#selectFile").on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layui.layer.msg('请选择照片');
        }
        var file = e.target.files[0]
        var imgurl = URL.createObjectURL(file)
        $image.cropper('destroy').attr('src', imgurl).cropper(options)
    })
    $('.layui-btn-danger').click(function () {
        var dataurl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: dataurl,
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