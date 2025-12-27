-- Import HR Flashcards
-- User ID: 12439635-0b75-466d-bd9a-f2e98dcc3756
-- Subject ID (HR): f1c31287-e2d3-4981-ae57-717a34d7551c

INSERT INTO cards (user_id, subject_id, front, back, card_type, tags) VALUES
-- Motivation - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was ist der Unterschied zwischen intrinsischer und extrinsischer Motivation?',
'Intrinsische Motivation kommt von innen (z.B. Freude an der Arbeit selbst, persönliches Interesse). Extrinsische Motivation kommt von außen (z.B. Gehalt, Boni, Anerkennung).',
'basic', ARRAY['motivation', 'grundlagen']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Nenne die 5 Ebenen der Maslowschen Bedürfnispyramide (von unten nach oben)',
'1. Physiologische Bedürfnisse (Hunger, Durst)
2. Sicherheitsbedürfnisse (Schutz, Stabilität)
3. Soziale Bedürfnisse (Zugehörigkeit, Liebe)
4. Wertschätzungsbedürfnisse (Anerkennung, Status)
5. Selbstverwirklichung (persönliches Wachstum)',
'basic', ARRAY['motivation', 'maslow', 'theorie']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Wie viele Basic Desires umfasst das Reiss Profile?',
'16 grundlegende Bedürfnisse (Basic Desires)',
'basic', ARRAY['motivation', 'reiss-profile']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Nenne mindestens 8 der 16 Basic Desires aus dem Reiss Profile',
'1. Power (Macht/Einfluss)
2. Independence (Unabhängigkeit)
3. Curiosity (Neugier)
4. Acceptance (Akzeptanz)
5. Order (Ordnung)
6. Saving (Sammeln)
7. Honor (Ehre/Loyalität)
8. Idealism (Idealismus)
9. Social contact (Sozialer Kontakt)
10. Family (Familie)
11. Status
12. Vengeance (Vergeltung/Wettbewerb)
13. Beauty (Schönheit)
14. Eating (Essen)
15. Physical Activity (Körperliche Aktivität)
16. Tranquility (Ruhe)',
'basic', ARRAY['motivation', 'reiss-profile']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was besagt die Equity Theory (Adams)?',
'Menschen vergleichen ihr Input/Output-Verhältnis mit dem anderer. Bei wahrgenommener Ungerechtigkeit (Inequity) entsteht Demotivation. Wichtig: Es geht um subjektive Wahrnehmung, nicht objektive Fairness.',
'basic', ARRAY['motivation', 'equity-theory', 'theorie']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was bedeutet ''Flow'' nach Czikszentmihalyi?',
'Flow ist ein optimaler Erlebniszustand, bei dem die Herausforderung perfekt zu den eigenen Fähigkeiten passt. Man ist vollständig in die Aufgabe vertieft, Zeit wird anders wahrgenommen, und es entsteht intrinsische Motivation.',
'basic', ARRAY['motivation', 'flow', 'theorie']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was sind die 4 Elemente des Ikigai-Konzepts?',
'1. What you LOVE (Passion)
2. What the world NEEDS (Mission)
3. What you can be PAID for (Profession)
4. What you are GOOD at (Vocation)

Ikigai ist die Schnittmenge aller vier Bereiche.',
'basic', ARRAY['motivation', 'ikigai', 'theorie']),

-- Cognitive Biases - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was ist Confirmation Bias?',
'Die Tendenz, Informationen so zu suchen, zu interpretieren und zu gewichten, dass sie die eigenen Vorannahmen bestätigen. Man überbetont Evidenz, die zur bevorzugten Überzeugung passt.',
'basic', ARRAY['bias', 'kognitive-verzerrung']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was ist Availability Bias?',
'Die Tendenz, die Wahrscheinlichkeit von Ereignissen anhand leicht verfügbarer Beispiele zu beurteilen. Leicht erinnerbare oder emotional einprägsame Fälle werden als häufiger eingeschätzt als sie tatsächlich sind.',
'basic', ARRAY['bias', 'kognitive-verzerrung']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was ist der Fundamental Attribution Error?',
'Die Tendenz, das Verhalten anderer Personen auf deren Persönlichkeit/Charakter zurückzuführen (dispositional), während situative Faktoren unterschätzt werden. Bei eigenem Verhalten wird hingegen die Situation als Erklärung bevorzugt.',
'basic', ARRAY['bias', 'kognitive-verzerrung']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was ist der Halo Effect?',
'Die Tendenz, eine Person oder Sache aufgrund eines einzelnen positiven Merkmals (z.B. Erfolgsgeschichte, Attraktivität) insgesamt positiver zu bewerten. Ein Merkmal überstrahlt (Halo = Heiligenschein) andere Eigenschaften.',
'basic', ARRAY['bias', 'kognitive-verzerrung', 'halo-effect']),

-- Organization - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Nenne die 3 klassischen Organisationsformen (Archetypes)',
'1. Functional Organization (funktionale Organisation nach Aufgaben)
2. Divisional Organization (Spartenorganisation nach Produkten/Regionen)
3. Matrix Organization (Kombination aus funktional und divisional)',
'basic', ARRAY['organisation', 'strukturen']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was sind die Vor- und Nachteile der Matrix-Organisation?',
'Vorteile: Flexibilität, bessere Ressourcennutzung, Wissensaustausch
Nachteile: Komplexe Kommunikation, doppelte Unterstellung, Konflikpotenzial, hoher Koordinationsaufwand',
'basic', ARRAY['organisation', 'matrix']),

-- Teamwork - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Nenne die 4 Phasen des Tuckman Team Development Models',
'1. Forming (Orientierung, höflich)
2. Storming (Konflikt, Machtkämpfe)
3. Norming (Regeln werden etabliert, Zusammenarbeit)
4. Performing (Hohe Leistung, effektive Zusammenarbeit)

(Optional: 5. Adjourning = Auflösung)',
'basic', ARRAY['teamwork', 'team-entwicklung', 'tuckman']),

-- Leadership - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was sind die 4 Leadership-Stile nach Hersey & Blanchard?',
'1. Directing (S1): Hohe Aufgaben-, niedrige Beziehungsorientierung
2. Coaching (S2): Hohe Aufgaben- UND Beziehungsorientierung
3. Supporting (S3): Niedrige Aufgaben-, hohe Beziehungsorientierung
4. Delegating (S4): Niedrige Aufgaben- UND Beziehungsorientierung

Wird angepasst an Reifegrad der Mitarbeiter.',
'basic', ARRAY['leadership', 'hersey-blanchard']),

-- Change Management - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Nenne die 8 Schritte von Kotter''s Change Management Model',
'1. Create urgency (Dringlichkeit)
2. Form a powerful coalition (Führungskoalition)
3. Create a vision
4. Communicate the vision
5. Empower action (Hindernisse beseitigen)
6. Create quick wins
7. Build on the change (Erfolge konsolidieren)
8. Anchor the changes (Verankerung in Kultur)',
'basic', ARRAY['change-management', 'kotter']),

-- Diversity & Inclusion - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was ist der Unterschied zwischen Diversity und Inclusion?',
'Diversity = Vielfalt der Menschen (demografische Unterschiede wie Alter, Geschlecht, Herkunft)
Inclusion = Das aktive Einbeziehen und Wertschätzen dieser Vielfalt, sodass alle ihr Potenzial entfalten können

Metapher: ''Diversity is being invited to the party, Inclusion is being asked to dance''',
'basic', ARRAY['diversity', 'inclusion']),

-- Strategy - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Welche Faktoren umfasst die PESTEL-Analyse?',
'P - Political (politische Faktoren)
E - Economic (wirtschaftliche Faktoren)
S - Social (soziale/kulturelle Faktoren)
T - Technological (technologische Faktoren)
E - Environmental (ökologische Faktoren)
L - Legal (rechtliche Faktoren)',
'basic', ARRAY['strategie', 'pestel', 'analyse']),

-- Recruiting - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Was sind die Hauptziele des Recruiting-Prozesses?',
'1. Die richtigen Kandidaten finden (Right Fit)
2. Ausreichend qualifizierte Bewerber anziehen
3. Positive Candidate Experience schaffen
4. Kosten und Zeit minimieren
5. Employer Branding stärken',
'basic', ARRAY['recruiting', 'personalplanung']),

-- Cross-Cultural Management - Basic Cards
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Nenne 4 wichtige Aspekte der Cross-Cultural Management',
'1. Cultural Awareness (Bewusstsein für kulturelle Unterschiede)
2. Hofstede''s Cultural Dimensions (z.B. Power Distance, Individualism)
3. Kommunikationsstile (high-context vs. low-context)
4. Umgang mit Zeit (monochronisch vs. polychronisch)',
'basic', ARRAY['cross-cultural', 'international']);

-- Multiple Choice Cards
INSERT INTO cards (user_id, subject_id, front, back, card_type, options, correct_option, tags) VALUES
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Welche Motivation-Theorie erklärt: ''Menschen sind demotiviert, wenn sie ihre Belohnung im Vergleich zu anderen als unfair empfinden''?',
'Equity Theory (Adams)',
'multiple_choice',
'["Maslow''s Hierarchy", "Equity Theory (Adams)", "Herzberg''s Two-Factor Theory", "Expectancy Theory (Vroom)"]',
1,
ARRAY['motivation', 'theorie', 'quiz']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Welcher Bias führt dazu, dass ein Manager einen Mitarbeiter aufgrund einer guten Präsentation insgesamt als kompetent bewertet?',
'Halo Effect',
'multiple_choice',
'["Confirmation Bias", "Halo Effect", "Availability Bias", "Anchoring Bias"]',
1,
ARRAY['bias', 'quiz']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'In welcher Phase des Tuckman-Modells entstehen typischerweise Konflikte und Machtkämpfe im Team?',
'Storming',
'multiple_choice',
'["Forming", "Storming", "Norming", "Performing"]',
1,
ARRAY['teamwork', 'tuckman', 'quiz']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Welche Organisationsform kombiniert funktionale und divisionale Strukturen?',
'Matrix Organization',
'multiple_choice',
'["Functional Organization", "Divisional Organization", "Matrix Organization", "Holding Organization"]',
2,
ARRAY['organisation', 'quiz']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Wie viele Schritte umfasst Kotter''s Change Management Model?',
'8 Schritte',
'multiple_choice',
'["5 Schritte", "6 Schritte", "8 Schritte", "10 Schritte"]',
2,
ARRAY['change-management', 'kotter', 'quiz']);

-- Cloze (Lückentext) Cards
INSERT INTO cards (user_id, subject_id, front, back, card_type, tags) VALUES
('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Das Reiss Profile identifiziert ___ grundlegende menschliche Bedürfnisse (Basic Desires).',
'16',
'cloze',
ARRAY['motivation', 'reiss-profile', 'lueckentext']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Die ___ Theory besagt, dass Menschen ihr Input/Output-Verhältnis mit anderen vergleichen.',
'Equity',
'cloze',
ARRAY['motivation', 'theorie', 'lueckentext']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Der ___ Bias beschreibt die Tendenz, nur nach Informationen zu suchen, die die eigene Meinung bestätigen.',
'Confirmation',
'cloze',
ARRAY['bias', 'lueckentext']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'In der ___ Phase des Tuckman-Modells arbeitet das Team auf höchstem Leistungsniveau.',
'Performing',
'cloze',
ARRAY['teamwork', 'tuckman', 'lueckentext']),

('12439635-0b75-466d-bd9a-f2e98dcc3756', 'f1c31287-e2d3-4981-ae57-717a34d7551c',
'Ikigai besteht aus ___ Elementen: what you love, what you''re good at, what the world needs, und what you can be paid for.',
'4',
'cloze',
ARRAY['motivation', 'ikigai', 'lueckentext']);
