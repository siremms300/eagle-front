
module.exports = {
    // Other configuration options...
    async headers() {
      return [
        {
          source: '/favicon.jpg',
          headers: [
            {
              key: 'Content-Type',
              value: 'image/x-icon',
            },
          ],
        },
      ];
    },
  };
  