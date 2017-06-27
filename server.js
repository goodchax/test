let path = require('path');
let express = require('express');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let webpackConfig = require('./webpack.config');
let config = require('./config');

let host = config.host;
let port = config.port;

let serverOptions = {
  //contentBase: webpackConfig.output.path,
  quiet: true,
  noInfo: false,
  hot: true,
  inline: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  }
};

let compiler = webpack(webpackConfig);

let debug = process.env.NODE_ENV !== 'production';
let viewDir = debug ? '/dist' : '/public';

const app = express();
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));
app.use(viewDir, express.static(path.join(__dirname, viewDir)));

if(debug) {
	// browser-sync
  var bs = require('browser-sync').create();
  bs.init({
    ui: {
      port: 8042
    },
    open: "local", //"local,external" 需要控制  //STEP3
    port: port + 1,
    proxy: `http://${host}:${port}`
  });
}

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, viewDir, 'index.html'));
});

app.listen(port, host, (err) => {
	if(err) {
		console.log(err);
	} else {
		console.log(`The server is running at http://${host}:${port}`);
	}
})
