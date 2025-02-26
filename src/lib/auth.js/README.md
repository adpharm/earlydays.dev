Feb 26 2025

# What's happening here?

The code here is pulled from [this PR](https://github.com/nextauthjs/next-auth/pull/9856), which is (going to be) the official Auth.js Astro integration. The fork of this PR is [here](https://github.com/TheOtterlord/authjs/tree/auth-astro).

I could have used Astro's linked Community-maintained auth integration ([github.com/nowaythatworked/auth-astro](https://github.com/nowaythatworked/auth-astro)) but it is literally just a copy of the PR, so I figured I could do that as well, and then if any weird bugs come up (like with Vercel or something) I can deal with them directly, no 3rd party libs.

Check out the integration in action in our [astro.config.mjs file](/astro.config.mjs)
