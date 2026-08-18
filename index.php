<?php
// PHP Reverse Proxy for Apache XAMPP to Next.js
$requestUri = $_SERVER['REQUEST_URI'];

// Ensure target URI starts with /portfolio
if (strpos($requestUri, '/portfolio') !== 0) {
    $requestUri = '/portfolio' . $requestUri;
}

$targetUrl = 'http://localhost:3000' . $requestUri;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);

// Forward all incoming HTTP headers (cookies, user-agent, content-type, authorization)
$headers = array();
if (function_exists('getallheaders')) {
    foreach (getallheaders() as $key => $value) {
        if (strtolower($key) !== 'host') {
            $headers[] = "$key: $value";
        }
    }
} else {
    foreach ($_SERVER as $key => $value) {
        if (substr($key, 0, 5) === 'HTTP_') {
            $headerKey = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
            if (strtolower($headerKey) !== 'host') {
                $headers[] = "$headerKey: $value";
            }
        }
    }
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Forward HTTP method and payload body
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
} elseif ($method === 'PUT') {
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
} elseif ($method === 'DELETE') {
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
}

$response = curl_exec($ch);

if ($response === false) {
    http_response_code(502);
    echo '<!DOCTYPE html><html><head><title>Portfolio Gateway Error</title><style>body{background:#090d16;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}.card{background:#111827;padding:2rem;border-radius:1rem;border:1px solid #374151;max-width:500px;text-align:center;}h1{color:#f43f5e;margin-top:0;}code{background:#1f2937;padding:0.2rem 0.5rem;border-radius:0.25rem;color:#06b6d4;}</style></head><body><div class="card"><h1>502 Bad Gateway</h1><p>The Next.js server is starting or offline on port 3000.</p><p>Please ensure <code>npm run dev</code> is running in <code>c:\xampp\htdocs\portfolio</code>.</p></div></body></html>';
    exit;
}

$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$headerContent = substr($response, 0, $headerSize);
$bodyContent = substr($response, $headerSize);

http_response_code($httpCode);

$headerLines = explode("\r\n", $headerContent);
foreach ($headerLines as $line) {
    if (!empty($line) && strpos($line, 'HTTP/') !== 0 && strpos(strtolower($line), 'transfer-encoding:') !== 0) {
        header($line);
    }
}

echo $bodyContent;
