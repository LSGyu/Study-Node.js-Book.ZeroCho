const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv'); // .env 파일을 process.env로 변경해주는 패키지
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();
const indexRouter = require('./routes/index');
const app = express();
app.set('port', process.env.PORT || 3000); // express 전역에서 사용할 값만 넣기
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

// 버퍼나 텍스트 요청을 처리할 필요가 있을 때 추가 설치해야함
// npm i body-parser
// const bodyParser = require('body-parser');
// app.use(bodyParser.raw()); // 버퍼 데이터
// app.use(bodyParser.text()); // 텍스트 데이터+

app.use(morgan('dev')); // 기존 로그 이외 추가 로그를 확인할 수 있다. GET / 500 8.884 ms - 50 [HTTP 메서드][주소][HTTP상태 코드][응답 속도]-[응답 바이트]
app.use('/', express.static(path.join(__dirname, 'public'))); // static => 정적 파일(CSS, JS, 이미지) 라우팅하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 미들웨어 .env의 COOKIE_SECRET=cookiesecret => { COOKIE_SECRET: cookiesecret } 으로 치환

// 아래와 같이 작성 가능
// app.use(
//   morgan('dev'),
//   express.static('/', path.join(__dirname, 'public')),
//   express.json(),
//   express.urlencoded({ extended: false }),
//   cookieParser(process.env.COOKIE_SECRET),
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//     name: 'session-cookie',
//   }),
// );

app.use(session({  // 세션 관리용 미들웨어 일반적으로 쿠키 미들웨서(cookieParser) 뒤에 두는 것이 안전하다.
  resave: false, // 수정 사항이 없어도 저장 여부 
  saveUninitialized: false, // 저장 내용 없어도 저장 여부
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use('/', indexRouter);

// 미들웨어 안에 미들웨어를 넣는 방식을 사용하는 이유는 기존 미들웨어의 기능 확장 => 개발, 운영에 대한 분기처리 등 다양한 것을 할 수 있다.
// app.use((req, res, next) => {
//   if (process.env.NODE_ENV === 'production') {
//     morgan('combined')(req, res, next);
//   } else {
//     morgan('dev')(req, res, next);
//   }
// });

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads') ;
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// app.get('/', (req, res) => {
//   //res.send('Hellow, Express');
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/upload', (req, res) => {
//   //res.send('Hellow, Express');
//   res.sendFile(path.join(__dirname, 'upload.html'));
// });

// app.post('/upload', upload.single('image1'), (req, res) => {
//   console.log(req.file, req.body);
//   res.send('okay');
// })


app.post('/upload', upload.array('many'), (req, res) => {
  console.log(req.file, req.body);
  res.send('okay');
})

// app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
//   console.log(req.file, req.body);
//   res.send('okay');
// })

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});

// app.get('/', (req, res, next) => {
//   console.log('GET / 요청에만 실행됩니다.');
//   next();
// }, (req, res) => {
//   throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
// });

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});