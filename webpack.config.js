var { sync: glob } = require('glob')
var path = require('path')

module.exports = glob('src/**/index.js').map(filepath => {
    var entry = path.resolve(filepath)
    var name =  path.relative('src', path.dirname(filepath))
    
    return {
        mode: process.env.NODE_ENV || 'development',
        entry: { [name ? name + '/index' : 'index']: entry },
        devtool: 'inline-source-map',
        externals: [
            (context, request, callback) => {
                if(entry === request) return callback()
                return callback(null, 'commonjs ' + request)
            }
        ]
    }
})