import './App.css';
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { generateImageDefinition } from './p5_image_generation/grids';

function sketch(p: p5) {
    //Once at setup
    p.setup = function () {
        const image = generateImageDefinition(1000, 300)
        p.createCanvas(image.width, image.height)
        p.background(0);
        for (const layer of image.layers) {
            layer.draw(p)
        }
    }

    //Every frame
    p.draw = function () {

    }
}

function P5DesignCanvas() {
    const p5ContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (p5ContainerRef.current) {
            const p5Instance = new p5(sketch, p5ContainerRef.current);
            return () => p5Instance.remove();
        }
    }, [p5ContainerRef]);

    return (
        <div ref={p5ContainerRef} />
    );
}

export default P5DesignCanvas;
