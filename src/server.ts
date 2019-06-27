import * as http from 'http';
import app from '@src/app';

const server: http.Server = app.listen(app.get('port'), () => {
  console.log(('appTest is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});

export default server;
