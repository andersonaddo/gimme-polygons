
import { Space, Title } from '@mantine/core';
import { ImageGenerationPreset } from './p5_image_generation/imageGenPresets';
import { P5ContextProvider } from './P5Context';
import P5DesignCanvas from './P5DesignCanvas';
import { P5DownloadButton } from './P5DownloadButton';
import { useMemo } from 'react';


export function P5Image(props: { preset: ImageGenerationPreset; title: string }) {
    const seed = useMemo(() => Math.floor(Math.random() * 100000000), [])

    return (
        <P5ContextProvider>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Title order={4}>{props.title}</Title>
                <Space w="sm" />
                <P5DownloadButton />
            </div>
            <P5DesignCanvas preset={props.preset} seed={seed} />
            <div style={{ textAlign: "right", fontSize: "0.5em" }}>
                <pre>{seed}</pre>
            </div>
        </P5ContextProvider>
    )
}
