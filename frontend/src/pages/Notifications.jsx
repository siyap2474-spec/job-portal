import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  markAsReadThunk,
} from "../features/notifications/notificationSlice";
import Navbar from "../components/Navbar";

function Notifications() {

  const dispatch = useDispatch();

  const { notifications, loading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);


  const handleRead = async (id) => {
    dispatch(markAsReadThunk(id));
  };

  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Notifications
      </h1>

      <div className="space-y-5">

        {notifications.length === 0 ? (
          <p>No notifications found</p>
        ) : (
          
          notifications.map((notification) => (
            
            <div
            key={notification._id}
            className={`p-5 rounded-2xl shadow bg-white border-l-4
              ${notification.read
                ? "border-gray-300"
                : "border-blue-600"
              }`}
              >

              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold text-lg">
                    {notification.message}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {notification.type}
                  </p>
                </div>

                {!notification.read && (
                  <button
                  onClick={() =>
                    handleRead(notification._id)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                  >
                    Mark Read
                  </button>
                )}

              </div>

            </div>
          ))
        )}

      </div>

    </div>
        </>
  );
}

export default Notifications;