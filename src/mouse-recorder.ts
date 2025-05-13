import * as robot from 'robotjs';
import { exec } from 'child_process';

interface MousePosition {
  x: number;
  y: number;
  timestamp: number;
  clickCount: number;
  screenId: number;
}

interface Screen {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class MouseRecorder {
  private positions: MousePosition[] = [];
  private isRecording: boolean = false;
  private screens: Screen[] = [];
  private clickCount: number = 0;
  private lastPos: { x: number; y: number } | null = null;

  constructor() {
    this.initScreens();
  }

  private initScreens(): void {
    // 使用 system_profiler 命令获取显示器信息
    exec('system_profiler SPDisplaysDataType', (error, stdout, stderr) => {
      if (error) {
        console.error(`执行出错: ${error}`);
        return;
      }
      console.log(`显示器信息: ${stdout}`);
    });

    // 获取主屏幕信息
    const mainScreen = robot.getScreenSize();
    
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

    console.log('检测到的屏幕：');
    this.screens.forEach(screen => {
      console.log(`屏幕 ${screen.id}: 位置(${screen.x}, ${screen.y}), 大小 ${screen.width}x${screen.height}`);
    });
  }

  private getScreenId(x: number, y: number): number {
    for (const screen of this.screens) {
      if (x >= screen.x && x < screen.x + screen.width &&
          y >= screen.y && y < screen.y + screen.height) {
        return screen.id;
      }
    }
    return 1; // 默认返回主屏幕
  }

  public startRecording(): void {
    this.isRecording = true;
    this.positions = [];
    this.clickCount = 0;
    this.lastPos = null;
    console.log('开始记录鼠标点击...');
    this.record();
  }

  public stopRecording(): MousePosition[] {
    this.isRecording = false;
    console.log('停止记录鼠标点击');
    return this.positions;
  }

  private record(): void {
    if (!this.isRecording) return;

    const mousePos = robot.getMousePos();

    // 检测鼠标位置是否发生变化
    if (this.lastPos && (this.lastPos.x !== mousePos.x || this.lastPos.y !== mousePos.y)) {
      this.clickCount++;
      const timestamp = Date.now();
      const screenId = this.getScreenId(mousePos.x, mousePos.y);

      // 记录点击位置
      this.positions.push({
        x: mousePos.x,
        y: mousePos.y,
        timestamp,
        clickCount: this.clickCount,
        screenId
      });

      console.log(`记录点击 #${this.clickCount} 在屏幕 ${screenId} 的位置 (${mousePos.x}, ${mousePos.y})`);
    }

    // 更新位置
    this.lastPos = { x: mousePos.x, y: mousePos.y };

    // 继续监听
    setTimeout(() => this.record(), 50);
  }

  public getPositions(): MousePosition[] {
    return this.positions;
  }

  public getScreens(): Screen[] {
    return this.screens;
  }

  public getTotalClicks(): number {
    return this.clickCount;
  }

  public exportToCSV(): string {
    const headers = 'timestamp,x,y,click_count,screen_id\n';
    const rows = this.positions.map(pos => 
      `${pos.timestamp},${pos.x},${pos.y},${pos.clickCount},${pos.screenId}`
    ).join('\n');
    return headers + rows;
  }
} 