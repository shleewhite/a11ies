module.exports = {
  presets: [
    [
      'next/babel',
      {
        'styled-jsx': {
          plugins: [
            [
              'styled-jsx-plugin-sass',
              {
                sassOptions: {
                  includePaths: ['./'],
                  importer: require('node-sass-tilde-importer'),
                },
              },
            ],
          ],
        },
      },
    ],
  ],
};