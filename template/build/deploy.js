require('./check-versions')()

process.env.NODE_ENV = 'deploy'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.deploy.conf')
var shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

var spinner = ora('building for deploying...')
spinner.start()

rm(path.join(config.deploy.assetsRoot, config.deploy.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    shell.exec("git add " + config.deploy.assetsRoot);
    shell.exec("git commit -m 'Updating docs'");
    shell.exec("git push");
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: You just deployed your Github pages app - Good for you!\n'
    ))
  })
})
