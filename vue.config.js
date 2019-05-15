module.exports = {
    devServer: {
        compress: true,
        disableHostCheck: true,
        port: 8000
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/survey-td/'
        : '/'
};
