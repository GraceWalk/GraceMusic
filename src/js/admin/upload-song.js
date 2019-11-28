{
    let view = {
        el: '#pickfiles',
        template: `
        <div class="title">GraceMusic</div>
        <div class="uploadText"><svg t="1574937763165" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7324" width="100" height="100"><path d="M384 744H296a240 240 0 0 1 0-480h56a32 32 0 0 1 0 64h-56a176 176 0 0 0 0 352h88a32 32 0 0 1 0 64z" p-id="7325" fill="#aad08f"></path><path d="M736 384a32 32 0 0 1-32-32v-40a192 192 0 0 0-382.08-27.44 32 32 0 1 1-63.36-9.04A256 256 0 0 1 768 312v40a32 32 0 0 1-32 32z" p-id="7326" fill="#aad08f"></path><path d="M728 744H640a32 32 0 0 1 0-64h88a176 176 0 0 0 6.8-352 32 32 0 0 1 2.4-64A240 240 0 0 1 728 744zM512 856a32 32 0 0 1-32-32V544a32 32 0 0 1 64 0v280a32 32 0 0 1-32 32z" p-id="7327" fill="#aad08f"></path><path d="M512 936m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" p-id="7328" fill="#aad08f"></path><path d="M648 649.2A32 32 0 0 1 625.12 640L512 526.64 398.88 640a32 32 0 0 1-45.28-45.28l124.48-124.64a48 48 0 0 1 67.92 0L670.4 594.56a32 32 0 0 1-22.4 54.64z" p-id="7329" fill="#aad08f"></path></svg></div>
    `,
        render() {
            $(this.el).html(this.template);
        }
    }

    let model = {}

    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render();
            this.uploader();
        },
        uploader() {
            var uploader = Qiniu.uploader({
                runtimes: 'html5', //上传模式,依次退化
                browse_button: 'pickfiles', //this.view.find('pickfiles'), //上传选择的点选按钮，**必需**
                uptoken_url: 'http://localhost:8888/uptoken', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                domain: 'http://q1lwd4mpb.bkt.clouddn.com/', //bucket 域名，下载资源时用到，**必需**
                get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
                container: 'container', //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '100mb', //最大文件体积限制
                dragdrop: true, //开启可拖曳上传
                drop_element: 'pickfiles', //this.view.find('dropArea')//拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb', //分块上传时，每片的体积
                auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) { // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) { // 每个文件上传前,处理相关的事情
                    },
                    'UploadProgress': function(up, file) { // 每个文件上传时,处理相关的事情
                    },
                    'FileUploaded': function(up, file, info) {
                        let song = file.name;
                        window.eventHub.emit('uploaded', song);
                    },
                    'Error': function(up, err, errTip) { //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function() { //队列文件处理完毕后,处理相关的事情
                    },
                }
            })
        }
    }

    controller.init(view, model);
}