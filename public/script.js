document.getElementById('tickerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const tickerId = document.getElementById('tickerId').value;
  
    try {
      const response = await fetch(`/ticker?id=${tickerId}`);
      const data = await response.json();
  
      if (response.ok) {
        document.getElementById('result').innerHTML = `
          <p><strong>Symbol:</strong> ${data.symbol}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Price (USD):</strong> ${data.price_usd}</p>
          <p><strong>Percent Change (1h):</strong> ${data.percent_change_1h}</p>
        `;
      } else {
        document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
      }
    } catch (error) {
      document.getElementById('result').innerHTML = `<p>Error fetching data</p>`;
    }
  });
  