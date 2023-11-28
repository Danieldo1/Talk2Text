/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            issuer: { and: [/\.(js|ts|md)x?$/] },
        })
        return config
    }
}

module.exports = nextConfig
