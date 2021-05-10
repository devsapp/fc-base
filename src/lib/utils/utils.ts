import { green, white } from 'colors';
import ProgressBar from 'progress';

export function createProgressBar(format: string, options?: any) {
  const opts = Object.assign({
    complete: green('█'),
    incomplete: white('█'),
    width: 20,
    clear: true,
  }, options);
  const bar = new ProgressBar(format, opts);
  const old = bar.tick;
  const loadingChars = ['⣴', '⣆', '⢻', '⢪', '⢫'];
  bar.tick = (len?: number, tokens?: any) => {
    const newTokens = Object.assign({
      loading: loadingChars[Math.random() * 5],
    }, tokens);
    old.call(bar, len, newTokens);
  };
  return bar;
}
