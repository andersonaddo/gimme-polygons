import p5 from "p5";

// to be used to pass around shape information between layers
export enum ShapeOperation {
  TRUNCATE,
  SHRINK,
  HOLLOW,
}

// A representation of a shape that is being drawn by p5 in a layer
export class Shape {
  centerPoint: p5.Vector;
  vertices: p5.Vector[];
  color?: string;
  operation?: ShapeOperation;

  constructor(
    center: p5.Vector,
    vertices: p5.Vector[],
    color?: string,
    operation?: ShapeOperation
  ) {
    this.centerPoint = center;
    this.vertices = vertices;
    this.operation = operation;
    this.color = color;
  }

  copy(): Shape {
    return new Shape(
      new p5.Vector(this.centerPoint.x, this.centerPoint.y),
      [...this.vertices],
      this.color,
      this.operation
    );
  }

  performOperation(): p5.Vector[] {
    let vertices = [...this.vertices];

    if (this.operation === ShapeOperation.TRUNCATE) {
      vertices = vertices.slice(Math.floor(vertices.length / 2));
    } else if (this.operation === ShapeOperation.SHRINK) {
      const newVertices = [];
      for (const vertex of vertices) {
        newVertices.push(this.centerPoint.lerp(vertex, 0.5));
      }
    }
    return vertices;
  }

  draw(p: p5): void {
    if (!this.color) {
      throw Error("Shape being drawn with no color");
    }

    const points = this.performOperation();

    if (this.operation === ShapeOperation.HOLLOW) {
      p.stroke(this.color);
      p.strokeWeight(10);
      p.noFill();
    } else {
      p.fill(this.color);
      p.noStroke();
    }

    p.beginShape();
    for (const point of points) {
      p.vertex(point.x, point.y);
    }
    p.endShape(p.CLOSE);
  }
}
