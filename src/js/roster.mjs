// roster.mjs
// Fetches the class roster from the RandomUser API and caches it in
// localStorage so the same set of students persists across page loads
// (rather than getting a new random roster every time).

const API_URL = "https://randomuser.me/api/?results=15";
const ROSTER_KEY = "classcheck-roster";

// Simple data model for a student: an id (used as the localStorage/attendance
// key), a display name, and a thumbnail photo URL.
export class Student {
    constructor(id, name, photo) {
        this.id = id;
        this.name = name;
        this.photo = photo;
    }
}

// Returns the class roster as an array of Student objects.
// On first call, fetches 15 random people from RandomUser API and caches
// the result in localStorage. On later calls, returns the cached roster
// instead of fetching again, so the same students show up every time.
export async function fetchRoster() {
    // Return cached roster if we already fetched it
    const cached = localStorage.getItem(ROSTER_KEY);
    if (cached) {
        return JSON.parse(cached);
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Map each RandomUser API result into our own Student shape,
        // assigning a simple sequential id (s1, s2, s3, ...)
        const students = data.results.map((person, index) => {
            return new Student(
                `s${index + 1}`,
                `${person.name.first} ${person.name.last}`,
                person.picture.thumbnail
            );
        });

        localStorage.setItem(ROSTER_KEY, JSON.stringify(students));
        return students;
    } catch (error) {
        // If the API call fails, return an empty roster rather than
        // crashing the dashboard
        console.error("Failed to fetch roster:", error);
        return [];
    }
}