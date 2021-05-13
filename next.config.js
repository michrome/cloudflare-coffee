module.exports = {
  async headers() {
    return [
      {
        source: "/:slug(.*[.](png|css))",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=31536000",
          },
        ],
      },
    ];
  },
};
