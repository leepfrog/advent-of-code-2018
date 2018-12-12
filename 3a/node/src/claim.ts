export class Claim {
  id: number;
  xPos: number;
  yPos: number;
  width: number;
  height: number;

  constructor(configuration: string) {
    const regex = /#([\d]+)\s+@\s+([\d]+),([\d]+):\s+([\d]+)x([\d]+)/;
    const match = regex.exec(configuration);

    if (match) {
      this.id = Number(match[1]);
      this.xPos = Number(match[2]);
      this.yPos = Number(match[3]);
      this.width = Number(match[4]);
      this.height = Number(match[5]);

      return;
    }

    throw Error("Unable to parse configuration for Claim");
  }

  left(): number {
    return this.xPos;
  }

  right(): number {
    return this.xPos + this.width - 1;
  }

  top(): number {
    return this.yPos;
  }

  bottom(): number {
    return this.yPos + this.height - 1;
  }

  containsPoint(xPos: number, yPos: number): boolean {
    if (
      xPos >= this.left() &&
      xPos <= this.right() &&
      yPos >= this.top() &&
      yPos <= this.bottom()
    ) {
      return true;
    }

    return false;
  }
}
