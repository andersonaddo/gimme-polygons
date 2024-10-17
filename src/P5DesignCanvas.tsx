import './App.css';
import { useEffect, useRef } from 'react';
import p5 from 'p5';

function sketch(p: p5) {
    p.setup = function () {
        p.createCanvas(400, 400);
        p.background(0);
        p.circle(200, 200, 400);
    }

    p.draw = function () {
        //TODO
    }
}

function P5DesignCanvas() {
    const p5ContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (p5ContainerRef.current) {
            const p5Instance = new p5(sketch, p5ContainerRef.current);
            return () => p5Instance.remove();
        }
    }, []);

    return (
        <div ref={p5ContainerRef} />
    );
}

export default P5DesignCanvas;
