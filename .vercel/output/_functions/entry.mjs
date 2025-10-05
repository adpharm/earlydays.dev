import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BjSZCXoL.mjs';
import { manifest } from './manifest_B4CdfaSR.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/$.astro.mjs');
const _page3 = () => import('./pages/admin/new-post.astro.mjs');
const _page4 = () => import('./pages/admin.astro.mjs');
const _page5 = () => import('./pages/api/deletepost.astro.mjs');
const _page6 = () => import('./pages/api/getallposts.astro.mjs');
const _page7 = () => import('./pages/api/getpost.astro.mjs');
const _page8 = () => import('./pages/api/getusers.astro.mjs');
const _page9 = () => import('./pages/api/insertdraft.astro.mjs');
const _page10 = () => import('./pages/api/insertpost.astro.mjs');
const _page11 = () => import('./pages/api/newpost.astro.mjs');
const _page12 = () => import('./pages/api/publishpost.astro.mjs');
const _page13 = () => import('./pages/api/updatepost.astro.mjs');
const _page14 = () => import('./pages/api/updateuser.astro.mjs');
const _page15 = () => import('./pages/api/uploadprofileimage.astro.mjs');
const _page16 = () => import('./pages/app/login.astro.mjs');
const _page17 = () => import('./pages/app.astro.mjs');
const _page18 = () => import('./pages/auth/_---auth_.astro.mjs');
const _page19 = () => import('./pages/change-password.astro.mjs');
const _page20 = () => import('./pages/login.astro.mjs');
const _page21 = () => import('./pages/logout.astro.mjs');
const _page22 = () => import('./pages/p/test.astro.mjs');
const _page23 = () => import('./pages/p/_docid_/edit.astro.mjs');
const _page24 = () => import('./pages/p/_docid_.astro.mjs');
const _page25 = () => import('./pages/posts.astro.mjs');
const _page26 = () => import('./pages/u/_userid_/edit.astro.mjs');
const _page27 = () => import('./pages/u/_userid_.astro.mjs');
const _page28 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/$.astro", _page2],
    ["src/pages/admin/new-post.astro", _page3],
    ["src/pages/admin.astro", _page4],
    ["src/pages/api/deletePost.ts", _page5],
    ["src/pages/api/getAllPosts.ts", _page6],
    ["src/pages/api/getPost.ts", _page7],
    ["src/pages/api/getUsers.ts", _page8],
    ["src/pages/api/insertDraft.ts", _page9],
    ["src/pages/api/insertPost.ts", _page10],
    ["src/pages/api/newPost.ts", _page11],
    ["src/pages/api/publishPost.ts", _page12],
    ["src/pages/api/updatePost.ts", _page13],
    ["src/pages/api/updateUser.ts", _page14],
    ["src/pages/api/uploadProfileImage.ts", _page15],
    ["src/pages/app/login.astro", _page16],
    ["src/pages/app/index.astro", _page17],
    ["src/lib/auth.js/api/[...auth].ts", _page18],
    ["src/pages/change-password.astro", _page19],
    ["src/pages/login.astro", _page20],
    ["src/pages/logout.astro", _page21],
    ["src/pages/p/test.astro", _page22],
    ["src/pages/p/[docId]/edit.astro", _page23],
    ["src/pages/p/[docId].astro", _page24],
    ["src/pages/posts.astro", _page25],
    ["src/pages/u/[userId]/edit.astro", _page26],
    ["src/pages/u/[userId].astro", _page27],
    ["src/pages/index.astro", _page28]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "ddf616b4-d179-4e07-886f-efaa8f77304b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
