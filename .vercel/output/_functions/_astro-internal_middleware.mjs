import 'es-module-lexer';
import './chunks/astro-designed-error-pages_Dr4OIoZ6.mjs';
import 'kleur/colors';
import './chunks/astro/server_lvFGk3__.mjs';
import 'clsx';
import 'cookie';
import { d as defineMiddleware, b as sequence } from './chunks/index_6TssqL9o.mjs';
import { a as auth } from './chunks/server_CEcyKXSQ.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify } from 'devalue';
import { parse } from 'content-type';
import { g as getActionContext } from './chunks/server_DPhwTBJV.mjs';

const onRequest$2 = defineMiddleware(async (ctx, next) => {
  ctx.locals.session = await auth(ctx);
  return next();
});

const o=new AsyncLocalStorage,i=new Map(Object.entries(Symbol).filter(([t,e])=>typeof e=="symbol"&&typeof t=="string").map(([t,e])=>[e,t])),c={URL:t=>t instanceof URL&&t.href,Date:t=>t instanceof Date&&t.valueOf(),GlobalSymbol:t=>typeof t=="symbol"&&t.description!==undefined&&t===Symbol.for(t.description)&&t.description,WellKnownSymbol:t=>typeof t=="symbol"&&i.get(t)},d=async t=>{const e=new Map;return {result:await o.run(e,t),getState:()=>e.size>0&&stringify(e,c)}};

const h=defineMiddleware(async(f,r)=>{const{getState:a,result:t}=await d(r),s=t.headers.get("Content-Type");if(s===null)return t;const{type:o}=parse(s);if(o!=="text/html"&&!o.startsWith("text/html+"))return t;const e=await t.text(),n=e.indexOf("</head>");if(n>-1){const i=a();if(i){const c=`<script id="it-astro-state" type="application/json+devalue">${i}</script>`;return new Response(e.slice(0,n)+c+e.slice(n),t)}}return new Response(e,t)});

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) return next();
  const { action, setActionResult, serializeActionResult } = getActionContext(context);
  if (action?.calledFrom === "form") {
    const actionResult = await action.handler();
    setActionResult(action.name, serializeActionResult(actionResult));
  }
  return next();
});

const onRequest = sequence(
	onRequest$2,h,
	
	onRequest$1
);

export { onRequest };
