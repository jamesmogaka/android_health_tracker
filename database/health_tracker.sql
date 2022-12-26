--Patients table
CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY NOT NULL,
    --First name
    f_name VARCHAR(40) NOT NULL,
    --Last name
    l_name VARCHAR(40) NOT NULL,
    date_of_birth DATE NOT NULL,
    contact VARCHAR(20) NOT NULL CHECK (contact ~ '^(?:0)?(?:254)?[0-9]{9}$'), -- validation of the phone number enterd
    patient_address VARCHAR(100) NOT NULL,
    history JSON,
    current_prescription JSON
);

--Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY NOT NULL,
    f_name VARCHAR(40) NOT NULL,
    --First name
    l_name VARCHAR(40) NOT NULL,
    --Last name
    Specification VARCHAR(100) NOT NULL,
    contact VARCHAR(20) NOT NULL CHECK (contact ~ '^(?:0)?(?:254)?[0-9]{9}$') -- validation of the phone number enterd
);

--Consultations room table
CREATE TABLE IF NOT EXISTS consultation_room (
    room_id SERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY (patients_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

--Messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY NOT NULL,
    sender_id INT NOT NULL,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('patient', 'doctor')),
    message_content TEXT NOT NULL,
    message_timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (room_id) REFERENCES consultation_room(room_id),
    FOREIGN KEY (sender_id, sender_type) REFERENCES patients (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (sender_id, sender_type) REFERENCES doctors (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

--call logs
--photos
--Other media