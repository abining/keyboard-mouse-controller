#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('kmc')
  .description('macOS 键盘鼠标控制器')
  .version('0.1.0');

program
  .command('hello')
  .description('输出 Hello World')
  .action(() => {
    console.log('Hello World from macos-keyboard-mouse-controller!');
  });

program.parse();