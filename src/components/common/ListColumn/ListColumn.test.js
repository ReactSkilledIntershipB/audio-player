import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import { ListColumn, ListUi } from './ListColumn';

const mockData = {
    id: 302127,
    title: 'Discovery',
    cover_small: 'https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/56x56-000000-80-0-0.jpg',
    tracks: {
        data: [
            {
                id: 3135553,
                title: 'One More Time',
                duration: 320,
                artist: {
                    name: 'Daft Punk'
                }
            }
        ]
    }
};

describe('ListColumn', () => {
    it('should match snapshot', () => {
        const props = {
            albumModel: {},
            songModel: {},
            playerModel: {},
            appUI: {}
        };

        const listColumn = renderer
            .create(
                <Provider
                    albumModel={props.albumModel}
                    songModel={props.songModel}
                    playerModel={props.playerModel}
                    appUI={props.appUI}
                >
                    <ListColumn
                        heading={mockData.title}
                        data={mockData.tracks.data}
                        avatar={mockData.cover_small} />
                </ Provider>
            )
            .toJSON();

        expect(listColumn).toMatchSnapshot();
    });
});

describe('ListUi', () => {
    describe('formatNumber', () => {
            const listUi = new ListUi();

        it('should return passed number', () => {
            const mockDurationSec = 50;

            const formatNumber = listUi.formatNumber(mockDurationSec);

            expect(formatNumber).toEqual(mockDurationSec);
        });

        it('should return passed number with zero at the front.', () => {
            const mockDurationSec = 1;

            const formatNumber = listUi.formatNumber(mockDurationSec);

            expect(formatNumber).toEqual(`0${mockDurationSec}`);
        });
    });
});