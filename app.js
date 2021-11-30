
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
            r.res.set(headersJSON);
            const {addr} = await fetch("https://wordpress.kodaktor.ru/", {
                method: "GET"
              });
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