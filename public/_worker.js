const BACKEND_ORIGIN = 'http://147.93.29.131:8000';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      const backendUrl = new URL(url.pathname + url.search, BACKEND_ORIGIN);
      const proxyRequest = new Request(backendUrl, request);

      proxyRequest.headers.set('Host', new URL(BACKEND_ORIGIN).host);
      proxyRequest.headers.set('X-Forwarded-Proto', 'https');

      return fetch(proxyRequest);
    }

    return env.ASSETS.fetch(request);
  },
};
