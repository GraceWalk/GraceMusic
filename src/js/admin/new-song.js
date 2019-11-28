{
    let view = {
        el: '#new-song-box',
        template: `
            <div class="back">
                <svg t="1574907301736" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2485" width="24" height="24"><path d="M528.527 1024c-16.05 0-32.099-5.98-44.345-17.981L24.469 555.5c-24.492-23.962-24.492-62.874 0-86.876l459.713-450.56c24.492-24.003 64.157-24.003 88.649 0 24.492 23.962 24.492 62.874 0 86.876L157.463 512.041l415.368 407.06c24.492 24.003 24.492 62.874 0 86.876-12.204 12.042-28.254 18.022-44.304 18.022z" p-id="2486" fill="#535970"></path></svg>
            </div>
            <form class="new-song">
                <div class="title">新建歌曲</div>
                <div class="input-box">
                    <div>
                        <label for="">歌曲</label>
                        <input type="text" autocomplete="off" name="name" value="__name__">
                    </div>
                    <div>
                        <label for="">歌手</label>
                        <input type="text" autocomplete="off" name="singer" value="__singer__">
                    </div>
                    <div>
                        <label for="">链接</label>
                        <input type="text" autocomplete="off" name="url" value="__url__">
                    </div>
                </div>
                <div class="change">
                    <div class="cancel">取消</div>
                    <input type="submit" class="save" value="保存">
                </div>
            </form>
        `,
        render(data = {}) {
            let placeholders = ['name', 'singer', 'url'];
            let html = this.template;
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '');
            });
            $(this.el).html(html);
            $(this.el).hide();
        }
    }

    let model = {
        data: {
            name: '',
            singer: '',
            url: ''
        },
        getData() {
            let str = ['name', 'singer', 'url'];
            str.map((string) => {
                this.data[string] = $(`input[name=${string}]`).val();
            });
        },
        createSong() {
            let Songs = AV.Object.extend('Songs');
            let newSong = new Songs();
            newSong.set('name', this.data.name);
            newSong.set('singer', this.data.singer);
            newSong.set('url', this.data.url);
            newSong.save().then((data) => {
                console.log('创建成功');
                console.log(data);
            })
        }
    }

    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render();
            this.bindEventHubs();
            this.bindEvents();
        },
        bindEvents() {
            $(this.view.el).on('submit', 'form', (e) => {
                e.preventDefault();
                this.model.getData();
                this.model.createSong();
            })
        },
        bindEventHubs() {
            window.eventHub.on('uploaded', (data) => {
                let songName = data.substr(0, data.length - 4);
                let url = `http://q1lwd4mpb.bkt.clouddn.com/${encodeURIComponent(songName)}.mp3`;
                this.model.data.name = songName;
                this.model.data.url = url;
                this.view.render(this.model.data);
            })
        }
    }

    controller.init(view, model);
}