import { useEffect, useState } from "react";

import {
    FaCalendarAlt,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

import "./CalendarReminder.css";


function CalendarReminder() {

    // =========================================
    // TODAY
    // =========================================

    const getToday = () => {
        return new Date();
    };


    const [currentDate, setCurrentDate] =
        useState(() => {

            const today = getToday();

            return new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );

        });


    const [selectedDate, setSelectedDate] =
        useState(() => getToday());


    const [reminders, setReminders] =
        useState([]);


    // =========================================
    // GET LOGGED-IN USER
    // =========================================

    const getUser = () => {

        const userData =
            localStorage.getItem(
                "smartAgriUser"
            );


        if (!userData) {
            return null;
        }


        try {

            return JSON.parse(
                userData
            );

        } catch (error) {

            console.log(
                "Invalid user data:",
                error
            );

            return null;

        }

    };


    // =========================================
    // LOAD FARMER REMINDERS
    // =========================================

    const loadReminders = () => {

        const user =
            getUser();


        if (
            !user ||
            !user.id ||
            user.role !== "Farmer"
        ) {

            setReminders([]);

            return;

        }


        const storageKey =
            `smartAgriReminders_${user.id}`;


        const saved =
            localStorage.getItem(
                storageKey
            );


        if (!saved) {

            setReminders([]);

            return;

        }


        try {

            const parsed =
                JSON.parse(saved);


            if (Array.isArray(parsed)) {

                setReminders(parsed);

            } else {

                setReminders([]);

            }

        } catch (error) {

            console.log(
                "Reminder data error:",
                error
            );

            setReminders([]);

        }

    };


    // =========================================
    // LOAD REMINDERS
    // =========================================

    useEffect(() => {

        loadReminders();


        // Check for newly added reminders
        // while dashboard is open.

        const interval =
            setInterval(
                loadReminders,
                2000
            );


        return () => {

            clearInterval(interval);

        };

    }, []);


    // =========================================
    // CURRENT MONTH
    // =========================================

    const year =
        currentDate.getFullYear();


    const month =
        currentDate.getMonth();


    const monthName =
        currentDate.toLocaleDateString(
            "en-IN",
            {
                month: "long",
                year: "numeric"
            }
        );


    // =========================================
    // FIRST DAY OF MONTH
    // =========================================

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    // =========================================
    // DAYS IN MONTH
    // =========================================

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    // =========================================
    // DATE KEY
    // =========================================

    const makeDateKey = (date) => {

        if (!date) {
            return "";
        }


        const y =
            date.getFullYear();


        const m =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const d =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        return `${y}-${m}-${d}`;

    };


    // =========================================
    // GET REMINDERS FOR DATE
    // =========================================

    const getRemindersForDate = (day) => {

        const dateKey =
            `${year}-${String(
                month + 1
            ).padStart(
                2,
                "0"
            )}-${String(
                day
            ).padStart(
                2,
                "0"
            )}`;


        return reminders.filter(
            (reminder) =>
                reminder.date === dateKey
        );

    };


    // =========================================
    // CHECK TODAY
    // =========================================

    const isToday = (day) => {

        const today =
            getToday();


        return (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
        );

    };


    // =========================================
    // CHECK SELECTED DATE
    // =========================================

    const isSelected = (day) => {

        if (!selectedDate) {
            return false;
        }


        return (
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day
        );

    };


    // =========================================
    // SELECT DATE
    // =========================================

    const selectDate = (day) => {

        setSelectedDate(
            new Date(
                year,
                month,
                day
            )
        );

    };


    // =========================================
    // PREVIOUS MONTH
    // =========================================

    const previousMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month - 1,
                1
            )
        );

    };


    // =========================================
    // NEXT MONTH
    // =========================================

    const nextMonth = () => {

        setCurrentDate(
            new Date(
                year,
                month + 1,
                1
            )
        );

    };


    // =========================================
    // GO TO TODAY
    // =========================================

    const goToToday = () => {

        const today =
            getToday();


        setCurrentDate(
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            )
        );


        setSelectedDate(
            today
        );

    };


    // =========================================
    // CREATE CALENDAR DAYS
    // =========================================

    const calendarDays = [];


    // Empty cells before first day

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        calendarDays.push(

            <div
                className="calendar-day empty"
                key={`empty-${i}`}
            />

        );

    }


    // Actual days

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayReminders =
            getRemindersForDate(
                day
            );


        let className =
            "calendar-day";


        if (isToday(day)) {

            className += " today";

        }


        if (isSelected(day)) {

            className += " selected";

        }


        if (
            dayReminders.length > 0
        ) {

            className += " has-reminder";

        }


        calendarDays.push(

            <button
                type="button"
                className={className}
                key={day}
                onClick={() =>
                    selectDate(day)
                }
            >

                <span>
                    {day}
                </span>


                {dayReminders.length > 0 && (

                    <small>
                        {dayReminders.length}
                    </small>

                )}

            </button>

        );

    }


    // =========================================
    // SELECTED DATE REMINDERS
    // =========================================

    const selectedDateKey =
        selectedDate
            ? makeDateKey(
                selectedDate
            )
            : "";


    const selectedReminders =
        reminders.filter(
            (reminder) =>
                reminder.date ===
                selectedDateKey
        );


    // =========================================
    // SELECTED DATE TEXT
    // =========================================

    const selectedDateText =
        selectedDate
            ? selectedDate.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            )
            : "";


    // =========================================
    // UI
    // =========================================

    return (

        <div className="calendar-reminder">


            {/* HEADER */}

            <div className="calendar-header">

                <div>

                    <h2>

                        <FaCalendarAlt />

                        Calendar

                    </h2>


                    <p>
                        Plan and manage your farm activities.
                    </p>

                </div>


                <button
                    type="button"
                    className="today-btn"
                    onClick={goToToday}
                >
                    Today
                </button>

            </div>


            {/* MONTH NAVIGATION */}

            <div className="calendar-navigation">

                <button
                    type="button"
                    className="month-btn"
                    onClick={previousMonth}
                >

                    <FaChevronLeft />

                </button>


                <h3>
                    {monthName}
                </h3>


                <button
                    type="button"
                    className="month-btn"
                    onClick={nextMonth}
                >

                    <FaChevronRight />

                </button>

            </div>


            {/* WEEK DAYS */}

            <div className="calendar-weekdays">

                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>

            </div>


            {/* CALENDAR */}

            <div className="calendar-grid">

                {calendarDays}

            </div>


            {/* SELECTED DATE */}

            <div className="selected-date">

                <FaCalendarAlt />


                <div>

                    <span>
                        Selected Date
                    </span>


                    <strong>
                        {selectedDateText}
                    </strong>

                </div>

            </div>


            {/* REMINDERS */}

            <div className="calendar-reminders">

                <h3>
                    Reminders
                </h3>


                {selectedReminders.length === 0 ? (

                    <p className="no-calendar-reminder">
                        No reminders for this date.
                    </p>

                ) : (

                    selectedReminders.map(
                        (reminder) => (

                            <div
                                className="calendar-reminder-item"
                                key={reminder.id}
                            >

                                <div className="calendar-reminder-dot">
                                    🔔
                                </div>


                                <div>

                                    <strong>
                                        {reminder.title}
                                    </strong>


                                    <p>
                                        {reminder.type}
                                    </p>

                                </div>

                            </div>

                        )
                    )

                )}

            </div>

        </div>

    );
}


export default CalendarReminder;