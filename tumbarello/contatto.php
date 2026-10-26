<?php
// Richiesta di richiamata dal sito Gruppo T. Riceve nome, telefono, argomento e manda una email allo studio.
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }
if (!empty($_POST['sito'])) { echo '{"ok":true}'; exit; } // campo trappola per i bot
$clean = function ($v, $max) { return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', strip_tags((string)$v))), 0, $max); };
$nome   = $clean($_POST['nome'] ?? '', 100);
$tel    = $clean(preg_replace('/[^0-9+ ().-]/', '', $_POST['telefono'] ?? ''), 30);
$motivo = $clean($_POST['motivo'] ?? '', 80);
if ($nome === '' || strlen(preg_replace('/\D/', '', $tel)) < 6) { http_response_code(422); echo '{"ok":false}'; exit; }
if (!empty($_POST['prova'])) { echo '{"ok":true,"prova":true}'; exit; } // verifica tecnica senza invio
$to      = 'gianlucatumbarello@gruppot.com';
$host    = preg_replace('/[^a-z0-9.-]/i', '', $_SERVER['SERVER_NAME'] ?? 'localhost');
$subject = '=?UTF-8?B?' . base64_encode('Richiamata dal sito: ' . $nome) . '?=';
$body    = "Richiesta di richiamata dal sito\n\nNome: $nome\nTelefono: $tel\nArgomento: $motivo\n\nInviata il " . date('d/m/Y H:i') . "\n";
$headers = "From: Sito Gruppo T <noreply@$host>\r\nContent-Type: text/plain; charset=UTF-8";
echo json_encode(['ok' => (bool)mail($to, $subject, $body, $headers)]);
