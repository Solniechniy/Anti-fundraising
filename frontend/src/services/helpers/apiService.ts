import getConfig from '../config';

enum RequestTypes {
  GET = 'GET',
}

const HEADERS = { 'Content-type': 'application/json; charset=UTF-8' };

class ApiService {
  config = getConfig();

  async setTrack(
    chain: string,
    address: string,
    timestamp: string,
  ) {
    const url = `${this.config.api}/setTrack/${chain}/${address}/${timestamp}`;
    try {
      return await fetch(
        url,
        {
          method: RequestTypes.GET,
          headers: HEADERS,
        },
      )
        .then((res) => res.json());
    } catch (e) {
      console.warn(`Error ${e} while loading metadata from paras server ${url}`);
      return [];
    }
  }

  async getTrack(
    id: string,
  ) {
    const url = `${this.config.api}/getTrack/${id}`;
    try {
      return await fetch(
        url,
        {
          method: RequestTypes.GET,
          headers: HEADERS,
        },
      )
        .then((res) => res.json());
    } catch (e) {
      console.warn(`Error ${e} while loading metadata from paras server ${url}`);
      return [];
    }
  }
}

export default new ApiService();
