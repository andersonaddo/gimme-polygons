import { Space, Title } from '@mantine/core';
import { memo, useCallback, useMemo } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowRenderer } from 'react-virtualized';
import { ImageGenerationPreset } from './p5_image_generation/imageGenPresets';
import { P5ContextProvider } from './P5Context';
import P5DesignCanvas from './P5DesignCanvas';
import { P5DownloadButton } from './P5DownloadButton';


function ImageListImpl(props: { preset: ImageGenerationPreset }) {
    const ARBITRARILY_LARGE_NUMBER = 1000

    const cache = useMemo(() => new CellMeasurerCache({
        // All images are the same size, so one cached measurement is good enough for all of them.
        keyMapper: () => 1
    }), [])

    const cellRenderer: ListRowRenderer = useCallback(({ columnIndex, key, parent, index, style }) => {
        return (
            <CellMeasurer
                cache={cache}
                columnIndex={columnIndex}
                key={key}
                parent={parent}
                rowIndex={index}
            >
                <div style={style} >
                    <P5ContextProvider>
                        <div style={{ display: "flex", flexDirection: "row", marginTop: 16 }}>
                            <Title order={4}>Image {index + 1}</Title>
                            <Space w="sm" />
                            <P5DownloadButton />
                        </div>
                        <P5DesignCanvas preset={props.preset} />
                    </P5ContextProvider>
                </div>
            </CellMeasurer>
        );
    }, [cache, props.preset])


    return (
        <AutoSizer>
            {({ width, height }) => (
                <List
                    className='p5-image-list'
                    height={height}
                    overscanRowCount={50}
                    width={width}
                    rowCount={ARBITRARILY_LARGE_NUMBER}
                    rowRenderer={cellRenderer}
                    deferredMeasurementCache={cache}
                    rowHeight={cache.rowHeight}
                />
            )}
        </AutoSizer>
    )
}

export const P5ImageList = memo(ImageListImpl)