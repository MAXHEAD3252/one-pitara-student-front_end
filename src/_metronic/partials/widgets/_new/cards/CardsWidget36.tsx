import { FC, useState, useEffect } from "react";
import { Tabs, Tab, Table, Button, Modal } from "react-bootstrap";
import { DOMAIN } from "../../../../../app/routing/ApiEndpoints";
import { useAuth } from "../../../../../app/modules/auth";

interface TimetableEntry {
  subject_id: string | number | readonly string[] | undefined;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  room: string;
  staffId: number;
  subjectName: string;
  id: number;
  isNew?: boolean; // Flag to track new rows
}

interface Schedule {
  [key: string]: TimetableEntry[];
}

const CardsWidget36: FC<{ classId: number; sectionId: number }> = ({
  classId,
  sectionId,
}) => {
  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;
  const session_id = currentUser?.session_id;
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [schedule, setSchedule] = useState<Schedule>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [updatedEntries, setUpdatedEntries] = useState<TimetableEntry[]>([]); // Track edited/new rows
  const [deletedEntry, setDeletedEntry] = useState<TimetableEntry | null>(null); // Track deleted entry
  const [teachers, setTeachers] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Show delete confirmation
  const [showUndo, setShowUndo] = useState(false); // Show undo button after delete
  const [undoTimeout, setUndoTimeout] = useState<NodeJS.Timeout | null>(null); // Undo timeout handler

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchTeachersAndSubjects = async () => {
      try {
        const teacherResponse = await fetch(
          `${DOMAIN}/api/school/get-onlyteacher/${school_id}`
        );
        const teacherData = await teacherResponse.json();
        setTeachers(teacherData);

        const subjectResponse = await fetch(
          `${DOMAIN}/api/school/get-subjects?class_id=${classId},section_id=${sectionId},school_id=${school_id}`
        );
        const subjectData = await subjectResponse.json();
        setSubjects(subjectData);
      } catch (error) {
        console.error("Failed to fetch teachers or subjects", error);
      }
    };

    fetchTeachersAndSubjects();
  }, [classId, sectionId, school_id]);

  const getDayName = (dayNumber: number) => {
    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return dayNames[dayNumber - 1];
  };

  const fetchTimetable = async () => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/time-table?class_id=${classId}&section_id=${sectionId}&school_id=${school_id}`
      );
      const data = await response.json();
      const newSchedule: Schedule = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };

      data.forEach((entry: TimetableEntry) => {
        entry.daysOfWeek.forEach((dayNumber: number) => {
          const dayName = getDayName(dayNumber);
          newSchedule[dayName].push({ ...entry });
        });
      });

      setSchedule(newSchedule);
    } catch (error) {
      console.error("Failed to fetch timetable", error);
    }
  };

  useEffect(() => {
    if (classId && sectionId) {
      fetchTimetable();
    }
  }, [classId, sectionId]);

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
  };

  const addNewRow = () => {
    const newRow: TimetableEntry = {
      subjectName: "",
      startTime: "",
      endTime: "",
      room: "",
      staffId: 0,
      daysOfWeek: [days.indexOf(selectedDay) + 1],
      subject_id: 0,
      isNew: true, // Mark as new
      day:selectedDay,
      class_id : classId,
      section_id: sectionId,
      session_id: session_id
    };

    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], newRow],
    }));

    setUpdatedEntries((prev) => [...prev, newRow]); // Add to updated list
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newSchedule = [
      ...schedule[selectedDay].map((entry) => ({ ...entry })),
    ];
  
    // if (field === "room") {
    //   value = `Room Number: ${value}`; // Re-add the "Room Number: " prefix
    // }
  
    // Update the specific field
    newSchedule[index][field] = value;
  
    // Update the state with the modified schedule
    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: newSchedule,
    }));
  
    // Check if the row is new or modified
    const updatedEntry = newSchedule[index];
  
    if (updatedEntry.isNew || hasChanged(updatedEntry)) {
      const entryExists = updatedEntries.find(
        (entry) => entry.id === updatedEntry.id
      );
  
      if (!entryExists) {
        setUpdatedEntries((prev) => [...prev, updatedEntry]);
      } else {
        setUpdatedEntries((prev) =>
          prev.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry
          )
        );
      }
    }
  };
  

  // Utility function to detect if any field has changed
  const hasChanged = (entry: TimetableEntry): boolean => {
    const originalEntry = schedule[selectedDay].find((e) => e.id === entry.id);

    if (!originalEntry) return false; // If no original entry, treat as new

    // Compare each field of the entry to detect changes
    return (
      entry.subject_id !== originalEntry.subject_id ||
      entry.staffId !== originalEntry.staffId ||
      entry.startTime !== originalEntry.startTime ||
      entry.endTime !== originalEntry.endTime ||
      entry.room !== originalEntry.room // Ensure the full 'room' field is being checked properly
    );
  };

  const removeRow = (index: number) => {
    const currentSchedule = schedule[selectedDay];
    const removedEntry = currentSchedule[index];
    setDeletedEntry(removedEntry); // Track for undo

    setShowDeleteModal(true); // Show confirmation
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);

    // Call API to delete entry from database if it's not a new entry
    if (!deletedEntry?.isNew) {
        fetch(`${DOMAIN}/api/school/delete-timetable-entry/${school_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: deletedEntry?.id }),
        });
    }

    // Remove from schedule and state
    setSchedule((prev) => ({
        ...prev,
        [selectedDay]: prev[selectedDay].filter(
            (entry) => entry.id !== deletedEntry?.id
        ),
    }));

    // Show undo option for 15 seconds
    setShowUndo(true);
    const timeout = setTimeout(() => {
        setShowUndo(false);
        setDeletedEntry(null);
    }, 15000);
    setUndoTimeout(timeout);
};


const undoDelete = () => {
  if (deletedEntry) {
      // Call API to undo delete entry in the database
      fetch(`${DOMAIN}/api/school/undo-delete-timetable-entry/${school_id}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: deletedEntry?.id }),
      }).then((response) => {
          if (response.ok) {
              // Restore entry in the frontend state
              setSchedule((prev) => ({
                  ...prev,
                  [selectedDay]: [...prev[selectedDay], deletedEntry],
              }));
              setDeletedEntry(null);
              setShowUndo(false);
              if (undoTimeout) clearTimeout(undoTimeout);
          }
      });
  }
};


  const handleSubmit = () => {
    // Filter new and existing entries
    const newEntries = updatedEntries.filter((entry) => entry.isNew);
    const existingEntries = updatedEntries.filter((entry) => !entry.isNew);
  
    // Ensure class_id, section_id, session_id, and day are included in new entries
    const entriesWithDetails = newEntries.map((entry) => ({
      ...entry,
      class_id: classId, // Include classId
      section_id: sectionId, // Include sectionId
      session_id: session_id, // Include sessionId
      day: selectedDay // Add the selected day to each new entry
    }));
  
    // If there are new entries, send them in a single POST request
    if (entriesWithDetails.length > 0) {
      fetch(`${DOMAIN}/api/school/create-timetable-entry/${school_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Specify the content type as JSON
        },
        body: JSON.stringify(entriesWithDetails), // Send the entries including classId, sectionId, sessionId, and day
      })
      .then((response) => {
        if (!response.ok) {
          // If response is not OK, log error and throw to handle it in catch
          console.error("Error creating timetable entries:", response.statusText);
          throw new Error(`Error creating entries: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("New timetable entries created successfully:", data);
        // Handle successful creation (e.g., notify the user)
      })
      .catch((error) => {
        console.error("Failed to create timetable entries:", error);
        alert("Failed to create new timetable entries. Please try again.");
      });
    }
  
    // If there are existing entries to update, send them in a single PUT request
    if (existingEntries.length > 0) {
      fetch(`${DOMAIN}/api/school/update-timetable-entry`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",  // Specify the content type as JSON
        },
        body: JSON.stringify(existingEntries), // Send the existing entries
      })
      .then((response) => {
        if (!response.ok) {
          console.error("Error updating timetable entries:", response.statusText);
          throw new Error(`Error updating entries: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Existing timetable entries updated successfully:", data);
      })
      .catch((error) => {
        console.error("Failed to update timetable entries:", error);
        alert("Failed to update existing timetable entries. Please try again.");
      });
    }
  
    setUpdatedEntries([]); // Clear updated entries after save
  };
  
  

  return (
    <div
      className="h-md-100 mb-md-5 mb-lg-5"
      style={{
        gap: "10px",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid gray",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Tabs
          activeKey={selectedDay}
          onSelect={(day) => handleDayChange(day || "Monday")}
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "left",
            width: "80%",
            gap: "10px",
            fontFamily: "Manrope",
            fontWeight: "600",
            fontSize: "14px",
          }}
          variant="tabs"
        >
          {days.map((day) => (
            <Tab key={day} eventKey={day} title={day} />
          ))}
        </Tabs>
        <Button
          onClick={addNewRow}
          style={{
            padding: "10px",
            backgroundColor: "#A7FFB0",
            borderRadius: "5px",
            color: "#000",
            cursor: "pointer",
          }}
        >
          + Add Row
        </Button>
      </div>

      <Table
        className="table"
        bordered
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "rgb(242, 246, 255)",
              borderBottom: "1px solid #E0E4F0",
              fontFamily: "Manrope",
              fontWeight: "600",
              color: "#1C335C",
              fontSize: "14px",
            }}
          >
            <th style={{ padding: "12px 20px", textAlign: "left" }}>Subject</th>
            <th style={{ padding: "12px 20px", textAlign: "left" }}>Teacher</th>
            <th style={{ padding: "12px 20px", textAlign: "left" }}>
              Time From
            </th>
            <th style={{ padding: "12px 20px", textAlign: "left" }}>Time To</th>
            <th style={{ padding: "12px 20px", textAlign: "left" }}>Room No</th>
            <th style={{ padding: "12px 20px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedule[selectedDay].map((row, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  index % 2 === 0 ? "rgb(242, 246, 255)" : "#FFFFFF",
                borderBottom: "1px solid #E0E4F0",
                fontFamily: "Manrope",
                fontSize: "14px",
                color: "#1C335C",
              }}
            >
              <td style={{ padding: "12px 20px" }}>
                <select
                  value={row.subject_id}
                  onChange={(e) =>
                    handleInputChange(index, "subject_id", e.target.value)
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </td>
              <td style={{ padding: "12px 20px" }}>
                <select
                  value={row.staffId}
                  onChange={(e) =>
                    handleInputChange(index, "staffId", e.target.value)
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((tea) => (
                    <option key={tea.id} value={tea.id}>
                      {tea.name}
                    </option>
                  ))}
                </select>
              </td>
              <td style={{ padding: "12px 20px" }}>
                <input
                  type="time"
                  value={row.startTime}
                  onChange={(e) =>
                    handleInputChange(index, "startTime", e.target.value)
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </td>
              <td style={{ padding: "12px 20px" }}>
                <input
                  type="time"
                  value={row.endTime}
                  onChange={(e) =>
                    handleInputChange(index, "endTime", e.target.value)
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </td>
              <td style={{ padding: "12px 20px" }}>
                <input
                  type="text"
                  placeholder="Room No"
                  value={row.room.replace("Room Number: ", "")} // Strip the prefix for display purposes
                  onChange={(e) =>
                    handleInputChange(index, "room", e.target.value)
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    minWidth: "100px",
                  }}
                />
              </td>

              <td style={{ padding: "12px 20px" }}>
                <Button
                  onClick={() => removeRow(index)}
                  variant="danger"
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ display: "flex", justifyContent: "right", width: "100%" }}>
        <Button
          onClick={handleSubmit}
          style={{
            padding: "10px",
            backgroundColor: "#A7FFB0",
            borderRadius: "5px",
            color: "#000",
            cursor: "pointer",
          }}
        >
          Save
        </Button>
      </div>

      {showUndo && (
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <Button onClick={undoDelete} variant="warning">
            Undo Delete
          </Button>
        </div>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this row?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { CardsWidget36 };
