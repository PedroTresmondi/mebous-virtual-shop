/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'epic-projects.nyc3.digitaloceanspaces.com',
            'm.media-amazon.com',
            'static3.tcdn.com.br',
            'images.tcdn.com.br'
        ]
    }
}
module.exports = {
    env: {
        FACEBOOK_ID: process.env.FACEBOOK_ID,
        FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    },
};

module.exports = nextConfig
