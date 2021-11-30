
export default function appScr(express, bodyParser, fs, crypto, http, CORS, User, m) {
    const app = express();
    const path = import.meta.url.substring(7);
    const headersHTML = {'Content-Type':'text/html; charset=utf-8',...CORS}
    const headersTEXT = {'Content-Type':'text/plain',...CORS}
    const headersJSON={'Content-Type':'application/json',...CORS}
    const headersCORS={...CORS}; 

    app    
        .use(bodyParser.urlencoded({extended:true}))  
        .use(bodyParser.json()) 
        .all('/login/', r => {
            r.res.set(headersTEXT).send('itmo307694');
        })
        .all('/code/', r => {
            r.res.set(headersTEXT)
            fs.readFile(path,(err, data) => {
                if (err) throw err;
                r.res.end(data);
              });           
        })
        .all('/sha1/:input/', r => {
            r.res.set(headersTEXT).send(crypto.createHash('sha1').update(r.params.input).digest('hex'))
        })
        .get('/req/', (req, res) =>{
            res.set(headersTEXT);
            let data = '';
            http.get(req.query.addr, async function(response) {
                await response.on('data',function (chunk){
                    data+=chunk;
                }).on('end',()=>{})
                res.send(data)
            })
        })
        .post('/req/', r =>{
            r.res.set(headersTEXT);
            const {addr} = r.body;
            r.res.send(addr)
        })
        .all('/wordpress/', r =>{
            r.res.set(headersHTML);
            const {addr} = '<!DOCTYPE html><html><head><title>itmo307694</title><link rel="shortcut icon" type="image/png" href="favicon.png?fresh_new"><link type="text/css" rel="stylesheet" href="/css/newhtmlcss1"><link type="text/css" rel="stylesheet" href="/css/newnavbar1"><script src="/lodash.min.js"></script><script src="/jq/jquery.js"></script><script src="/j/random"></script><script src="/j/time"></script><script src="/j/htmljs"></script><link rel="stylesheet" href="/cm/lib/codemirror.css"><script src="/cm/lib/codemirror.js"></script><script src="/cm/mode/xml/xml.js"></script><script src="/cm/mode/javascript/javascript.js"></script><script src="/cm/mode/css/css.js"></script><script src="/cm/mode/htmlmixed/htmlmixed.js"></script><script src="/cm/addon/edit/matchbrackets.js"></script><script src="/cm/addon/selection/active-line.js"></script><script src="/emmet.js"></script><script src="/jq/splitter-152.js"></script><script src="/clipboard.min.js"></script><link type="text/css" media="all" rel="stylesheet" href="/html_splitter.css"></head><body><nav><div class="nav-wrapper"><div class="nav-bar-left"><div class="nav-bar-left__left-sec"><span id="adder"><svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-4.000000, 0.000000)" fill-rule="nonzero"><g transform="translate(4.000000, 0.000000)"><rect fill="#00B7FF" x="0" y="0" width="25" height="25" rx="12.5"></rect><g transform="translate(4.642857, 4.821429)" fill="#FFFFFF"><rect x="6.25" y="0" width="3.21428571" height="15.5357143"></rect><rect transform="translate(7.812500, 7.589286) rotate(90.000000) translate(-7.812500, -7.589286) " x="6.20535714" y="-0.178571429" width="3.21428571" height="15.5357143"></rect></g></g></g></g></svg></span></div><div class="nav-bar-left__right-sec"><span id="onthefly"><svg class="btn-reload" width="22px" height="25px" viewBox="0 0 22 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-83.000000, 0.000000)" fill="#B9B9C8"><g transform="translate(83.000000, 0.000000)"><path d="M19.3777987,6.7263256 C21.3380171,8.51218446 21.4212465,10.7705492 21.4285707,11.1991302 L21.4285707,13.5076948 C21.4292366,14.0404404 20.9618203,14.469649 20.4178331,14.4602365 C19.8991476,14.452079 19.4603623,14.0479704 19.4430505,13.5415796 L19.4430505,11.4915442 C19.4550356,11.2179551 19.5023099,9.46284368 18.0174977,8.09803588 C16.5826231,6.77903542 14.8008484,6.82296027 14.5012227,6.83488273 L6.13500503,6.83488273 L9.79376873,10.2823559 C10.2372149,10.7034069 10.2032573,11.3698096 9.79376873,11.708031 C9.45152951,11.9910325 8.89355972,12.0054649 8.48606866,11.708031 C6.66367808,9.99119687 4.84195333,8.27436278 3.01956275,6.55690119 C2.96563011,6.50607386 2.7452387,6.28519462 2.72925866,5.93630582 C2.71061527,5.5365897 2.9749518,5.2761781 3.01956275,5.23350824 L8.26967226,0.285687772 C8.67982666,-0.101478395 9.34632757,-0.0889284383 9.72319021,0.285687772 C10.0734195,0.633949074 10.083407,1.20559961 9.72319021,1.58147081 L6.14232922,4.9561542 C9.02672673,4.95301671 11.9104584,4.94987922 14.7941901,4.94674173 C15.2855764,4.95364421 17.5227822,5.03647392 19.3777987,6.7263256 Z M11.6341369,13.2915749 C11.9770419,13.0085733 12.5350117,12.9941409 12.9425028,13.2915749 C14.7642275,15.0084089 16.5866181,16.725243 18.4083428,18.4420771 C18.4629413,18.4941594 18.6833327,18.7144112 18.6993128,19.0639275 C18.7179562,19.4630161 18.4529538,19.7234277 18.4083428,19.7660976 L13.1582333,24.7145455 C12.7487448,25.1017117 12.0822439,25.0885342 11.7053812,24.7145455 C11.3544861,24.3662842 11.3451644,23.7946337 11.7053812,23.418135 L15.2862422,20.0434516 C12.4018447,20.0465891 9.51744718,20.0503541 6.6337155,20.0534916 C6.14232922,20.0459616 3.90578922,19.9631319 2.05077272,18.2732802 C0.0898884447,16.4874214 0.00665906118,14.2296841 7.1049128e-07,13.8011031 L7.1049128e-07,11.491911 C-0.000665124577,10.9591654 0.466751093,10.5299569 1.01073834,10.5393693 C1.52875803,10.5475268 1.96754334,10.9516354 1.98552088,11.4580262 L1.98552088,13.5080616 C1.97353585,13.7816507 1.92626156,15.5373896 3.41107377,16.9015699 C4.84594834,18.2205704 6.62705715,18.177273 6.92734876,18.1653506 L15.2929006,18.1653506 L11.6341369,14.7172499 C11.1906907,14.2961989 11.2253141,13.6297962 11.6341369,13.2915749 Z"></path></g></g></g></svg></span><span><svg width="28px" height="25px" viewBox="0 0 28 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-126.000000, 0.000000)" fill="#B9B9C8"><g transform="translate(126.000000, 0.000000)"><path id="Combined-Shape" d="M2,0 L26,0 C27.1045695,-2.02906125e-16 28,0.8954305 28,2 L28,23 C28,24.1045695 27.1045695,25 26,25 L2,25 C0.8954305,25 1.3527075e-16,24.1045695 0,23 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z M5,5 C3.8954305,5 3,5.8954305 3,7 L3,18 C3,19.1045695 3.8954305,20 5,20 L23,20 C24.1045695,20 25,19.1045695 25,18 L25,7 C25,5.8954305 24.1045695,5 23,5 L5,5 Z"></path></g></g></g></svg></span></div></div><div class="nav-bar-right"><span> <select id="codes"></select></span><span> <select id="insnippet"></select></span><span> <select id="operations">   </select></span></div></div></nav><div id="panes"><div id="topper"><form id="fsaver" action="/download/" enctype="multipart/form-data" method="post"><textarea id="src" lang="ru" title="text/html" name="src" v="wordpress"></textarea></form></div><div id="vwrcont"><iframe id="vwr" width="100%" height="100%" frameborder="0" border="0" name="viewer" src=""></iframe></div></div><script type="text/javascript" src="/js/jquery.qrcode.min.js"></script><script type="text/javascript" src="/socket.io/socket.io.js"></script></body></html>';
            r.res.send(addr)
        })
        .all('/wordpress/wp-json/wp/v2/', r =>{
            r.res.set(headersJSON);
            const {addr} = {
                "namespace": "wp/v2",
                "routes": {
                    "/wp/v2": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "namespace": {
                                        "required": false,
                                        "default": "wp/v2"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2"
                                }
                            ]
                        }
                    },
                    "/wp/v2/posts": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "after": {
                                        "required": false,
                                        "description": "Ограничить ответ записями опубликованными после заданной ISO8601 совместимой даты. ",
                                        "type": "string"
                                    },
                                    "author": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку записями определенных авторов.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "author_exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает записи назначенные определенным авторам.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "before": {
                                        "required": false,
                                        "description": "Ограничить ответ записями опубликованными до заданной ISO8601 совместимой даты.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "desc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "date",
                                        "enum": [
                                            "author",
                                            "date",
                                            "id",
                                            "include",
                                            "modified",
                                            "parent",
                                            "relevance",
                                            "slug",
                                            "include_slugs",
                                            "title"
                                        ],
                                        "description": "Сортировать коллекцию по атрибуту объекта.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Ограничить выборку до записей с одним или несколькими установленными конкретными ярлыками.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "status": {
                                        "required": false,
                                        "default": "publish",
                                        "description": "Ограничить выборку до записей с одним или несколькими установленными статусами.",
                                        "type": "array",
                                        "items": {
                                            "enum": [
                                                "publish",
                                                "future",
                                                "draft",
                                                "pending",
                                                "private",
                                                "trash",
                                                "auto-draft",
                                                "inherit",
                                                "request-pending",
                                                "request-confirmed",
                                                "request-failed",
                                                "request-completed",
                                                "any"
                                            ],
                                            "type": "string"
                                        }
                                    },
                                    "tax_relation": {
                                        "required": false,
                                        "enum": [
                                            "AND",
                                            "OR"
                                        ],
                                        "description": "Ограничить набор результатов основываясь на отношениях между множественными таксономиями.",
                                        "type": "string"
                                    },
                                    "categories": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до объектов с установленным указанным элементом в таксономии categories.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "categories_exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до всех объектов кроме тех, что имеют указанные элементы назначенные в таксономии categories.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "tags": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до объектов с установленным указанным элементом в таксономии tags.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "tags_exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до всех объектов кроме тех, что имеют указанные элементы назначенные в таксономии tags.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "sticky": {
                                        "required": false,
                                        "description": "Ограничить выборку прилепленными объектами.",
                                        "type": "boolean"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID автора объекта.",
                                        "type": "integer"
                                    },
                                    "excerpt": {
                                        "required": false,
                                        "description": "Отрывок объекта.",
                                        "type": "object"
                                    },
                                    "featured_media": {
                                        "required": false,
                                        "description": "ID избранного медиа для объекта.",
                                        "type": "integer"
                                    },
                                    "comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Открыты ли комментарии для объекта.",
                                        "type": "string"
                                    },
                                    "ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Принимает ли объект уведомления.",
                                        "type": "string"
                                    },
                                    "format": {
                                        "required": false,
                                        "enum": [
                                            "standard",
                                            "aside",
                                            "chat",
                                            "gallery",
                                            "link",
                                            "image",
                                            "quote",
                                            "status",
                                            "video",
                                            "audio"
                                        ],
                                        "description": "Формат для объекта.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    },
                                    "sticky": {
                                        "required": false,
                                        "description": "Считать ли объект прилепленным или нет.",
                                        "type": "boolean"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    },
                                    "categories": {
                                        "required": false,
                                        "description": "Элементы назначенные объекту в таксономии category.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "tags": {
                                        "required": false,
                                        "description": "Элементы назначенные объекту в таксономии post_tag.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/posts"
                                }
                            ]
                        }
                    },
                    "/wp/v2/posts/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для записи, если она защищена паролем.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID автора объекта.",
                                        "type": "integer"
                                    },
                                    "excerpt": {
                                        "required": false,
                                        "description": "Отрывок объекта.",
                                        "type": "object"
                                    },
                                    "featured_media": {
                                        "required": false,
                                        "description": "ID избранного медиа для объекта.",
                                        "type": "integer"
                                    },
                                    "comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Открыты ли комментарии для объекта.",
                                        "type": "string"
                                    },
                                    "ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Принимает ли объект уведомления.",
                                        "type": "string"
                                    },
                                    "format": {
                                        "required": false,
                                        "enum": [
                                            "standard",
                                            "aside",
                                            "chat",
                                            "gallery",
                                            "link",
                                            "image",
                                            "quote",
                                            "status",
                                            "video",
                                            "audio"
                                        ],
                                        "description": "Формат для объекта.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    },
                                    "sticky": {
                                        "required": false,
                                        "description": "Считать ли объект прилепленным или нет.",
                                        "type": "boolean"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    },
                                    "categories": {
                                        "required": false,
                                        "description": "Элементы назначенные объекту в таксономии category.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "tags": {
                                        "required": false,
                                        "description": "Элементы назначенные объекту в таксономии post_tag.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Игнорировать ли перемещение в корзину и принудительно удалять.",
                                        "type": "boolean"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/posts/(?P<parent>[\\d]+)/revisions": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "desc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "date",
                                        "enum": [
                                            "date",
                                            "id",
                                            "include",
                                            "relevance",
                                            "slug",
                                            "include_slugs",
                                            "title"
                                        ],
                                        "description": "Сортировать коллекцию по атрибуту объекта.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/posts/(?P<parent>[\\d]+)/revisions/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Должно быть истинно, так как редакции не поддерживают перемещение в корзину. ",
                                        "type": "boolean"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/posts/(?P<id>[\\d]+)/autosaves": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID автора объекта.",
                                        "type": "integer"
                                    },
                                    "excerpt": {
                                        "required": false,
                                        "description": "Отрывок объекта.",
                                        "type": "object"
                                    },
                                    "featured_media": {
                                        "required": false,
                                        "description": "ID избранного медиа для объекта.",
                                        "type": "integer"
                                    },
                                    "comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Открыты ли комментарии для объекта.",
                                        "type": "string"
                                    },
                                    "ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Принимает ли объект уведомления.",
                                        "type": "string"
                                    },
                                    "format": {
                                        "required": false,
                                        "enum": [
                                            "standard",
                                            "aside",
                                            "chat",
                                            "gallery",
                                            "link",
                                            "image",
                                            "quote",
                                            "status",
                                            "video",
                                            "audio"
                                        ],
                                        "description": "Формат для объекта.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    },
                                    "sticky": {
                                        "required": false,
                                        "description": "Считать ли объект прилепленным или нет.",
                                        "type": "boolean"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    },
                                    "categories": {
                                        "required": false,
                                        "description": "Элементы назначенные объекту в таксономии category.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "tags": {
                                        "required": false,
                                        "description": "Элементы назначенные объекту в таксономии post_tag.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/posts/(?P<parent>[\\d]+)/autosaves/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "id": {
                                        "required": false,
                                        "description": "ID для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/pages": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "after": {
                                        "required": false,
                                        "description": "Ограничить ответ записями опубликованными после заданной ISO8601 совместимой даты. ",
                                        "type": "string"
                                    },
                                    "author": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку записями определенных авторов.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "author_exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает записи назначенные определенным авторам.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "before": {
                                        "required": false,
                                        "description": "Ограничить ответ записями опубликованными до заданной ISO8601 совместимой даты.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "menu_order": {
                                        "required": false,
                                        "description": "Ограничить выборку до записей с определенным значением menu_order.",
                                        "type": "integer"
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "desc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "date",
                                        "enum": [
                                            "author",
                                            "date",
                                            "id",
                                            "include",
                                            "modified",
                                            "parent",
                                            "relevance",
                                            "slug",
                                            "include_slugs",
                                            "title",
                                            "menu_order"
                                        ],
                                        "description": "Сортировать коллекцию по атрибуту объекта.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID родителей.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "parent_exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до объектов за исключением имеющих определенный ID родителя.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Ограничить выборку до записей с одним или несколькими установленными конкретными ярлыками.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "status": {
                                        "required": false,
                                        "default": "publish",
                                        "description": "Ограничить выборку до записей с одним или несколькими установленными статусами.",
                                        "type": "array",
                                        "items": {
                                            "enum": [
                                                "publish",
                                                "future",
                                                "draft",
                                                "pending",
                                                "private",
                                                "trash",
                                                "auto-draft",
                                                "inherit",
                                                "request-pending",
                                                "request-confirmed",
                                                "request-failed",
                                                "request-completed",
                                                "any"
                                            ],
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID автора объекта.",
                                        "type": "integer"
                                    },
                                    "excerpt": {
                                        "required": false,
                                        "description": "Отрывок объекта.",
                                        "type": "object"
                                    },
                                    "featured_media": {
                                        "required": false,
                                        "description": "ID избранного медиа для объекта.",
                                        "type": "integer"
                                    },
                                    "comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Открыты ли комментарии для объекта.",
                                        "type": "string"
                                    },
                                    "ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Принимает ли объект уведомления.",
                                        "type": "string"
                                    },
                                    "menu_order": {
                                        "required": false,
                                        "description": "Порядок объекта по отношению к другим объектам того же типа.",
                                        "type": "integer"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/pages"
                                }
                            ]
                        }
                    },
                    "/wp/v2/pages/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для записи, если она защищена паролем.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID автора объекта.",
                                        "type": "integer"
                                    },
                                    "excerpt": {
                                        "required": false,
                                        "description": "Отрывок объекта.",
                                        "type": "object"
                                    },
                                    "featured_media": {
                                        "required": false,
                                        "description": "ID избранного медиа для объекта.",
                                        "type": "integer"
                                    },
                                    "comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Открыты ли комментарии для объекта.",
                                        "type": "string"
                                    },
                                    "ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Принимает ли объект уведомления.",
                                        "type": "string"
                                    },
                                    "menu_order": {
                                        "required": false,
                                        "description": "Порядок объекта по отношению к другим объектам того же типа.",
                                        "type": "integer"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Игнорировать ли перемещение в корзину и принудительно удалять.",
                                        "type": "boolean"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/pages/(?P<parent>[\\d]+)/revisions": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "desc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "date",
                                        "enum": [
                                            "date",
                                            "id",
                                            "include",
                                            "relevance",
                                            "slug",
                                            "include_slugs",
                                            "title"
                                        ],
                                        "description": "Сортировать коллекцию по атрибуту объекта.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/pages/(?P<parent>[\\d]+)/revisions/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Должно быть истинно, так как редакции не поддерживают перемещение в корзину. ",
                                        "type": "boolean"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/pages/(?P<id>[\\d]+)/autosaves": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID автора объекта.",
                                        "type": "integer"
                                    },
                                    "excerpt": {
                                        "required": false,
                                        "description": "Отрывок объекта.",
                                        "type": "object"
                                    },
                                    "featured_media": {
                                        "required": false,
                                        "description": "ID избранного медиа для объекта.",
                                        "type": "integer"
                                    },
                                    "comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Открыты ли комментарии для объекта.",
                                        "type": "string"
                                    },
                                    "ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Принимает ли объект уведомления.",
                                        "type": "string"
                                    },
                                    "menu_order": {
                                        "required": false,
                                        "description": "Порядок объекта по отношению к другим объектам того же типа.",
                                        "type": "integer"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/pages/(?P<parent>[\\d]+)/autosaves/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "id": {
                                        "required": false,
                                        "description": "ID для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/media": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "after": {
                                        "required": false,
                                        "description": "Ограничить ответ записями опубликованными после заданной ISO8601 совместимой даты. ",
                                        "type": "string"
                                    },
                                    "author": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку записями определенных авторов.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "author_exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает записи назначенные определенным авторам.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "before": {
                                        "required": false,
                                        "description": "Ограничить ответ записями опубликованными до заданной ISO8601 совместимой даты.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "desc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "date",
                                        "enum": [
                                            "author",
                                            "date",
                                            "id",
                                            "include",
                                            "modified",
                                            "parent",
                                            "relevance",
                                            "slug",
                                            "include_slugs",
                                            "title"
                                        ],
                                        "description": "Сортировать коллекцию по атрибуту объекта.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID родителей.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "parent_exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до объектов за исключением имеющих определенный ID родителя.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Ограничить выборку до записей с одним или несколькими установленными конкретными ярлыками.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "status": {
                                        "required": false,
                                        "default": "inherit",
                                        "description": "Ограничить выборку до записей с одним или несколькими установленными статусами.",
                                        "type": "array",
                                        "items": {
                                            "enum": [
                                                "inherit",
                                                "private",
                                                "trash"
                                            ],
                                            "type": "string"
                                        }
                                    },
                                    "media_type": {
                                        "required": false,
                                        "enum": [
                                            "image",
                                            "video",
                                            "text",
                                            "application",
                                            "audio"
                                        ],
                                        "description": "Ограничить выборку до вложений определенного типа медиа.",
                                        "type": "string"
                                    },
                                    "mime_type": {
                                        "required": false,
                                        "description": "Ограничить выборку до вложений определенного MIME типа.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID автора объекта.",
                                        "type": "integer"
                                    },
                                    "comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Открыты ли комментарии для объекта.",
                                        "type": "string"
                                    },
                                    "ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Принимает ли объект уведомления.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    },
                                    "alt_text": {
                                        "required": false,
                                        "description": "Альтернативный текст для показа когда вложение не отображается.",
                                        "type": "string"
                                    },
                                    "caption": {
                                        "required": false,
                                        "description": "Подпись вложения.",
                                        "type": "object"
                                    },
                                    "description": {
                                        "required": false,
                                        "description": "Описание вложения.",
                                        "type": "object"
                                    },
                                    "post": {
                                        "required": false,
                                        "description": "ID для ассоциированых записей для вложения.",
                                        "type": "integer"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/media"
                                }
                            ]
                        }
                    },
                    "/wp/v2/media/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID автора объекта.",
                                        "type": "integer"
                                    },
                                    "comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Открыты ли комментарии для объекта.",
                                        "type": "string"
                                    },
                                    "ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Принимает ли объект уведомления.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    },
                                    "alt_text": {
                                        "required": false,
                                        "description": "Альтернативный текст для показа когда вложение не отображается.",
                                        "type": "string"
                                    },
                                    "caption": {
                                        "required": false,
                                        "description": "Подпись вложения.",
                                        "type": "object"
                                    },
                                    "description": {
                                        "required": false,
                                        "description": "Описание вложения.",
                                        "type": "object"
                                    },
                                    "post": {
                                        "required": false,
                                        "description": "ID для ассоциированых записей для вложения.",
                                        "type": "integer"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Игнорировать ли перемещение в корзину и принудительно удалять.",
                                        "type": "boolean"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/media/(?P<id>[\\d]+)/post-process": {
                        "namespace": "wp/v2",
                        "methods": [
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "action": {
                                        "required": true,
                                        "enum": [
                                            "create-image-subsizes"
                                        ],
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/media/(?P<id>[\\d]+)/edit": {
                        "namespace": "wp/v2",
                        "methods": [
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "rotation": {
                                        "required": false,
                                        "description": "Величина (в градусах) для поворота изображения по часовой стрелке.",
                                        "type": "integer"
                                    },
                                    "x": {
                                        "required": false,
                                        "description": "В процентах от изображения, позиция X для начала обрезки.",
                                        "type": "number"
                                    },
                                    "y": {
                                        "required": false,
                                        "description": "В процентах от изображения, позиция Y для начала обрезки.",
                                        "type": "number"
                                    },
                                    "width": {
                                        "required": false,
                                        "description": "В процентах от изображения, ширина для обрезки изображения.",
                                        "type": "number"
                                    },
                                    "height": {
                                        "required": false,
                                        "description": "В процентах от изображения, высота для обрезки изображения.",
                                        "type": "number"
                                    },
                                    "src": {
                                        "required": true,
                                        "description": "URL отредактированного файла изображения",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/blocks": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "after": {
                                        "required": false,
                                        "description": "Ограничить ответ записями опубликованными после заданной ISO8601 совместимой даты. ",
                                        "type": "string"
                                    },
                                    "before": {
                                        "required": false,
                                        "description": "Ограничить ответ записями опубликованными до заданной ISO8601 совместимой даты.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "desc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "date",
                                        "enum": [
                                            "author",
                                            "date",
                                            "id",
                                            "include",
                                            "modified",
                                            "parent",
                                            "relevance",
                                            "slug",
                                            "include_slugs",
                                            "title"
                                        ],
                                        "description": "Сортировать коллекцию по атрибуту объекта.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Ограничить выборку до записей с одним или несколькими установленными конкретными ярлыками.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "status": {
                                        "required": false,
                                        "default": "publish",
                                        "description": "Ограничить выборку до записей с одним или несколькими установленными статусами.",
                                        "type": "array",
                                        "items": {
                                            "enum": [
                                                "publish",
                                                "future",
                                                "draft",
                                                "pending",
                                                "private",
                                                "trash",
                                                "auto-draft",
                                                "inherit",
                                                "request-pending",
                                                "request-confirmed",
                                                "request-failed",
                                                "request-completed",
                                                "any"
                                            ],
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/blocks"
                                }
                            ]
                        }
                    },
                    "/wp/v2/blocks/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для записи, если она защищена паролем.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Игнорировать ли перемещение в корзину и принудительно удалять.",
                                        "type": "boolean"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/blocks/(?P<id>[\\d]+)/autosaves": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": [
                                            "string",
                                            "null"
                                        ]
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор для объекта уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "publish",
                                            "future",
                                            "draft",
                                            "pending",
                                            "private"
                                        ],
                                        "description": "Именованный статус для объекта.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для защиты содержания и отрывка.",
                                        "type": "string"
                                    },
                                    "title": {
                                        "required": false,
                                        "description": "Название для объекта.",
                                        "type": "object"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "template": {
                                        "required": false,
                                        "description": "Файл темы используемый для показа объекта.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/blocks/(?P<parent>[\\d]+)/autosaves/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "id": {
                                        "required": false,
                                        "description": "ID для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/types": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/types"
                                }
                            ]
                        }
                    },
                    "/wp/v2/types/(?P<type>[\\w-]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "type": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор типа записи.",
                                        "type": "string"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/statuses": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/statuses"
                                }
                            ]
                        }
                    },
                    "/wp/v2/statuses/(?P<status>[\\w-]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "status": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор статуса.",
                                        "type": "string"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/taxonomies": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "type": {
                                        "required": false,
                                        "description": "Ограничить выборку таксономиями ассоциированными с определенным типом записи.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/taxonomies"
                                }
                            ]
                        }
                    },
                    "/wp/v2/taxonomies/(?P<taxonomy>[\\w-]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "taxonomy": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор таксономии.",
                                        "type": "string"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/categories": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "asc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "name",
                                        "enum": [
                                            "id",
                                            "include",
                                            "name",
                                            "slug",
                                            "include_slugs",
                                            "term_group",
                                            "description",
                                            "count"
                                        ],
                                        "description": "Сортировать коллекцию по атрибутам элемента.",
                                        "type": "string"
                                    },
                                    "hide_empty": {
                                        "required": false,
                                        "default": false,
                                        "description": "Скрывать ли элементы не назначенные ни одной записи.",
                                        "type": "boolean"
                                    },
                                    "parent": {
                                        "required": false,
                                        "description": "Ограничить выборку элементами назначенными определенному родителю.",
                                        "type": "integer"
                                    },
                                    "post": {
                                        "required": false,
                                        "description": "Ограничить выборку элементами назначенными определенной записи.",
                                        "type": "integer"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Ограничить выборку элементами с одним или более специальными ярлыками. ",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "description": {
                                        "required": false,
                                        "description": "HTML описание элемента.",
                                        "type": "string"
                                    },
                                    "name": {
                                        "required": true,
                                        "description": "HTML название элемента.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор элемента уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "description": "ID элемента родителя.",
                                        "type": "integer"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/categories"
                                }
                            ]
                        }
                    },
                    "/wp/v2/categories/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор элемента.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор элемента.",
                                        "type": "integer"
                                    },
                                    "description": {
                                        "required": false,
                                        "description": "HTML описание элемента.",
                                        "type": "string"
                                    },
                                    "name": {
                                        "required": false,
                                        "description": "HTML название элемента.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор элемента уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "description": "ID элемента родителя.",
                                        "type": "integer"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор элемента.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Должно быть истинно, так как элементы не поддерживают перемещение в корзину.",
                                        "type": "boolean"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/tags": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "asc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "name",
                                        "enum": [
                                            "id",
                                            "include",
                                            "name",
                                            "slug",
                                            "include_slugs",
                                            "term_group",
                                            "description",
                                            "count"
                                        ],
                                        "description": "Сортировать коллекцию по атрибутам элемента.",
                                        "type": "string"
                                    },
                                    "hide_empty": {
                                        "required": false,
                                        "default": false,
                                        "description": "Скрывать ли элементы не назначенные ни одной записи.",
                                        "type": "boolean"
                                    },
                                    "post": {
                                        "required": false,
                                        "description": "Ограничить выборку элементами назначенными определенной записи.",
                                        "type": "integer"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Ограничить выборку элементами с одним или более специальными ярлыками. ",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "description": {
                                        "required": false,
                                        "description": "HTML описание элемента.",
                                        "type": "string"
                                    },
                                    "name": {
                                        "required": true,
                                        "description": "HTML название элемента.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор элемента уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/tags"
                                }
                            ]
                        }
                    },
                    "/wp/v2/tags/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор элемента.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор элемента.",
                                        "type": "integer"
                                    },
                                    "description": {
                                        "required": false,
                                        "description": "HTML описание элемента.",
                                        "type": "string"
                                    },
                                    "name": {
                                        "required": false,
                                        "description": "HTML название элемента.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор элемента уникальный для его типа.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор элемента.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Должно быть истинно, так как элементы не поддерживают перемещение в корзину.",
                                        "type": "boolean"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/users": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "asc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "name",
                                        "enum": [
                                            "id",
                                            "include",
                                            "name",
                                            "registered_date",
                                            "slug",
                                            "include_slugs",
                                            "email",
                                            "url"
                                        ],
                                        "description": "Сортировать коллекцию по атрибуту объекта.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Ограничить выборку пользователями с одним или более специальными ярлыками.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "roles": {
                                        "required": false,
                                        "description": "Ограничить выборку до пользователей удовлетворяющих как минимум одной указанной роли. Можно указать CSV список или одну роль.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "who": {
                                        "required": false,
                                        "enum": [
                                            "authors"
                                        ],
                                        "description": "Ограничить выборку пользователями-авторами.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "username": {
                                        "required": true,
                                        "description": "Имя входа для пользователя.",
                                        "type": "string"
                                    },
                                    "name": {
                                        "required": false,
                                        "description": "Отображаемое имя пользователя.",
                                        "type": "string"
                                    },
                                    "first_name": {
                                        "required": false,
                                        "description": "Имя пользователя.",
                                        "type": "string"
                                    },
                                    "last_name": {
                                        "required": false,
                                        "description": "Фамилия пользователя.",
                                        "type": "string"
                                    },
                                    "email": {
                                        "required": true,
                                        "description": "Адрес email пользователя.",
                                        "type": "string"
                                    },
                                    "url": {
                                        "required": false,
                                        "description": "URL пользователя.",
                                        "type": "string"
                                    },
                                    "description": {
                                        "required": false,
                                        "description": "Описание пользователя.",
                                        "type": "string"
                                    },
                                    "locale": {
                                        "required": false,
                                        "enum": [
                                            "",
                                            "en_US",
                                            "ru_RU"
                                        ],
                                        "description": "Локаль для пользователя.",
                                        "type": "string"
                                    },
                                    "nickname": {
                                        "required": false,
                                        "description": "Ник пользователя.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор пользователя.",
                                        "type": "string"
                                    },
                                    "roles": {
                                        "required": false,
                                        "description": "Роли назначенные пользователю.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "password": {
                                        "required": true,
                                        "description": "Пароль пользователя (никогда не показывается).",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/users"
                                }
                            ]
                        }
                    },
                    "/wp/v2/users/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор пользователя.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор пользователя.",
                                        "type": "integer"
                                    },
                                    "username": {
                                        "required": false,
                                        "description": "Имя входа для пользователя.",
                                        "type": "string"
                                    },
                                    "name": {
                                        "required": false,
                                        "description": "Отображаемое имя пользователя.",
                                        "type": "string"
                                    },
                                    "first_name": {
                                        "required": false,
                                        "description": "Имя пользователя.",
                                        "type": "string"
                                    },
                                    "last_name": {
                                        "required": false,
                                        "description": "Фамилия пользователя.",
                                        "type": "string"
                                    },
                                    "email": {
                                        "required": false,
                                        "description": "Адрес email пользователя.",
                                        "type": "string"
                                    },
                                    "url": {
                                        "required": false,
                                        "description": "URL пользователя.",
                                        "type": "string"
                                    },
                                    "description": {
                                        "required": false,
                                        "description": "Описание пользователя.",
                                        "type": "string"
                                    },
                                    "locale": {
                                        "required": false,
                                        "enum": [
                                            "",
                                            "en_US",
                                            "ru_RU"
                                        ],
                                        "description": "Локаль для пользователя.",
                                        "type": "string"
                                    },
                                    "nickname": {
                                        "required": false,
                                        "description": "Ник пользователя.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор пользователя.",
                                        "type": "string"
                                    },
                                    "roles": {
                                        "required": false,
                                        "description": "Роли назначенные пользователю.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль пользователя (никогда не показывается).",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор пользователя.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Должно быть истинным, так как пользователей нельзя переместить в корзину.",
                                        "type": "boolean"
                                    },
                                    "reassign": {
                                        "required": true,
                                        "description": "Переназначить удаленные записи пользователя и ссылки на этот ID пользователя.",
                                        "type": "integer"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/users/me": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "username": {
                                        "required": false,
                                        "description": "Имя входа для пользователя.",
                                        "type": "string"
                                    },
                                    "name": {
                                        "required": false,
                                        "description": "Отображаемое имя пользователя.",
                                        "type": "string"
                                    },
                                    "first_name": {
                                        "required": false,
                                        "description": "Имя пользователя.",
                                        "type": "string"
                                    },
                                    "last_name": {
                                        "required": false,
                                        "description": "Фамилия пользователя.",
                                        "type": "string"
                                    },
                                    "email": {
                                        "required": false,
                                        "description": "Адрес email пользователя.",
                                        "type": "string"
                                    },
                                    "url": {
                                        "required": false,
                                        "description": "URL пользователя.",
                                        "type": "string"
                                    },
                                    "description": {
                                        "required": false,
                                        "description": "Описание пользователя.",
                                        "type": "string"
                                    },
                                    "locale": {
                                        "required": false,
                                        "enum": [
                                            "",
                                            "en_US",
                                            "ru_RU"
                                        ],
                                        "description": "Локаль для пользователя.",
                                        "type": "string"
                                    },
                                    "nickname": {
                                        "required": false,
                                        "description": "Ник пользователя.",
                                        "type": "string"
                                    },
                                    "slug": {
                                        "required": false,
                                        "description": "Буквенно-цифровой идентификатор пользователя.",
                                        "type": "string"
                                    },
                                    "roles": {
                                        "required": false,
                                        "description": "Роли назначенные пользователю.",
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль пользователя (никогда не показывается).",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Должно быть истинным, так как пользователей нельзя переместить в корзину.",
                                        "type": "boolean"
                                    },
                                    "reassign": {
                                        "required": true,
                                        "description": "Переназначить удаленные записи пользователя и ссылки на этот ID пользователя.",
                                        "type": "integer"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/users/me"
                                }
                            ]
                        }
                    },
                    "/wp/v2/comments": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "after": {
                                        "required": false,
                                        "description": "Ограничить ответ комментариями опубликованными после заданной ISO8601 совместимой даты.",
                                        "type": "string"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "Ограничить выборку комментариями назначенными определенному ID пользователя. Требует авторизации.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "author_exclude": {
                                        "required": false,
                                        "description": "Убедиться что выборка исключает комментарии назначенные определенному ID пользователя. Требует авторизации.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "author_email": {
                                        "required": false,
                                        "description": "Ограничить выборку до имеющей определённый email автора. Требует авторизации.",
                                        "type": "string"
                                    },
                                    "before": {
                                        "required": false,
                                        "description": "Ограничить ответ комментариями опубликованными до заданной ISO8601 совместимой даты.",
                                        "type": "string"
                                    },
                                    "exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "include": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку до определенных ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "offset": {
                                        "required": false,
                                        "description": "Сдвиг выборки на определенное число объектов.",
                                        "type": "integer"
                                    },
                                    "order": {
                                        "required": false,
                                        "default": "desc",
                                        "enum": [
                                            "asc",
                                            "desc"
                                        ],
                                        "description": "Упорядочить сортировку атрибута по возрастанию или убыванию.",
                                        "type": "string"
                                    },
                                    "orderby": {
                                        "required": false,
                                        "default": "date_gmt",
                                        "enum": [
                                            "date",
                                            "date_gmt",
                                            "id",
                                            "include",
                                            "post",
                                            "parent",
                                            "type"
                                        ],
                                        "description": "Сортировать коллекцию по атрибуту объекта.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку комментариями с определенными родительскими ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "parent_exclude": {
                                        "required": false,
                                        "default": [],
                                        "description": "Убедиться что выборка исключает определенные родительские ID.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "post": {
                                        "required": false,
                                        "default": [],
                                        "description": "Ограничить выборку комментариями с назначенными определенными ID записей.",
                                        "type": "array",
                                        "items": {
                                            "type": "integer"
                                        }
                                    },
                                    "status": {
                                        "required": false,
                                        "default": "approve",
                                        "description": "Ограничить выборку комментариями с определенным статусом. Требует авторизации. ",
                                        "type": "string"
                                    },
                                    "type": {
                                        "required": false,
                                        "default": "comment",
                                        "description": "Ограничить выборку комментариями с определенным типом. Требует авторизации.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для записи, если она защищена паролем.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "author": {
                                        "required": false,
                                        "description": "ID объекта пользователя, если автор - пользователь.",
                                        "type": "integer"
                                    },
                                    "author_email": {
                                        "required": false,
                                        "description": "Адрес email автора объекта.",
                                        "type": "string"
                                    },
                                    "author_ip": {
                                        "required": false,
                                        "description": "IP адрес автора объекта.",
                                        "type": "string"
                                    },
                                    "author_name": {
                                        "required": false,
                                        "description": "Отображаемое имя для автора объекта.",
                                        "type": "string"
                                    },
                                    "author_url": {
                                        "required": false,
                                        "description": "URL для автора объекта.",
                                        "type": "string"
                                    },
                                    "author_user_agent": {
                                        "required": false,
                                        "description": "Клиентское приложение для автора объекта.",
                                        "type": "string"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": "string"
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "default": 0,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "post": {
                                        "required": false,
                                        "default": 0,
                                        "description": "ID ассоциированного объекта записи.",
                                        "type": "integer"
                                    },
                                    "status": {
                                        "required": false,
                                        "description": "Состояние объекта.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/comments"
                                }
                            ]
                        }
                    },
                    "/wp/v2/comments/(?P<id>[\\d]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для родительской записи комментария (если запись защищена паролем).",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "author": {
                                        "required": false,
                                        "description": "ID объекта пользователя, если автор - пользователь.",
                                        "type": "integer"
                                    },
                                    "author_email": {
                                        "required": false,
                                        "description": "Адрес email автора объекта.",
                                        "type": "string"
                                    },
                                    "author_ip": {
                                        "required": false,
                                        "description": "IP адрес автора объекта.",
                                        "type": "string"
                                    },
                                    "author_name": {
                                        "required": false,
                                        "description": "Отображаемое имя для автора объекта.",
                                        "type": "string"
                                    },
                                    "author_url": {
                                        "required": false,
                                        "description": "URL для автора объекта.",
                                        "type": "string"
                                    },
                                    "author_user_agent": {
                                        "required": false,
                                        "description": "Клиентское приложение для автора объекта.",
                                        "type": "string"
                                    },
                                    "content": {
                                        "required": false,
                                        "description": "Содержимое объекта.",
                                        "type": "object"
                                    },
                                    "date": {
                                        "required": false,
                                        "description": "Дата публикации объекта, по временной зоне сайта.",
                                        "type": "string"
                                    },
                                    "date_gmt": {
                                        "required": false,
                                        "description": "Время публикации объекта, по GMT.",
                                        "type": "string"
                                    },
                                    "parent": {
                                        "required": false,
                                        "description": "ID родителя объекта.",
                                        "type": "integer"
                                    },
                                    "post": {
                                        "required": false,
                                        "description": "ID ассоциированного объекта записи.",
                                        "type": "integer"
                                    },
                                    "status": {
                                        "required": false,
                                        "description": "Состояние объекта.",
                                        "type": "string"
                                    },
                                    "meta": {
                                        "required": false,
                                        "description": "Мета поля.",
                                        "type": "object"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "id": {
                                        "required": false,
                                        "description": "Уникальный идентификатор для объекта.",
                                        "type": "integer"
                                    },
                                    "force": {
                                        "required": false,
                                        "default": false,
                                        "description": "Игнорировать ли перемещение в корзину и принудительно удалять.",
                                        "type": "boolean"
                                    },
                                    "password": {
                                        "required": false,
                                        "description": "Пароль для родительской записи комментария (если запись защищена паролем).",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/search": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "type": {
                                        "required": false,
                                        "default": "post",
                                        "enum": [
                                            "post"
                                        ],
                                        "description": "Ограничить результаты элементами типа объекта.",
                                        "type": "string"
                                    },
                                    "subtype": {
                                        "required": false,
                                        "default": "any",
                                        "description": "Ограничить результаты элементами одного или нескольких подтипов объекта.",
                                        "type": "array",
                                        "items": {
                                            "enum": [
                                                "post",
                                                "page",
                                                "any"
                                            ],
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/search"
                                }
                            ]
                        }
                    },
                    "/wp/v2/block-renderer/(?P<name>[a-z0-9-]+/[a-z0-9-]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET",
                                    "POST"
                                ],
                                "args": {
                                    "name": {
                                        "required": false,
                                        "description": "Уникальное, зарегистрированное для блока имя.",
                                        "type": "string"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "attributes": {
                                        "required": false,
                                        "default": [],
                                        "description": "Атрибуты для блока",
                                        "type": "object"
                                    },
                                    "post_id": {
                                        "required": false,
                                        "description": "ID контекста записи.",
                                        "type": "integer"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/block-types": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "namespace": {
                                        "required": false,
                                        "description": "Пространство имен блока.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/block-types"
                                }
                            ]
                        }
                    },
                    "/wp/v2/block-types/(?P<namespace>[a-zA-Z0-9_-]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "namespace": {
                                        "required": false,
                                        "description": "Пространство имен блока.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/block-types/(?P<namespace>[a-zA-Z0-9_-]+)/(?P<name>[a-zA-Z0-9_-]+)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "name": {
                                        "required": false,
                                        "description": "Имя блока",
                                        "type": "string"
                                    },
                                    "namespace": {
                                        "required": false,
                                        "description": "Пространство имен блока",
                                        "type": "string"
                                    },
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/settings": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": []
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "title": {
                                        "required": false,
                                        "description": "Название сайта.",
                                        "type": "string"
                                    },
                                    "description": {
                                        "required": false,
                                        "description": "Слоган сайта.",
                                        "type": "string"
                                    },
                                    "url": {
                                        "required": false,
                                        "description": "Адрес сайта (URL)",
                                        "type": "string"
                                    },
                                    "email": {
                                        "required": false,
                                        "description": "Этот адрес используется в целях администрирования. Например, для уведомления о новых пользователях.",
                                        "type": "string"
                                    },
                                    "timezone": {
                                        "required": false,
                                        "description": "Город в той же временной зоне что и у вас.",
                                        "type": "string"
                                    },
                                    "date_format": {
                                        "required": false,
                                        "description": "Общий формат даты.",
                                        "type": "string"
                                    },
                                    "time_format": {
                                        "required": false,
                                        "description": "Общий формат времени.",
                                        "type": "string"
                                    },
                                    "start_of_week": {
                                        "required": false,
                                        "description": "Первый день недели.",
                                        "type": "integer"
                                    },
                                    "language": {
                                        "required": false,
                                        "description": "Код локали WordPress.",
                                        "type": "string"
                                    },
                                    "use_smilies": {
                                        "required": false,
                                        "description": "Преобразовывать смайлики наподобие :-) и :-P в картинки при показе.",
                                        "type": "boolean"
                                    },
                                    "default_category": {
                                        "required": false,
                                        "description": "Рубрика для записей по умолчанию.",
                                        "type": "integer"
                                    },
                                    "default_post_format": {
                                        "required": false,
                                        "description": "Формат записей по умолчанию.",
                                        "type": "string"
                                    },
                                    "posts_per_page": {
                                        "required": false,
                                        "description": "Максимум страниц блога для показа.",
                                        "type": "integer"
                                    },
                                    "default_ping_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Разрешить ссылки оповещения с других блогов (уведомления и обратные ссылки) на новые статьи.",
                                        "type": "string"
                                    },
                                    "default_comment_status": {
                                        "required": false,
                                        "enum": [
                                            "open",
                                            "closed"
                                        ],
                                        "description": "Разрешить оставлять комментарии к новым записям.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/settings"
                                }
                            ]
                        }
                    },
                    "/wp/v2/themes": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": true,
                                        "description": "Ограничить результат темами с назначенным статусом.",
                                        "type": "array",
                                        "items": {
                                            "enum": [
                                                "active"
                                            ],
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/themes"
                                }
                            ]
                        }
                    },
                    "/wp/v2/plugins": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "search": {
                                        "required": false,
                                        "description": "Ограничить результаты до совпадающих со строкой.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "description": "Ограничить результаты плагинами с заданным статусом.",
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "enum": [
                                                "inactive",
                                                "active"
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST"
                                ],
                                "args": {
                                    "slug": {
                                        "required": true,
                                        "description": "Ярлык плагина в каталоге WordPress.org.",
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "default": "inactive",
                                        "enum": [
                                            "inactive",
                                            "active"
                                        ],
                                        "description": "Статус активации плагина.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/plugins"
                                }
                            ]
                        }
                    },
                    "/wp/v2/plugins/(?P<plugin>[^.\\/]+(?:\\/[^.\\/]+)?)": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET",
                            "POST",
                            "PUT",
                            "PATCH",
                            "DELETE"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "plugin": {
                                        "required": false,
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "POST",
                                    "PUT",
                                    "PATCH"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "plugin": {
                                        "required": false,
                                        "type": "string"
                                    },
                                    "status": {
                                        "required": false,
                                        "enum": [
                                            "inactive",
                                            "active"
                                        ],
                                        "description": "Статус активации плагина.",
                                        "type": "string"
                                    }
                                }
                            },
                            {
                                "methods": [
                                    "DELETE"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view",
                                            "embed",
                                            "edit"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "plugin": {
                                        "required": false,
                                        "type": "string"
                                    }
                                }
                            }
                        ]
                    },
                    "/wp/v2/block-directory/search": {
                        "namespace": "wp/v2",
                        "methods": [
                            "GET"
                        ],
                        "endpoints": [
                            {
                                "methods": [
                                    "GET"
                                ],
                                "args": {
                                    "context": {
                                        "required": false,
                                        "default": "view",
                                        "enum": [
                                            "view"
                                        ],
                                        "description": "Рамки в которых сделан запрос, определяют поля в ответе.",
                                        "type": "string"
                                    },
                                    "page": {
                                        "required": false,
                                        "default": 1,
                                        "description": "Текущая страница коллекции.",
                                        "type": "integer"
                                    },
                                    "per_page": {
                                        "required": false,
                                        "default": 10,
                                        "description": "Максимальное число объектов возвращаемое в выборке.",
                                        "type": "integer"
                                    },
                                    "term": {
                                        "required": true,
                                        "description": "Ограничьте набор результатов блоками, соответствующими поисковому запросу.",
                                        "type": "string"
                                    }
                                }
                            }
                        ],
                        "_links": {
                            "self": [
                                {
                                    "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/block-directory/search"
                                }
                            ]
                        }
                    }
                },
                "_links": {
                    "up": [
                        {
                            "href": "https://wordpress.kodaktor.ru/wp-json/"
                        }
                    ]
                }
            };
            r.res.send(addr)
        })
        .all('/wordpress/wp-json/wp/v2/posts/1', r =>{
            r.res.set(headersJSON);
            const {addr} = {
                "id": 1,
                "date": "2020-09-12T00:57:55",
                "date_gmt": "2020-09-12T00:57:55",
                "guid": {
                    "rendered": "https://micsecs-org.ru/?p=1"
                },
                "modified": "2021-11-27T11:40:11",
                "modified_gmt": "2021-11-27T11:40:11",
                "slug": "hello-world",
                "status": "publish",
                "type": "post",
                "link": "https://wordpress.kodaktor.ru/2020/09/12/hello-world/",
                "title": {
                    "rendered": "itmo307694"
                },
                "content": {
                    "rendered": "",
                    "protected": true
                },
                "excerpt": {
                    "rendered": "",
                    "protected": true
                },
                "author": 1,
                "featured_media": 0,
                "comment_status": "open",
                "ping_status": "open",
                "sticky": false,
                "template": "",
                "format": "standard",
                "meta": [],
                "categories": [
                    1
                ],
                "tags": [],
                "_links": {
                    "self": [
                        {
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/posts/1"
                        }
                    ],
                    "collection": [
                        {
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/posts"
                        }
                    ],
                    "about": [
                        {
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/types/post"
                        }
                    ],
                    "author": [
                        {
                            "embeddable": true,
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/users/1"
                        }
                    ],
                    "replies": [
                        {
                            "embeddable": true,
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/comments?post=1"
                        }
                    ],
                    "version-history": [
                        {
                            "count": 6,
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/posts/1/revisions"
                        }
                    ],
                    "predecessor-version": [
                        {
                            "id": 101,
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/posts/1/revisions/101"
                        }
                    ],
                    "wp:attachment": [
                        {
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/media?parent=1"
                        }
                    ],
                    "wp:term": [
                        {
                            "taxonomy": "category",
                            "embeddable": true,
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/categories?post=1"
                        },
                        {
                            "taxonomy": "post_tag",
                            "embeddable": true,
                            "href": "https://wordpress.kodaktor.ru/wp-json/wp/v2/tags?post=1"
                        }
                    ],
                    "curies": [
                        {
                            "name": "wp",
                            "href": "https://api.w.org/{rel}",
                            "templated": true
                        }
                    ]
                }
            };
            r.res.send(addr)
        })
        .post('/insert/', async r=>{
            r.res.set(headersTEXT);
            const {login,password,URL}=r.body;
            const newUser = new User({login,password});
            try{
                await m.connect(URL, {useNewUrlParser:true, useUnifiedTopology:true});
                try{
                    await newUser.save();
                    r.res.status(201).json({'Add: ':login});
                }
                catch(e){
                    r.res.status(400).json({'Error: ':'No password'});
                }
            }
            catch(e){
                console.log(e.codeName);
            }      
        })
        .all('/render/',async(req,res)=>{
            res.set(headersCORS);
            const {addr} = req.query;
            const {random2, random3} = req.body;
            
            http.get(addr,(r, b='') => {
                r
                .on('data',d=>b+=d)
                .on('end',()=>{
                    fs.writeFileSync('views/index.pug', b);
                    res.render('index',{login:'itmo307694',random2,random3})
                })
            })
        })
        .use(({res:r})=>r.status(404).set(headersHTML).send('itmo307694'))
        .set('view engine','pug')
    return app;
}