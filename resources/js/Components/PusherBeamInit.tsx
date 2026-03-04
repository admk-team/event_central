import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const PusherBeamInit = () => {
    const user: any = usePage().props.auth.user;

    useEffect(() => {
        try {
            if (!user?.id) {
                return;
            }

            // Skip initialization on browsers that do not support Web Push (e.g. many Safari versions)
            if (
                !PusherPushNotifications.isSupportedBrowser ||
                !PusherPushNotifications.isSupportedBrowser()
            ) {
                console.warn(
                    "Pusher Beams: browser does not support Web Push, skipping initialization."
                );
                return;
            }

            const beamsClient = new PusherPushNotifications.Client({
                instanceId: import.meta.env
                    .VITE_PUSHER_BEAMS_INSTANCE_ID as string,
            });

            beamsClient
                .start()
                .then(() => {
                    console.log("✅ Beams client started");
                    return beamsClient.addDeviceInterest(
                        `attendee-${user.id}`
                    );
                })
                .then(() => {
                    console.log(`📢 Subscribed to attendee-${user.id}`);
                })
                .catch((err) => {
                    console.error("Pusher Beams start/addDeviceInterest error", err);
                });
        } catch (err) {
            console.error("Pusher Beams initialization failed", err);
        }
    }, [user?.id]);

    return null;
};

export default PusherBeamInit;
