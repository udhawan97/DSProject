CREATE TABLE people (
  personID int(3) NOT NULL AUTO_INCREMENT,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  position varchar(255) NOT NULL,
  gender varchar(50) NOT NULL,
  email varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  dateofBirth date NOT NULL,
  phoneNumber varchar(20) NOT NULL,
  isActive varchar(50) NOT NULL,
  radioNumber varchar(255) NOT NULL,
  stationNumber varchar(50) NOT NULL,
  PRIMARY KEY (personID)
);



CREATE TABLE certification (
  certifyID int(3) NOT NULL AUTO_INCREMENT,
  certifyAgency varchar(255) NOT NULL,
  certifyName varchar(255) NOT NULL,
  expirePeriod int(2) NOT NULL,
  PRIMARY KEY(certifyID)
);



CREATE TABLE certifiedUsers (
  certifiedUserID int NOT NULL AUTO_INCREMENT,
  personID int(3) NOT NULL,
  certifyID int(3) NOT NULL,
  certifiedYear YEAR NOT NULL,
  renewedDate date,
  PRIMARY KEY (certifiedUserID),
  FOREIGN KEY (personID) REFERENCES people(personID),
  FOREIGN KEY (certifyID) REFERENCES certification(certifyID)
);



INSERT INTO certifiedUsers(personID, certifyID, certifiedYear, renewedDate)
VALUES
('2', '1', '2016', '2019-01-01'),
('3','2','2015', '2020-08-01'),
('5','3','2017', '2020-08-01'),
('6','4','2020', ''),
('7','5','2020', '')
;

INSERT INTO certification(certifyAgency, certifyName, expirePeriod)
VALUES
('Ivy Technical College', 'Firefighter I', '3'),
('Georgia Post Academy', 'POST', '5'),
('CPR for Healthcare Providers/American Heart Association', 'CPR', '2'),
('Athens Technical College', 'Firefighter I', '3'),
('CPR for the Professional Rescuer/American Red Cross', 'CPR', '2')
;

INSERT INTO people(firstName, lastName, position, gender, email, address, dateofBirth, phoneNumber, isActive, radioNumber, stationNumber)
VALUES
('Kathryn', 'Pryde', 'Chief', 'Female', 'kprdye@ocfd.com', '1123 Xavier School Drive Watkinsville GA 30677', '1975-06-23', '203-445-2030', 'Yes','A-1','8'),
('Jennifer', 'Bradley', 'Assistant', 'Female', 'jbrad@ocfd.com', '293 Snapper Court  Johns Creek GA 30582', '1970-04-23', '202-855-1930', 'Yes','C-7','8'),
('Alex', 'Lopes', 'Firefighter', 'Male', 'alopes@ocfd.com', '101 Hodge Way Kelley, GA 30627', '1960-06-23', '812-547-2200', 'Yes','A-2','7'),
('James', 'Johnson', 'Chief', 'Male', 'jjohnson@ocfd.com', '1124 Columbus Drive Marietta GA 30627', '1987-02-20', '703-545-1284', 'Yes', 'A-2', '12'),
('Tyler', 'Herro', 'Scout', 'Male', 'therro@ocfd.com', '324 Heat Blvd Lilburn GA 30378', '2000-01-20', '307-855-4439', 'Yes', 'B-7', '6'),
('Nick', 'Jonas', 'Assistant', 'Male', 'njonas@ocfd.com', '128 Chopra Avenue Atlanta GA 30681', '1992-09-16', '982-364-1857', 'Yes', 'P-8', '10'),
('Jeffrey', 'Williams', 'Firefighter', 'Male', 'youngthug@ocfd.com', '3511 Roxbury Rd Atlanta GA 30326', '1991-08-16', '319-432-1238', 'Yes', 'C-2', '12'),
('Dominique', 'Jones', 'Assistant', 'Male', 'itslilbaby@ocfd.com', '192 3rd Avenue Atlanta GA 30326', '1994-12-03', '712-848-9321', 'Yes', 'B-4', '12')
;
