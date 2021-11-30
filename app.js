
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