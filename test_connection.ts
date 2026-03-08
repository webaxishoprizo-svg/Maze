const domain = 't3tk0h-fw.myshopify.com';
const token = 'f56449142a31220e0ff0df389910cf35';
const query = `
{
  products(first: 1) {
    edges {
      node {
        title
      }
    }
  }
}
`;

async function test() {
  try {
    const response = await fetch(
      `https://${domain}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      }
    );
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

test();
