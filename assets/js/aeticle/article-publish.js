$(function () {
    // 初始化富文本编辑器
    initEditor()
    categories()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 获取文章类别数据
    function categories() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('文章分类加载失败');
                let suv = template('tlay-yih', res)
                $('.leibie').html(suv)
                layui.form.render();
            }
        });
    }


    // 上传封面
    $('.layui-btn-danger').on('click', function () {
        $('#dsa').click()
    })
    // 上传封面
    $('#dsa').on('change', function (e) {
        let files = e.target.files
        console.log(files.length);
        if (files.length === 0) return
        // 根据选择第文件，创建URL地址
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })
    let state = '已发布'
    $('#chungao').on('click', function () {
        state = '草稿'
    })
    $('#form-ler').on('submit', function (e) {
        e.preventDefault();

        let fd = new FormData($(this)[0])
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                console.log(blob);
                fd.append('cover_img', blob)
                // console.log(fd);
                fd.forEach(function (i, e) {
                    console.log(e, i);
                });
                console.log(fd);
                stuy(fd)

            })
    })
    function stuy(fd) {
        $.ajax({
            method: 'POST',
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) { return layui.layer.msg('发布失败'); }
                location.href = '/home/aeticle/article-listOf.html'

            }
        });
    }
})