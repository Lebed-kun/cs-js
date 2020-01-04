import Router from '../../core/router.js';

import HomePage from './home.js';
import DynamicPage from './dynamic_page.js';
import NotFoundPage from './not_found.js';

const router = new Router();

router.handleRoute({
    exact : true,
    pattern : '/',
    handle : params => new HomePage(params)
});

router.handleRoute({
    exact : true,
    pattern : '/profile/:name',
    handle : params => new DynamicPage({
        props : {
            path : params.path,
            query : params.query,
            router : params.router
        },
        root : params.root
    })
});

router.handleRoute({
    handle : params => new NotFoundPage(params)
});

export default router;