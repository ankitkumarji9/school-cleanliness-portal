import { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabase";

function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const notificationRef = useRef(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const fetchNotifications = async () => {
        const { data, error } = await supabase
            .from("notifications")
            .select("*")
            .eq("is_read", false)
            .order("created_at", { ascending: false });

        if (error) {
            console.log(error);
            return;
        }

        setNotifications(data);
    };

    const markAsRead = async () => {
        console.log("Marking notifications as read...");

        const { data, error } = await supabase
            .from("notifications")
            .update({ is_read: true })
            .eq("is_read", false)
            .select();

        console.log("Updated Data:", data);
        console.log("Update Error:", error);

        await fetchNotifications();
    };

    const handleBellClick = async () => {
        setShowNotifications(!showNotifications);

        if (!showNotifications) {
            await markAsRead();
        }
    };

    return (
        <div
            ref={notificationRef}
            style={{
                position: "relative",
                display: "inline-block",
            }}
        >
            <button onClick={handleBellClick}>
                🔔 {notifications.length}
            </button>

            {showNotifications && (
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        right: "0",
                        background: "white",
                        border: "1px solid gray",
                        width: "300px",
                        padding: "10px",
                        zIndex: 100,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                >
                    <h3>Notifications</h3>

                    {notifications.length === 0 ? (
                        <p>No Notifications</p>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "10px",
                                }}
                            >
                                {notification.message}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default NotificationBell;