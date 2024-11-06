import { ActionIcon } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useContext } from 'react';
import { P5Context } from './P5Context';

export function P5DownloadButton() {
    const p5Context = useContext(P5Context)
    return (
        <div>
            <ActionIcon onClick={p5Context.p5SaveFunction}>
                <IconDownload />
            </ActionIcon>
        </div>
    );
}
