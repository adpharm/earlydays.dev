import { c as createComponent, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/_layout_CFwFyqHr.mjs';
/* empty css                                */
export { renderers } from '../../renderers.mjs';

const $$Test = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Viewer", null, { "content": `<div>
    <h1>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >Your guide on all things AWS Accounts, IAM Identity Center, IAM Users,
        and IAM Roles</span
      >
    </h1><p><br /></p><p>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >Wrapping your head around AWS authentication and authorization can be
        confusing. This post is designed to be the guide I wish I had when I was
        learning about all this stuff.</span
      >
    </p><p>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >I think it\u2019s easiest to learn about the subtle differences between
        accounts, IAM users and IAM roles through use-cases. So let\u2019s start
        there.</span
      >
    </p><p><br /></p><p><br /></p><p><br /></p><p><br /></p><h2>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >IAM User use-case: Logging into your AWS account through the AWS
        Console</span
      >
    </h2><p>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >When you navigate to console.aws.amazon.com, you\u2019re prompted to login
        to your AWS account as an IAM user. If you work in a team, someone with
        admin privileges would create an IAM user for you to use. Since your IAM
        user has admin or near-admin privileges, you should have MFA set up.</span
      >
    </p><h2>
      <span style="background-color: transparent; color: rgb(0, 0, 0);">
        <img
          src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfiSLfU47ppZe__ImKnUtrMGPtPKW9wZzU1gUSa6gv7IA-tgDz-InRKrb3jZpAuSVI4k2kFDY2c7tDfl_niTiZPTvgc4lI87qjXyEXvGrU1SnxXu1EOUfR_9Go-IXdWDygz3CzrEeuIOR1hhMcMiEiRKm0?key=I8vBm7tw-d4Oq7wEI1F71A"
          height="329"
          width="213"
        /></span
      >
    </h2><p><br /></p><p><br /></p><p><br /></p><p><br /></p><h2>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >IAM Identity Center use-case: Authenticating your computer with AWS</span
      >
    </h2><p>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >Logging into the AWS console with your IAM user account is perfectly
        fine. But what about authenticating your computer to have access to all
        the things you do? You could create an access key/secret pair and set
        that in your computer\u2019s AWS config, but that would technically be unsafe
        because those credentials never expire and they give admin or near-admin
        privileges.</span
      >
    </p><p>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >Instead, now would be a good time to use SSO. It\u2019s easy to set that up
        in the IAM Identity Center. There\u2019s other documentation online about
        this, but the general steps are:</span
      >
    </p><ol>
      <li data-list="ordered">
        <span class="ql-ui" contenteditable="false"></span><span
          style="background-color: transparent; color: rgb(0, 0, 0);"
          >Create an IAM Identity Center user for yourself (they are uniquely
          identified by email).</span
        >
      </li><li data-list="ordered">
        <span class="ql-ui" contenteditable="false"></span><span
          style="background-color: transparent; color: rgb(0, 0, 0);"
          >Give yourself admin privileges, or whatever privileges you need.</span
        >
      </li><li data-list="ordered">
        <span class="ql-ui" contenteditable="false"></span><span
          style="background-color: transparent; color: rgb(0, 0, 0);"
          >On the command line, run
        </span><span
          style="background-color: transparent; color: rgb(24, 128, 56);"
          >aws configure sso</span
        ><span style="background-color: transparent; color: rgb(0, 0, 0);">
        </span>
      </li>
    </ol><p>
      <span style="background-color: transparent; color: rgb(24, 128, 56);"
        ># aws configure sso</span
      >
    </p><p>
      <span style="background-color: transparent; color: rgb(24, 128, 56);"
        >SSO session name (Recommended): benhonda-sso-session</span
      >
    </p><p>
      <span style="background-color: transparent; color: rgb(24, 128, 56);"
        ># get this from IAM Identity center dashboard</span
      >
    </p><p>
      <span style="background-color: transparent; color: rgb(24, 128, 56);"
        >SSO start URL [None]: https://&lt;instance-id&gt;</span
      ><u style="background-color: transparent; color: rgb(24, 128, 56);"
        ><a
          href="http://.awsapps.com/start"
          rel="noopener noreferrer"
          target="_blank">.awsapps.com/start</a
        ></u
      >
    </p><p>
      <span style="background-color: transparent; color: rgb(24, 128, 56);"
        >SSO region [None]: ca-central-1</span
      >
    </p><p>
      <span style="background-color: transparent; color: rgb(24, 128, 56);"
        ># leave blank</span
      >
    </p><p>
      <span style="background-color: transparent; color: rgb(24, 128, 56);"
        >SSO registration scopes [sso:account:access]:
      </span>
    </p><p>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >Then login in the browser.</span
      >
    </p><div class="ql-code-block-container" spellcheck="false">
      <div class="ql-code-block"># after logging in...</div><div
        class="ql-code-block"
      >
        Using the account ID XXXXXXXXXXXXX
      </div><div class="ql-code-block">
        The only role available to you is: AdministratorAccess
      </div><div class="ql-code-block">
        Using the role name "AdministratorAccess"
      </div><div class="ql-code-block">
        CLI default client Region [None]: ca-central-1
      </div><div class="ql-code-block">
        CLI default output format [None]: json
      </div><div class="ql-code-block">
        # note: you'll need to reference this profile name often, so keep it
        simple
      </div><div class="ql-code-block">
        # it'll be used for things like 'aws sso login --profile &lt;profile
        name&gt;''
      </div><div class="ql-code-block">
        # I just made mine the same name as my IAM Identity Center username
      </div><div class="ql-code-block">
        CLI profile name [AdministratorAccess-XXXXXXXXXXXXX]: &lt;profile
        name&gt;
      </div>
    </div><p><br /></p><h2>
      <span style="background-color: transparent; color: rgb(0, 0, 0);"
        >TODO: Glossary</span
      >
    </h2><p><br /></p>
  </div>`, "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/Viewer", "client:component-export": "default" })} ` })}`;
}, "/workspace/src/pages/p/test.astro", void 0);

const $$file = "/workspace/src/pages/p/test.astro";
const $$url = "/p/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Test,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
