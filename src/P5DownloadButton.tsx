import { ActionIcon } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { memo, useContext } from 'react';
import { P5Context } from './P5Context';

function P5DownloadButtonImpl() {
    const p5Context = useContext(P5Context)
    return (
        <div>
            <ActionIcon onClick={p5Context.p5SaveFunction}>
                <IconDownload />
            </ActionIcon>
        </div>
    );
}

export const P5DownloadButton = memo(P5DownloadButtonImpl)
