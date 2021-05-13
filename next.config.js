module.exports = {
  async headers() {
    return [
      {
        source: "/:slug(.*[.]png)",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=31536000",
          },
        ],
      },
      {
        source: "/:slug(.*[.]css)",
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
