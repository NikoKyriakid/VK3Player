import electroApp from '../lib/electronConnector';

new electroApp('dist', 'index.html', '1.0', true).run();