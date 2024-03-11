import executeQuery from "@/dbConfig/dbConfig";

// Function to create a new user
export async function createUser(userData) {
    const { username, email, password } = userData;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, password];
    return await executeQuery({ query, values });
}

// Function to get user by ID
export async function getUserById(userId) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const values = [userId];
    
    return await executeQuery({ query, values });
}


// Function to get user by email
export async function getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
    
    return await executeQuery({ query, values });
}