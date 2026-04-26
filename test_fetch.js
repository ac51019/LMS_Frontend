const payload = { email: 'admin@gmail.com', password: 'admin123', role: 'ADMIN', loginType: 'EMAIL' };
fetch('http://localhost:8080/api/auth/multiple-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:3000' },
    body: JSON.stringify(payload)
})
    .then(async res => {
        const text = await res.text();
        console.log('Status:', res.status, '\nBody:', text, '\nCORS Origin:', res.headers.get('Access-Control-Allow-Origin'));
    })
    .catch(err => console.error('Fetch error:', err.message));
