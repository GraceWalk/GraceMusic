{
    let view = {
        el: '#song-list-box',
        template: `
        <div class="new" id="new">
            <svg t="1574915155727" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6613" width="32" height="32"><path d="M355.945 727.76c0 49.415 14.765 0-29.99 69.531-26.737 41.594-89.485-28.237-89.485-77.651 0-49.46 40.071-89.509 89.485-89.509 49.438 0 29.99 48.215 29.99 97.629M808.909 673.433c0 49.413 14.765 0-29.99 69.554-26.737 41.57-89.485-28.261-89.485-77.697 0-49.415 40.071-89.509 89.485-89.509 49.46-0.001 29.99 48.213 29.99 97.652" fill="#FC607B" p-id="6614"></path><path d="M262.168 832.771c-62.379 0-113.108-50.752-113.108-113.131 0-62.38 50.729-113.132 113.108-113.132 62.379 0 113.131 50.752 113.131 113.132 0.001 62.379-50.752 113.131-113.131 113.131z m0-179.017c-36.311 0-65.862 29.551-65.862 65.886 0 36.334 29.551 65.886 65.862 65.886 36.334 0 65.886-29.552 65.886-65.886 0-36.335-29.552-65.886-65.886-65.886zM720.854 777.243c-62.38 0-113.109-50.752-113.109-113.132 0-62.379 50.729-113.131 113.109-113.131 62.379 0 113.13 50.752 113.13 113.131 0 62.38-50.751 113.132-113.13 113.132z m0-179.016c-36.312 0-65.863 29.552-65.863 65.885 0 36.334 29.552 65.886 65.863 65.886 36.333 0 65.885-29.552 65.885-65.886 0-36.334-29.551-65.885-65.885-65.885z" fill="#213847" p-id="6615"></path><path d="M805.355 652.162c-13.056 0-23.623-10.566-23.623-23.623V251.75c0-25.284-19.954-45.977-44.938-47.2L422.66 273.02c-26.045 0-47.246 21.201-47.246 47.246V459.05c0 13.057-10.565 23.622-23.623 23.622-13.057 0-23.623-10.565-23.623-23.622V320.266c0-51.19 40.902-92.992 91.746-94.446l314.573-68.562c52.112 0 94.49 42.378 94.49 94.492v376.789c0.002 13.057-10.564 23.623-23.622 23.623zM351.792 573.611c-13.057 0-23.623-10.565-23.623-23.623V524.89c0-13.058 10.566-23.623 23.623-23.623 13.058 0 23.623 10.565 23.623 23.623v25.099c0 13.057-10.565 23.622-23.623 23.622zM351.792 738.079c-13.057 0-23.623-12.39-23.623-27.701v-94.876c0-15.312 10.566-27.703 23.623-27.703 13.058 0 23.623 12.392 23.623 27.703v94.876c0 15.311-10.565 27.701-23.623 27.701z" fill="#213847" p-id="6616"></path><path d="M358.875 456.097c-10.796 0-20.555-7.452-23.023-18.433-2.86-12.733 5.122-25.375 17.856-28.236l419.307-94.491c12.711-2.837 25.376 5.121 28.236 17.855 2.861 12.734-5.122 25.376-17.855 28.236L364.088 455.52a23.759 23.759 0 0 1-5.213 0.577z" fill="#213847" p-id="6617"></path></svg>
        </div>
        <div class="song-list">
            <div class="title">歌曲目录</div>
            <ul>
            <li><div class="number">序号</div><div class="name">歌曲</div><div class="singer">歌手</div><div class="edit">编辑</div><div class="destroy">删除</div></li>
            </ul>
            <div class="turing-page">
                <div class="prev" id="prev">上一页</div>
                <div class="pages" id="pages">__nowPage__ / __allPage__</div>
                <div class="next" id="next">下一页</div>
            </div>
        </div>
        `,
        init() {
            this.$el = $(this.el);
        },
        render({ songs = [], nowPage, allPage }) {
            let html = this.template;
            html = html.replace('__nowPage__', nowPage).replace('__allPage__', allPage);
            this.$el.html(html);
            let number = 1;
            let liList = songs.map((song) => {
                let $li = $('<li></li>').html(`<div class="number">${number++}</div><div class="name">${song.name}</div><div class="singer">${song.singer}</div><svg t="1574916533954" class="edit" id="edit" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1962" width="24" height="24"><path d="M978.1248 45.8752c-28.7744-28.7744-67.0208-44.5952-107.7248-44.5952s-78.9504 15.8208-107.7248 44.5952l-652.8 652.8c-2.6624 2.6624-4.6592 5.8368-5.9392 9.3696l-102.4 281.6c-3.3792 9.3696-1.0752 19.8144 5.9392 26.8288 4.864 4.864 11.4176 7.4752 18.1248 7.4752 2.9184 0 5.888-0.512 8.7552-1.536l281.6-102.4c3.5328-1.28 6.7072-3.328 9.3696-5.9392l652.8-652.8c28.7744-28.7744 44.5952-67.0208 44.5952-107.7248s-15.8208-78.9504-44.5952-107.7248zM293.12 873.8816l-224.7168 81.7152 81.7152-224.7168 566.6816-566.6816 143.0016 143.0016-566.6816 566.6816zM941.8752 225.0752l-45.8752 45.8752-143.0016-143.0016 45.8752-45.8752c19.0976-19.0976 44.4928-29.5936 71.4752-29.5936s52.3776 10.496 71.4752 29.5936c19.0976 19.0976 29.5936 44.4928 29.5936 71.4752s-10.496 52.3776-29.5936 71.4752z" p-id="1963" fill="#535970"></path></svg><svg t="1574916683319" class="destroy" id="destroy" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3335" width="24" height="24"><path d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768zM416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768zM928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160zM736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z" p-id="3336" fill="#535970"></path></svg>`).attr('song-id', song.id);
                return $li;
            })
            liList.map((li, i) => {
                this.$el.find('ul').append(li);
            })
        },
        show() {
            console.log('显示歌单界面')
            this.$el.css("z-index", '2');
            this.$el.fadeIn('fast');
        },
        hide() {
            console.log('隐藏歌单界面')
            this.$el.css("z-index", '-1');
            this.$el.fadeOut('fast');
        },
        toPage(nowPage, allPage) {
            this.$el.find('#pages').html(`${nowPage} / ${allPage}`);
        }
    }

    let model = {
        data: {
            songs: [],
            nowPage: 1,
            allPage: 1
        },
        getSongs() {
            let songs = new AV.Query('Songs');

            return songs.find().then((songs) => {
                this.data.allPage = parseInt((songs.length - 1) / 8) + 1;
                if (this.data.nowPage > this.data.allPage) {
                    this.data.nowPage = this.data.allPage;
                }
                this.data.songs = songs.map((song) => {
                    return { id: song.id, ...song.attributes }
                })
                return songs;
            })
        },
        destroySong(destroySongId) {
            let song = AV.Object.createWithoutData('Songs', destroySongId);
            return song.destroy();
        },
        toPage(allLi, pagedNum) {
            let allPageNum = this.data.allPage;
            if (1 <= pagedNum && pagedNum <= allPageNum) {
                for (let i = 1; i <= allLi.length - 1; i++) {
                    if (i <= (pagedNum - 1) * 8) {
                        $(allLi[i]).hide();
                    } else {
                        $(allLi[i]).show();
                    }
                }
                this.data.nowPage = pagedNum;
            }
        }
    }

    let controller = {
        init(view, model) {
            this.view = view;
            this.view.init();
            this.model = model;
            this.bindEventHubs();
            this.model.getSongs().then(() => {
                this.view.render(this.model.data);
                this.bindEvents();
            })
        },
        toPage(status) {
            let nowPage = this.model.data.nowPage;
            let allPage = this.model.data.allPage;
            let allLi = this.view.$el.find('li');
            let addPageNum = 0;

            switch (status) {
                case 'prev':
                    addPageNum = -1;
                    break;
                case 'now':
                    addPageNum = 0;
                    break;
                case 'next':
                    addPageNum = 1;
                    break;
                case 'last':
                    addPageNum = allPage - nowPage;
                    break;
            }

            this.model.toPage(allLi, nowPage + addPageNum);
            this.view.toPage(this.model.data.nowPage, allPage);
        },
        bindEvents() {
            this.view.$el.on('click', '#edit', (e) => { //绑定编辑按键
                e.preventDefault();
                let editSongId = $(e.currentTarget).parent().attr('song-id');
                this.model.data.songs.map((song) => {
                    if (song.id === editSongId) {
                        window.eventHub.emit('editSong', song);
                        this.view.hide();
                    }
                })
            })

            this.view.$el.on('click', '#new', () => { //绑定新建歌曲按键
                window.eventHub.emit('switchPage');
            })

            this.view.$el.on('click', '#destroy', (e) => { //删除歌曲事件
                let destroySongId = $(e.currentTarget).parent().attr('song-id');
                this.model.destroySong(destroySongId).then(() => {
                    this.model.getSongs().then(() => {
                        this.view.render(this.model.data);
                        this.toPage('now');
                    })
                })
            })

            this.view.$el.on('click', '#next', () => { //跳转到下一页
                this.toPage('next');
            })

            this.view.$el.on('click', '#prev', () => { //跳转到上一页
                this.toPage('prev');
            })
        },
        bindEventHubs() {
            window.eventHub.on('switchPage', (x) => { //切换页面
                console.log('歌单页面的切换')
                if (this.view.$el.is(':hidden')) {
                    this.model.getSongs().then(() => { //刷新歌单
                        this.view.render(this.model.data);
                        if (x === 'new') {
                            this.toPage('last');
                        } else {
                            this.toPage('now');
                        }
                    });
                    this.view.show();
                } else {
                    this.view.hide();
                }
                console.log('----------------')
            })

            window.eventHub.on('uploaded', () => {
                this.view.hide();
            })
        }
    }

    controller.init(view, model);
}