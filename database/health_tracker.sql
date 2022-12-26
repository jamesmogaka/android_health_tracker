--Patients table
CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY NOT NULL,
    --First name
    f_name VARCHAR(40) NOT NULL,
    --Last name
    l_name VARCHAR(40) NOT NULL,
    date_of_birth DATE NOT NULL,
    contact VARCHAR(20) NOT NULL UNIQUE CHECK (contact ~ '^(?:0)?(?:254)?[0-9]{9}$'), -- validation of the phone number enterd
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
    contact VARCHAR(20) UNIQUE NOT NULL CHECK (contact ~ '^(?:0)?(?:254)?[0-9]{9}$') -- validation of the phone number enterd
);

--Consultations room table
CREATE TABLE IF NOT EXISTS consultation_room (
    room_id SERIAL PRIMARY KEY NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

--Messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY NOT NULL,
    sender_id INT NOT NULL,
    room_id SERIAL NOT NULL,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('patient', 'doctor')),
    message_content TEXT NOT NULL,
    message_timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (room_id) REFERENCES consultation_room(room_id),
    FOREIGN KEY (sender_id) REFERENCES patients (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES doctors (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

--call logs
--photos
--Other media

--Feeding data to relevant tables
--1. patients
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Alfred', 'Tolefree', '1/7/2012', '0757107449', '3 Leroy Pass');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Delinda', 'Treffrey', '7/29/2016', '0799734334', '94107 Graedel Crossing');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Bealle', 'Kimber', '10/9/1991', '0794957158', '53 Ramsey Crossing');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Emelen', 'Easton', '2/7/2012', '0182737392', '13421 Karstens Terrace');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Leda', 'Pohlke', '5/2/1996', '725025633', '6 Lien Alley');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Candi', 'Cucinotta', '7/20/2017', '149273514', '26762 Arapahoe Center');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Emmey', 'Lively', '1/31/2012', '763536529', '56568 Orin Point');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Archibold', 'Chater', '12/14/2008', '732381253', '04 Waywood Plaza');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Helge', 'Edmands', '5/25/1992', '773565241', '7 Lotheville Road');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Netti', 'Treweke', '12/13/2005', '792844776', '967 Magdeline Point');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Dorita', 'Marsh', '7/15/2018', '724043074', '12940 Stone Corner Parkway');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Moise', 'Martynov', '10/29/2004', '758904094', '1569 Green Parkway');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Felice', 'Blennerhassett', '4/28/2007', '799193398', '7374 Vahlen Trail');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Alberik', 'McMains', '12/7/1990', '798702734', '3 Transport Drive');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Oby', 'Padson', '2/10/1990', '739653712', '41557 Fuller Court');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Dedie', 'Clubley', '12/29/1995', '783191465', '0 Hayes Court');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Ewan', 'Winspare', '9/4/1994', '744485435', '91 Dapin Pass');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Keely', 'Catonne', '5/7/2000', '764988964', '8 Schiller Street');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Gerda', 'Cracoe', '3/30/1991', '707885088', '10 Novick Point');
insert into patients (f_name, l_name, date_of_birth, contact, patient_address) values ('Marcy', 'Cancellario', '1/16/1996', '741279856', '9 Mosinee Terrace');

--2. Doctors
insert into doctors (f_name, l_name, Specification, contact) values ('Zorina', 'Amiable', 'General doctor', '714092611');
insert into doctors (f_name, l_name, Specification, contact) values ('Jud', 'Robeson', 'Psychiatrist', '781675417');
insert into doctors (f_name, l_name, Specification, contact) values ('La verne', 'Inskipp', 'Neurologist', '703832280');
insert into doctors (f_name, l_name, Specification, contact) values ('Louie', 'Biddell', 'Nutritionist', '725154715');
insert into doctors (f_name, l_name, Specification, contact) values ('Ford', 'Hache', 'Dermatologist', '712294987');
insert into doctors (f_name, l_name, Specification, contact) values ('Nonnah', 'Andersson', 'Oncologist', '702319072');
insert into doctors (f_name, l_name, Specification, contact) values ('Pail', 'Beaford', 'Dentist', '779660976');
insert into doctors (f_name, l_name, Specification, contact) values ('Darrel', 'Omrod', 'Psychiatrist', '705541864');
insert into doctors (f_name, l_name, Specification, contact) values ('Sibylla', 'Grigoriscu', 'Optitian', '711694493');
insert into doctors (f_name, l_name, Specification, contact) values ('Urban', 'Mingardi', 'Anesthesiologist', '771246496');
--3. consultation rooms
insert into consultation_room (patient_id, doctor_id) values (11, 8);
insert into consultation_room (patient_id, doctor_id) values (6, 3);
insert into consultation_room (patient_id, doctor_id) values (12, 8);
insert into consultation_room (patient_id, doctor_id) values (8, 9);
insert into consultation_room (patient_id, doctor_id) values (14, 4);
insert into consultation_room (patient_id, doctor_id) values (5, 10);
insert into consultation_room (patient_id, doctor_id) values (5, 9);
insert into consultation_room (patient_id, doctor_id) values (2, 5);
insert into consultation_room (patient_id, doctor_id) values (13, 2);
insert into consultation_room (patient_id, doctor_id) values (13, 5);
insert into consultation_room (patient_id, doctor_id) values (3, 4);
insert into consultation_room (patient_id, doctor_id) values (7, 9);
insert into consultation_room (patient_id, doctor_id) values (2, 10);
insert into consultation_room (patient_id, doctor_id) values (15, 4);
insert into consultation_room (patient_id, doctor_id) values (7, 10);
insert into consultation_room (patient_id, doctor_id) values (1, 6);
insert into consultation_room (patient_id, doctor_id) values (17, 4);
insert into consultation_room (patient_id, doctor_id) values (19, 5);
insert into consultation_room (patient_id, doctor_id) values (11, 7);
insert into consultation_room (patient_id, doctor_id) values (20, 1);
insert into consultation_room (patient_id, doctor_id) values (8, 4);
insert into consultation_room (patient_id, doctor_id) values (15, 8);
insert into consultation_room (patient_id, doctor_id) values (18, 7);
insert into consultation_room (patient_id, doctor_id) values (6, 3);
insert into consultation_room (patient_id, doctor_id) values (15, 4);
insert into consultation_room (patient_id, doctor_id) values (5, 7);
insert into consultation_room (patient_id, doctor_id) values (12, 5);
insert into consultation_room (patient_id, doctor_id) values (9, 7);
insert into consultation_room (patient_id, doctor_id) values (10, 8);
insert into consultation_room (patient_id, doctor_id) values (15, 4);
--4. messages
