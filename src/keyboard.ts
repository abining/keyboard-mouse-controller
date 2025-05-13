import { GlobalKeyboardListener } from 'node-global-key-listener';
import * as robot from 'robotjs';

interface Screen {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class KeyboardController {
  private keyboard: GlobalKeyboardListener = new GlobalKeyboardListener();
  private screens: Screen[] = [];
  private currentScreenIndex: number = 0;
  private isOptionPressed: boolean = false;
  private isProcessing: boolean = false;

  constructor() {
    this.initScreens();
    this.initKeyboardListener();
  }

  private initScreens(): void {
    // 获取主屏幕信息
    const mainScreen = robot.getScreenSize();
    console.log('主屏幕信息:', mainScreen);
    
    // 配置两个屏幕
    this.screens = [
      {
        id: 0,
        x: -1710,  // 左边屏幕的x坐标
        y: 0,
        width: 1920,  // 副屏实际宽度
        height: 1080   // 副屏实际高度
      },
      {
        id: 1,
        x: 0,  // 主屏幕的x坐标
        y: 0,
        width: mainScreen.width,
        height: mainScreen.height
      }
    ];
    console.log('屏幕配置:', this.screens);
  }

  private initKeyboardListener(): void {
    this.keyboard.addListener((e) => {
      console.log('键盘事件:', e.name, e.state);

      // 检查 Option 键的状态
      if (e.name === 'LEFT ALT' || e.name === 'RIGHT ALT') {
        this.isOptionPressed = e.state === 'DOWN';
        console.log('Option 键状态:', this.isOptionPressed);
        return;
      }

      // 检查是否按下 Q 键且 Option 键处于按下状态
      if (e.state === 'DOWN' && e.name === 'Q' && this.isOptionPressed && !this.isProcessing) {
        this.isProcessing = true;
        try {
          this.moveMouseToScreenCenter();
          // 删除输入的"œ"
          setTimeout(() => {
            robot.keyTap('backspace');
          }, 50); // 稍微延迟，确保"œ"已被输入
        } finally {
          this.isProcessing = false;
        }
      }
    });
  }

  private moveMouseToScreenCenter(): void {
    const screen = this.screens[this.currentScreenIndex];
    
    // 计算屏幕中心点
    const centerX = screen.x + (screen.width / 2);
    const centerY = screen.y + (screen.height / 2);

    console.log(`准备移动鼠标到屏幕 ${screen.id} 的中心位置 (${centerX}, ${centerY})`);

    // 移动鼠标到中心点
    robot.moveMouse(centerX, centerY);

    // 切换屏幕索引
    this.currentScreenIndex = (this.currentScreenIndex + 1) % this.screens.length;

    console.log(`鼠标已移动到屏幕 ${screen.id} 的中心位置 (${centerX}, ${centerY})`);
  }

  public start(): void {
    console.log('键盘监听器已启动，按下 Option + Q 切换鼠标位置');
  }

  public stop(): void {
    this.keyboard.kill();
    console.log('键盘监听器已停止');
  }
}
