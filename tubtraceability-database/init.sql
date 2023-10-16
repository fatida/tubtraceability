-- Create process table if it doesn't exist
CREATE TABLE IF NOT EXISTS process (
    uniqueid INT PRIMARY KEY,
    imm VARCHAR(255),
    date VARCHAR(255),
    datamatrix VARCHAR(255),
    mouldid VARCHAR(255),
    moulddescription VARCHAR(255),
    materialnumber VARCHAR(255),
    materialdescription VARCHAR(255),
    barcode VARCHAR(255),
    weight FLOAT,
    scrap_barcode VARCHAR(255),
    scrap_reason INT,
    energy JSONB,
    cycle JSONB,
    production JSONB,
    qualitycheckdata JSONB,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert initial process data for each imm
INSERT INTO process (uniqueid, imm, date, datamatrix, mouldid, moulddescription, materialnumber, materialdescription, barcode, weight, scrap_barcode, scrap_reason, energy, cycle, production, qualitycheckdata )
VALUES 
    (20000000, 'IMM2', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}'),
    (30000000, 'IMM3', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}'),
    (40000000, 'IMM4', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}'),
    (50000000, 'IMM5', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}'),
    (60000000, 'IMM6', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}'),
    (70000000, 'IMM7', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}'),
    (80000000, 'IMM8', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}'),
    (90000000, 'IMM9', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}'),
    (10000000, 'IMM10', '1970-01-01', '', '', '', '', '', '', 0, '', 0, '{}', '{}', '{}', '{}');

-- Create printer table if it doesn't exist
CREATE TABLE IF NOT EXISTS printer (
    id SERIAL PRIMARY KEY,
    imm VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    ip VARCHAR(15) NOT NULL,
    port INTEGER NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insert printer configuration for each imm

INSERT INTO printer (id, IMM, type, ip, port) VALUES 
    (1, 'IMM2', 'inkjet', '192.168.42.1', 2000),
    (2, 'IMM2', 'label', '192.168.42.1', 2001),
    (3, 'IMM3', 'inkjet', '192.168.42.1', 2000),
    (4, 'IMM3', 'label', '192.168.42.1', 2001),
    (5, 'IMM4', 'inkjet', '192.168.42.1', 2000),
    (6, 'IMM4', 'label', '192.168.42.1', 2001),
    (7, 'IMM5', 'inkjet', '192.168.42.1', 2000),
    (8, 'IMM5', 'label', '192.168.42.1', 2001),
    (9, 'IMM6', 'inkjet', '192.168.42.1', 2000),
    (10, 'IMM6', 'label', '192.168.42.1', 2001),
    (11, 'IMM7', 'inkjet', '192.168.42.1', 2000),
    (12, 'IMM7', 'label', '192.168.42.1', 2001),
    (13, 'IMM8', 'inkjet', '192.168.42.1', 2000),
    (14, 'IMM8', 'label', '192.168.42.1', 2001),
    (15, 'IMM9', 'inkjet', '192.168.42.1', 2000),
    (16, 'IMM9', 'label', '192.168.42.1', 2001),
    (17, 'IMM10', 'inkjet', '192.168.42.1', 2000),
    (18, 'IMM10', 'label', '192.168.42.1', 2001);


-- Create the status table if it doesn't exist
CREATE TABLE IF NOT EXISTS status (
    id SERIAL PRIMARY KEY,
    machine VARCHAR(50) NOT NULL,
    status INTEGER NOT NULL DEFAULT 0,
    created_date TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insert initial status values for machines with status 0
INSERT INTO status (machine, status) VALUES
    ('IMM2', 0),
    ('IMM3', 0),
    ('IMM4', 0),
    ('IMM5', 0),
    ('IMM6', 0),
    ('IMM7', 0),
    ('IMM8', 0),
    ('IMM9', 0),
    ('IMM10', 0),
    ('INKJET2', 0),
    ('INKJET3', 0),
    ('INKJET4', 0),
    ('INKJET5', 0),
    ('INKJET6', 0),
    ('INKJET7', 0),
    ('INKJET8', 0),
    ('INKJET9', 0),
    ('INKJET10', 0),
    ('LABEL2', 0),
    ('LABEL3', 0),
    ('LABEL4', 0),
    ('LABEL5', 0),
    ('LABEL6', 0),
    ('LABEL7', 0),
    ('LABEL8', 0),
    ('LABEL9', 0),
    ('LABEL10', 0);
