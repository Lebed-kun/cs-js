class Router {
    constructor() {
        this._routes = [];
    }

    handleRoute({ pattern = '', handle }) {
        this._routes.push({
            pattern : pattern,
            handle : handle
        })
    }

    _getUrlParams({ url = '', pattern = '' }) {
        let result = {};

        if (!url && typeof window !== 'undefined') url = window.location.pathname;
        if (!url || !pattern) return result;

        const urlPath = url.split('?')[0];
        urlPath = urlPath.split('/');

        pattern = pattern.split('/');

        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] && pattern[i] === '*') continue;

            if (pattern[i] && pattern[i][0] === ':') {
                const key = pattern[i].slice(1);
                result[key] = urlPath[i];
            } else if (pattern[i] && pattern[i] !== urlPath[i]) {
                return null;
            }
        }

        return result;
    }

    _getQueryParams(url = '') {
        let result = {};

        if (!url && typeof window !== 'undefined') url = window.location.search;
        if (!url) return result;

        let queryParams = url.split('?')[1];
        queryParams = queryParams.split('&');
            
        for (let i = 0; i < queryParams.length; i++) {
            let param = queryParams[i];

            if (param) {
                param = param.split('=');
                result[param[0]] = param[1] || true;
            }
        }

        return result;
    }

    _executeRoute({ handle, params = {} }) {
        if (Array.isArray(handle)) {
            handle.forEach(h => {
                h(params);
            })
        } else {
            handle(params);
        }
    }

    execute({ params = {}, url = '' }) {
        this._routes.forEach(route => {
            const { pattern, handle } = route;
            
            const urlParams = this._getUrlParams({ url, pattern });
            
            if (urlParams) {
                const queryParams = this._getQueryParams(url);

                this._executeRoute({
                    handle : handle,
                    params : Object.assign({}, {
                        path : urlParams,
                        query : queryParams,
                        router : this
                    }, params)
                })
            }
        })
    }

    redirect(url) {
        window.location.href = url;
    }
}

export default Router;