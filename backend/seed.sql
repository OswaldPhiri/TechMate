-- Seed Symptoms
INSERT INTO Symptoms (name, description) VALUES
('PC won\'t boot', 'No power or no POST'),
('Slow performance', 'System lagging or freezing'),
('Blue screen (BSOD)', 'System crashes with blue screen'),
('Overheating', 'Laptop/desktop gets very hot'),
('No display', 'System powers on but no video'),
('No internet', 'Cannot connect to network'),
('Random restarts', 'Reboots unexpectedly'),
('No sound', 'Audio not working');

-- Seed Problems
INSERT INTO Problems (name, type, description) VALUES
('Faulty Power Supply', 'hardware', 'Power supply failure or cable issues'),
('Corrupted OS Files', 'software', 'Damaged system files impacting boot/performance'),
('Insufficient RAM', 'hardware', 'Not enough memory for workloads'),
('Failing Hard Drive / SSD', 'hardware', 'Disk errors causing slowdowns/crashes'),
('Outdated Drivers', 'software', 'Old or incorrect drivers causing instability'),
('Overheating / Thermal Throttling', 'hardware', 'Poor cooling or dust buildup'),
('GPU/Display Issue', 'hardware', 'Graphics card or cable/monitor issue'),
('Network Adapter Issue', 'hardware', 'NIC disabled, driver, or router issue'),
('Malware/Excessive Startup Apps', 'software', 'Malware or too many startup items');

-- Seed Solutions
INSERT INTO Solutions (problem_id, solution_steps) VALUES
((SELECT id FROM Problems WHERE name='Faulty Power Supply'),
 '1. Verify power cable and outlet.\n2. Reseat motherboard power connectors.\n3. Try a known-good PSU.\n4. Check power button/front panel connectors.'),
((SELECT id FROM Problems WHERE name='Corrupted OS Files'),
 '1. Boot into recovery.\n2. Run System File Checker: sfc /scannow.\n3. Run DISM restorehealth.\n4. If unresolved, repair install OS.'),
((SELECT id FROM Problems WHERE name='Insufficient RAM'),
 '1. Check memory usage in Task Manager.\n2. Close heavy apps.\n3. Add RAM modules.\n4. Enable XMP/DOCP if supported.'),
((SELECT id FROM Problems WHERE name='Failing Hard Drive / SSD'),
 '1. Backup data immediately.\n2. Run SMART check (CrystalDiskInfo).\n3. Run chkdsk /f.\n4. Replace drive and restore backup.'),
((SELECT id FROM Problems WHERE name='Outdated Drivers'),
 '1. Identify devices with issues (Device Manager).\n2. Download latest drivers from OEM.\n3. Install chipset/GPU drivers.\n4. Reboot and retest.'),
((SELECT id FROM Problems WHERE name='Overheating / Thermal Throttling'),
 '1. Clean dust from fans/heatsinks.\n2. Replace thermal paste.\n3. Improve airflow or use cooling pad.\n4. Adjust fan curves.'),
((SELECT id FROM Problems WHERE name='GPU/Display Issue'),
 '1. Check monitor input and cable.\n2. Connect to iGPU/another port.\n3. Reinstall GPU drivers.\n4. Test with another monitor/GPU.'),
((SELECT id FROM Problems WHERE name='Network Adapter Issue'),
 '1. Restart router/modem.\n2. Reinstall network driver.\n3. Reset TCP/IP: netsh int ip reset.\n4. Check adapter is enabled.'),
((SELECT id FROM Problems WHERE name='Malware/Excessive Startup Apps'),
 '1. Run antivirus/malware scan.\n2. Disable unnecessary startup apps.\n3. Clean temp files.\n4. Consider OS reset if unresolved.');

-- Map Problem <-> Symptoms with likelihood weights (0.1 to 1.0)
INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.9 FROM Symptoms s, Problems p
WHERE s.name = 'PC won''t boot' AND p.name = 'Faulty Power Supply';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.6 FROM Symptoms s, Problems p
WHERE s.name = 'PC won''t boot' AND p.name = 'Corrupted OS Files';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.7 FROM Symptoms s, Problems p
WHERE s.name = 'Slow performance' AND p.name = 'Insufficient RAM';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.8 FROM Symptoms s, Problems p
WHERE s.name = 'Slow performance' AND p.name = 'Failing Hard Drive / SSD';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.6 FROM Symptoms s, Problems p
WHERE s.name = 'Slow performance' AND p.name = 'Malware/Excessive Startup Apps';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.8 FROM Symptoms s, Problems p
WHERE s.name = 'Blue screen (BSOD)' AND p.name = 'Outdated Drivers';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.7 FROM Symptoms s, Problems p
WHERE s.name = 'Blue screen (BSOD)' AND p.name = 'Failing Hard Drive / SSD';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.85 FROM Symptoms s, Problems p
WHERE s.name = 'Overheating' AND p.name = 'Overheating / Thermal Throttling';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.8 FROM Symptoms s, Problems p
WHERE s.name = 'No display' AND p.name = 'GPU/Display Issue';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.75 FROM Symptoms s, Problems p
WHERE s.name = 'No internet' AND p.name = 'Network Adapter Issue';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.7 FROM Symptoms s, Problems p
WHERE s.name = 'Random restarts' AND p.name = 'Outdated Drivers';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.65 FROM Symptoms s, Problems p
WHERE s.name = 'Random restarts' AND p.name = 'Faulty Power Supply';

INSERT INTO ProblemSymptoms (symptom_id, problem_id, likelihood)
SELECT s.id, p.id, 0.7 FROM Symptoms s, Problems p
WHERE s.name = 'No sound' AND p.name = 'Outdated Drivers';


