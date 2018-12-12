import { Claim } from "./claim";
import process from "process";

export class FabricManager {
  claims: Claim[];

  constructor(configurations: string[]) {
    this.claims = configurations.map(x => new Claim(x));
  }
  width(): number {
    let rightPositions = this.claims.map(x => x.right());

    return rightPositions.sort((a, b) => b - a).shift() || 0;
  }
  height(): number {
    let bottomPositions = this.claims.map(y => y.bottom());

    return bottomPositions.sort((a, b) => b - a).shift() || 0;
  }
  conflictingFootage(): number {
    let conflictAmount = 0;
    let width = this.width();
    let height = this.height();

    // yuck, but works
    for (let x = 0; x <= width; x++) {
      for (let y = 0; y <= height; y++) {
        if (claimsAt(this.claims, x, y).length > 1) {
          conflictAmount += 1;
        }
      }
    }

    return conflictAmount;
  }
  printDebug() {
    let width = this.width();
    let height = this.height();

    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
        let claims = claimsAt(this.claims, x, y);

        if (claims.length === 0) {
          process.stdout.write(".");
        } else if (claims.length === 1) {
          process.stdout.write(`${claims[0].id}`);
        } else {
          process.stdout.write("X");
        }
      }

      process.stdout.write("\n");
    }
  }
}

function claimsAt(claims: Claim[], xPos: number, yPos: number): Claim[] {
  return claims.filter(claim => claim.containsPoint(xPos, yPos));
}
