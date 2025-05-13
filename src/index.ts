#!/usr/bin/env node

import { Command } from 'commander';
import { MouseRecorder } from './mouse-recorder';
import { KeyboardController } from './keyboard';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();
const recorder = new MouseRecorder();
const keyboardController = new KeyboardController();

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

program
  .command('record')
  .description('记录鼠标点击位置')
  .option('-o, --output <file>', '输出文件路径', 'mouse-clicks.csv')
  .action((options) => {
    console.log('按 Ctrl+C 停止记录...');
    console.log('移动鼠标并点击来记录位置...');
    
    // 开始记录
    recorder.startRecording();

    // 处理 Ctrl+C
    process.on('SIGINT', () => {
      const positions = recorder.stopRecording();
      const csv = recorder.exportToCSV();
      
      // 保存到文件
      fs.writeFileSync(options.output, csv);
      console.log(`记录已保存到 ${options.output}`);
      console.log(`共记录了 ${recorder.getTotalClicks()} 次点击`);
      
      process.exit(0);
    });
  });

program
  .command('keyboard')
  .description('启动键盘控制功能')
  .option('-s, --stop', '停止键盘控制')
  .action((options) => {
    if (options.stop) {
      keyboardController.stop();
      console.log('键盘控制已停止');
    } else {
      keyboardController.start();
      console.log('键盘控制已启动');
      console.log('使用 Option + Q 在屏幕之间切换鼠标位置');
      console.log('按 Ctrl+C 退出...');

      // 处理 Ctrl+C
      process.on('SIGINT', () => {
        keyboardController.stop();
        process.exit(0);
      });
    }
  });

program.parse();