CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Job(
    JobId uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    Title VARCHAR(50) NOT NULL,
    Description TEXT NOT NULL,
    Salary NUMERIC(4, 2)
);


CREATE TABLE Event(
    EventId uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    Summary TEXT NOT NULL,
    EvtStart VARCHAR(16) NOT NULL,
    EvtEnd VARCHAR(16) NOT NULL
);

CREATE TABLE JobEvent(
    JobId uuid,
    FOREIGN KEY (JobId) REFERENCES Job(JobId),
    EventId uuid,
    FOREIGN KEY (EventId) REFERENCES Event(EventId),
    PRIMARY KEY(JobId, EventId)
);

CREATE TABLE RecRule(
    RecId uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    RecFreq VARCHAR(10),
    RecInterval INT,
    RecCount INT,
    RecBy BOOLEAN,
    RecByVal VARCHAR(10)   
);

CREATE TABLE Role(
    RoleId uuid PRIMARY KEY DEFAULT uuid_generate_v4 ()
);

CREATE TABLE JobRole(
    JobId uuid,
    FOREIGN KEY (JobId) REFERENCES Job(JobId),
    RoleId uuid,
    FOREIGN KEY (RoleId) REFERENCES Role(RoleId),
    PRIMARY KEY(JobId, RoleId)
);

CREATE TABLE StudyProgramme(
    StudyProgrammeId uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    Name TEXT NOT NULL
);

CREATE TABLE StudyJob(
    StudyId uuid,
    FOREIGN KEY (StudyId) REFERENCES StudyProgramme(StudyProgrammeId),
    JobId uuid,
    FOREIGN KEY (JobId) REFERENCES Job(JobId),
    PRIMARY KEY(StudyId, JobId)
);

CREATE TABLE Student(
    StudentId uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    Name VARCHAR(50) NOT NULL,
    Age INT
);

CREATE TABLE StudentRole(
    StudentId uuid,
    FOREIGN KEY (StudentId) REFERENCES Student(StudentId),
    RoleId uuid,
    FOREIGN KEY (RoleId) REFERENCES Role(RoleId),
    PRIMARY KEY(StudentId, RoleId)
);

CREATE TABLE StudentJob(
    StudentId uuid,
    FOREIGN KEY (StudentId) REFERENCES Student(StudentId),
    JobId uuid,
    FOREIGN KEY (JobId) REFERENCES Job(JobId),
    PRIMARY KEY(StudentId, JobId)
);

CREATE TABLE StudentStudy(
    StudentId uuid,
    FOREIGN KEY (StudentId) REFERENCES Student(StudentId),
    StudyId uuid,
    FOREIGN KEY (StudyId) REFERENCES StudyProgramme(StudyProgrammeId),
    PRIMARY KEY(StudentId, StudyId)
);
