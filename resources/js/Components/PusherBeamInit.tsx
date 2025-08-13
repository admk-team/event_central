import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
// ✅ Correct import for Beams client (no default export)
import * as PusherPushNotifications from "@pusher/push-notifications-web";
const PusherBeamInit = () => {
    const user: any = usePage().props.auth.user;
    useEffect(() => {
        // ✅ Push Notifications subscription
        if (user["id"]) {
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: import.meta.env
                    .VITE_PUSHER_BEAMS_INSTANCE_ID as string,
            });

            beamsClient
                .start()
                .then(() => {
                    console.log("✅ Beams client started");
                    return beamsClient.addDeviceInterest(
                        `attendee-${user["id"]}`
                    );
                })
                .then(() => {
                    console.log(`📢 Subscribed to attendee-${user["id"]}`);
                })
                .catch(console.error);
        }
        console.log("✅ Beams");
    }, []);

    return null;
};

export default PusherBeamInit;
