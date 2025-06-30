// Initialize students array from localStorage or an empty array if no data exists.
let students = JSON.parse(localStorage.getItem('students')) || [];

// --- DOM ---
const form = document.getElementById('registrationForm');
const tableBody = document.querySelector('#studentTable tbody');

// --- Event Listeners ---
form.addEventListener('submit', function(e) {
    e.preventDefault(); // (page reload).
    
    // Retrieve and trim input values from the form fields.
    const name = document.getElementById('name').value.trim();
    const id = document.getElementById('id').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();
    
    // --- Input Validation ---
    // Check if any required field is empty.
    if (!name || !id || !email || !contact) {
        alert('Please fill all fields');
        return; // Stop execution if fields are empty.
    }
    // Ensure the student's name contains only letters and spaces for validity
    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert('Name should contain only letters');
        return;
    }
    // Ensure the student's id  must contain only numbers for validity
    if (!/^\d+$/.test(id)) {
        alert('Student ID should contain only numbers');
        return;
    }
    // Ensure the student's contact number must contain only numbers for validity
    if (!/^\d+$/.test(contact)) {
        alert('Contact number should contain only numbers');
        return;
    }

    // Ensure the student's email address is valid for accuracy
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email');
        return;
    }
    
    // Create a new student object with the validated input data.
    const student = { name, id, email, contact };
    
    // Add the new student object to the students array.
    students.push(student);
    
    // Save the updated students array to localStorage.
    localStorage.setItem('students', JSON.stringify(students));
    
    // Re-render the student table to display the newly added student.
    dispalyStudentRecords();
    
    // Reset the form fields after successful submission.
    form.reset();
});

// --- Functions ---

/**
 * Renders all student records from the 'students' array into the HTML table.
 * Clears existing table rows and appends new rows for each student.
 */
function dispalyStudentRecords() {
    tableBody.innerHTML = ''; // Clear current table body content.
    
    // Iterate over each student in the array and create a table row.
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        // Populate the row with student data and action buttons (Edit, Delete).
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">.Edit.</button>
                <button onclick="deleteStudent(${index})">.Delete.</button>
            </td>
        `;
        
        tableBody.appendChild(row); // Add the new row to the table body.
    });
}

/**
 * Fills the form with data of a selected student for editing.
 * The student is then removed from the array, and the table is re-rendered.
 * @param {number} index - The index of the student to be edited in the 'students' array.
 */
function editStudent(index) {
    const student = students[index];
    
    // Populate the form fields with the selected student's data.
    document.getElementById('name').value = student.name;
    document.getElementById('id').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;
    
    // Remove the student from the array. They will be re-added upon form submission.
    students.splice(index, 1);
    
    // Update localStorage and re-render the table to reflect the removal.
    localStorage.setItem('students', JSON.stringify(students));
    dispalyStudentRecords();
}

/**
 * Deletes a student record from the 'students' array after user confirmation.
 * Updates localStorage and re-renders the table.
 * @param {number} index - The index of the student to be deleted in the 'students' array.
 */
function deleteStudent(index) {
    // Confirm deletion with the user.
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1); // Remove the student from the array.
        localStorage.setItem('students', JSON.stringify(students)); // Update localStorage.
        dispalyStudentRecords(); // Re-render the table.
    }
}

// --- Initial Load ---
// Load and display existing student records on page initialization
dispalyStudentRecords();