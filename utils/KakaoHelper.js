class KakaoHelper {
    constructor(data) {
        this.kakao = data;

        // this.domain = process.env.NODE_ENV === "production" ? "http://jayuvillages.com" : "http://localhost:3000";
        this.domain = "https://jayuvillage.com";
    }

    shareQna(item, container = "#kakao") {
        this.kakao.Link.createDefaultButton({
            container: container,
            objectType: 'feed',
            content: {
                title: item.title,
                description: '',
                imageUrl:
                    '',
                link: {
                    mobileWebUrl: `${this.domain}/qnas`,
                    webUrl: `${this.domain}/qunas`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `${this.domain}/qnas`,
                        webUrl: `${this.domain}/qnas}`,
                    },
                },
            ],
        })
    }

    initSharePost(item, userId = undefined, container = "#kakao") {
        this.kakao.Link.createDefaultButton({
            container: container,
            objectType: 'feed',
            content: {
                title: item.title,
                description: '',
                imageUrl:
                    item.img ? item.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/posts/${item.id}`,
                    webUrl: `${this.domain}/posts/${item.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `${this.domain}/posts/${item.id}`,
                        webUrl: `${this.domain}/posts/${item.id}`,
                    },
                },
            ],
            serverCallbackArgs: {
                user_id: userId,
                post_id: item.id,
            }
        })
    }

    sharePost(item, userId = undefined) {
        this.kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: item.title,
                description: '',
                imageUrl:
                    item.img ? item.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/posts/${item.id}`,
                    webUrl: `${this.domain}/posts/${item.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `${this.domain}/posts/${item.id}`,
                        webUrl: `${this.domain}/posts/${item.id}`,
                    },
                },
            ],
            serverCallbackArgs: {
                user_id: userId,
                post_id: item.id,
            }
        })
    }

    shareScrap(item, userId = undefined) {
        this.kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: item.title,
                description: '',
                imageUrl:
                    item.img ? item.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/scraps/${item.id}`,
                    webUrl: `${this.domain}/scraps/${item.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `${this.domain}/scraps/${item.id}`,
                        webUrl: `${this.domain}/scraps/${item.id}`,
                    },
                },
            ],
            serverCallbackArgs: {
                user_id: userId,
                post_id: item.post.id,
            }
        })
    }

    shareScrapItem(item, userId = undefined) {
        this.kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: item.post.title,
                description: '',
                imageUrl:
                    item.post.img ? item.post.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/posts/${item.post.id}`,
                    webUrl: `${this.domain}/posts/${item.post.id}`,
                },
            },
            buttons: [
                {
                    title: '보러가기',
                    link: {
                        mobileWebUrl: `${this.domain}/posts/${item.post.id}`,
                        webUrl: `${this.domain}/posts/${item.post.id}`,
                    },
                },
            ],
            serverCallbackArgs: {
                user_id: userId,
                post_id: item.post.id,
            }
        })
    }

    shareScrapItems(items, userId = undefined, nickname) {
        if (items.length === 0)
            return alert("최소 1개 이상의 게시글을 선택해주세요.");

        if (items.length === 1)
            return this.shareScrapItem(items[0], userId);

        if (items.length > 3)
            return alert("최대 3개의 게시글만 공유 가능합니다.");

        let contents = items.map(item => {
            return {
                title: item.post.title,
                description: item.post.created_at,
                imageUrl: item.post.img ? item.post.img.url : '',
                link: {
                    mobileWebUrl: `${this.domain}/posts/${item.post.id}`,
                    webUrl: `${this.domain}/posts/${item.post.id}`,
                }

            };
        });

        this.kakao.Link.sendDefault({
            objectType: 'list',
            headerTitle: `${nickname}님 자유마을 소식`,
            headerLink: {
                mobileWebUrl: this.domain,
                webUrl: this.domain,
            },
            contents: contents,
            /*buttons: [
                {
                    title: '자세히보기',
                    link: {
                        mobileWebUrl: `${this.domain}/scraps/${item.id}`,
                        webUrl: `${this.domain}/scraps/${item.id}`,
                    },
                },
            ],*/
            serverCallbackArgs: {
                user_id: userId,
                post_id: items[0].post.id,
            }
        })
    }

}

export default KakaoHelper;
