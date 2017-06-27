//开发环境
const isDevelopment = process.env.NODE_ENV != 'production';
//访问地址
const host = isDevelopment ? 'localhost' : 'oa.slans.net';
const api_host = isDevelopment ? 'oapi.teslans.net' : 'oapi.slans.net';
const api_port = isDevelopment ? 80 : 80;
const domainArr = ['localhost', 'teoa.slans.net', 'oa.slans.net'];


const config = {
	BASE_API_ROOT : 'http://' + api_host + (api_port == 80 ? '/' : (':' + api_port + '/')),
	COOKIE: 'ems_token',
	host: host,
	port: isDevelopment ? 8040 : 8045,
	app_key: '20170426',
	app_secret: '35f8196ee3a64dafb41b7cb0db9ea77d',
	isDevelopment: domainArr.findIndex(v => v == host),//0开发环境，1测试环境，2生产环境
};


module.exports = config;
