import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from "../../../Layouts/Attendee"

function JoinLiveStream({ liveStream, playBackKey }: any) {
    return (
        <React.Fragment>
            <Head>
                <title> Live | Attendee Dashboard</title>
                <meta
                    name="description"
                    content="Join and watch your selected live event stream from the attendee dashboard."
                />
                <meta
                    name="keywords"
                    content="join live stream, watch live, attendee live streaming, event streaming"
                />
                <meta name="robots" content="index, follow" />
                <meta
                    property="og:title"
                    content="Join Live Stream | Attendee Dashboard"
                />
                <meta
                    property="og:description"
                    content="Join and watch your selected live event stream from the attendee dashboard."
                />
                <meta property="og:type" content="website" />

                {/* Global style for resetting body margin and padding */}
                <style>{`
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
            </Head>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f0f0',
                padding: '20px'
            }}>
                <div className="stream-player-container" style={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: '1280px',
                    paddingBottom: '46.25%',
                    height: 0,
                    overflow: 'hidden'
                }}>
                    <iframe
                        loading="lazy"
                        title="Gumlet video player"
                        src={playBackKey}
                        style={{
                            border: 'none',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                    ></iframe>
                </div>
            </div>
        </React.Fragment>
    );
}

JoinLiveStream.layout = (page: any) => <Layout children={page} />;

export default JoinLiveStream;
