{
    let view = {
        el: '#new-song-box',
        template: `
            <div class="back" id="back">
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
                    <div class="cancel" id="cancel">取消</div>
                    <input type="submit" class="save" value="保存">
                </div>
            </form>
        `,
        init() {
            this.$el = $(this.el);
        },
        render(data = {}) { //将data渲染到input框中
            let placeholders = ['name', 'singer', 'url'];
            let html = this.template;
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '');
            });
            this.$el.html(html);
        },
        show() { //展示页面
            this.$el.fadeIn('500');
        },
        hide() { //隐藏页面
            this.$el.fadeOut('fast');
        }
    }

    let model = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: ''
        },
        saveData() {
            let str = ['name', 'singer', 'url'];
            str.map((string) => {
                this.data[string] = $(`input[name=${string}]`).val();
            });
        },
        createSong() { //新建歌曲上传到LeanCloud
            let Songs = AV.Object.extend('Songs');

            let newSong = new Songs();
            newSong.set('name', this.data.name);
            newSong.set('singer', this.data.singer);
            newSong.set('url', this.data.url);

            return newSong.save();
        },
        updateSong() {
            let song = AV.Object.createWithoutData('Songs', this.data.id);

            song.set('name', this.data.name);
            song.set('singer', this.data.singer);
            song.set('url', this.data.url);

            return song.save();
        }
    }

    let controller = {
        init(view, model) { //初始化
            this.view = view;
            this.view.init();
            this.view.hide();
            this.view.render();

            this.model = model;

            this.bindEventHubs();
            this.bindEvents();
        },
        bindEvents() { //绑定事件
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault();
                this.model.saveData();
                this.view.render();
                if (this.model.data.id === '') {
                    this.model.createSong().then(() => {
                        window.eventHub.emit('switchPage');
                    });
                } else {
                    this.model.updateSong().then(() => {
                        window.eventHub.emit('switchPage');
                    });
                }
            });

            this.view.$el.on('click', '#back', () => {
                window.eventHub.emit('switchPage');
            });

            this.view.$el.on('click', '#cancel', () => {
                window.eventHub.emit('switchPage');
                this.view.render();
            })
        },
        bindEventHubs() { //绑定订阅事件
            window.eventHub.on('uploaded', (data) => { //上传歌曲完成
                this.model.saveData();

                let songString = data.substr(0, data.length - 4);
                let namePart = songString.split('-').filter(d => d);
                let songName = '';
                for (let i = 0; i < namePart.length; i++) {
                    if (i >= 1) {
                        songName += namePart[i] + ' ';
                    }
                }
                let url = `http://q1lwd4mpb.bkt.clouddn.com/${encodeURIComponent(songString)}.mp3`;

                this.model.data.name = songName;
                this.model.data.singer = namePart[0];
                this.model.data.url = url;
                this.view.show();
                this.view.render(this.model.data);
            });

            window.eventHub.on('editSong', (data) => { //编辑歌曲
                this.view.show();
                this.model.data = data;
                this.view.render(this.model.data);
            });

            window.eventHub.on('switchPage', () => { //切换页面
                if (this.view.$el.is(':hidden')) {
                    this.view.show();
                } else {
                    this.view.hide();
                }
            })
        }
    }

    controller.init(view, model);
}