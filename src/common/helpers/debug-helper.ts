import * as clc from 'cli-color';

export const dbg = (o: any, ...out: any[]) => {
  const formats = {
    middleware: {
      indent: 2,
      symbol: '[M:]',
      color: 'green',
    },
    guard: {
      indent: 4,
      symbol: '[G:]',
      color: 'magenta',
    },
    interceptor: {
      indent: 6,
      symbol: '[I:]',
      color: 'yellow',
    },
    pipe: {
      indent: 8,
      symbol: '[P:]',
      color: 'cyan',
    },
    filter: {
      indent: 10,
      symbol: '[E:]',
      color: 'red',
    },
  };

  let prefix = '';
  let typeFormat = {
    indent: 0,
    symbol: '',
    color: 'white',
  };

  if ('intercept' in o) {
    typeFormat = formats.interceptor;
  } else if ('use' in o) {
    typeFormat = formats.middleware;
  } else if ('canActivate' in o) {
    typeFormat = formats.guard;
  } else if ('transform' in o) {
    typeFormat = formats.pipe;
  } else if ('catch' in o) {
    typeFormat = formats.filter;
  }

  prefix =
    '>'.repeat(typeFormat.indent) +
    ' ' +
    typeFormat.symbol +
    o.constructor.name +
    ' ';

  console.log(clc[typeFormat.color](prefix) + out.join(''));
};
