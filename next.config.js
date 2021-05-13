module.exports = {
  async headers() {
    return [
      {
        source: '/mug.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=31536000',
          },
        ],
      },
    ]
  },
}