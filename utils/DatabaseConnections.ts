export interface IDatabaseConnections {
  get(name: string): Connection;
}

export class DatabaseConnections implements IDatabaseConnections {
  private connections: { [key: string]: Connection } = {};

  public get(name: string): Connection {
    if (! this.connections[name]) {
      this.connections[name] = createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : name,
      });
    }

    return this.connections[name];
  }
}

export default new DatabaseConnections();
