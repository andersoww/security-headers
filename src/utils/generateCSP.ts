// utils/generate-csp.ts
type Directive =
  | "default-src"
  | "script-src-elem"
  | "script-src"
  | "connect-src"
  | "style-src"; /* See the Gist link below */
type Value = string;
interface Options {
  devOnly?: boolean;
}

interface generateCSPProps {
  nonce?: string;
}

const generateCSP = ({ nonce }: generateCSPProps = {}) => {
  const policy: Partial<Record<Directive, Value[]>> = {};

  // adder function for our policy object
  const add = (directive: Directive, value: Value, options: Options = {}) => {
    if (options.devOnly && process.env.NODE_ENV !== "development") return;
    const curr = policy[directive];
    policy[directive] = curr ? [...curr, value] : [value];
  };

  // default-src
  add("default-src", `'none'`);

  // script-src-elem
  add("script-src-elem", `'self'`);

  // script-src
  add("script-src", `'unsafe-eval'`, { devOnly: true });

  // connect-src
  add("connect-src", `'self'`, { devOnly: true });

  // script-src-elem
  // add("script-src-elem", `'self'`);
  add("script-src-elem", `'nonce-${nonce}'`);

  // style-src
  add("style-src", `'nonce-${nonce}'`);
  add("style-src", `'unsafe-inline'`);

  // return the object in a formatted value (this won't work on IE11 without a polyfill!)
  return Object.entries(policy)
    .map(([key, value]) => `${key} ${value.join(" ")}`)
    .join("; ");
};

export { generateCSP };
