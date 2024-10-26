import p5 from 'p5';
import { useCallback, useEffect, useRef } from 'react';
import { generateImageDefinition } from './p5_image_generation/imageGen';
import './App.css';
import { ImageGenerationPreset } from './p5_image_generation/imageGenPresets';

const HEIGHT = 300
const WIDTH = 1000

function P5DesignCanvas(props: { preset: ImageGenerationPreset }) {
    const p5ContainerRef = useRef<HTMLDivElement>(null);

    const sketch = useCallback((p: p5) => {
        //Once at setup
        p.setup = function () {
            const image = generateImageDefinition(p, WIDTH, HEIGHT, props.preset)
            p.createCanvas(image.width, image.height)
            p.background(0);
            for (const layer of image.layers) {
                layer.draw(p)
            }
        }

        //Every frame
        p.draw = function () { }
    }, [props.preset])

    useEffect(() => {
        if (p5ContainerRef.current) {
            const p5Instance = new p5(sketch, p5ContainerRef.current);
            return () => p5Instance.remove();
        }
    }, [p5ContainerRef, sketch]);

    return (
        <div ref={p5ContainerRef} />
    );
}

export default P5DesignCanvas;
