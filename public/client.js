document.addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;

    const { action, method } = form;

    const formData = new FormData(form);
    const json = Object.fromEntries(
        formData.entries()
    );
    const body = JSON.stringify(json);
    
    const response = await fetch(action, {
        headers: { 'Content-Type': 'application/json' },
        method,
        body
    });

    const data = response.json();
});