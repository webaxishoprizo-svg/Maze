import { storefrontClient } from '../lib/storefront';

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export async function createCustomer(email, password, firstName, lastName) {
    try {
        const data = await storefrontClient.request(CUSTOMER_CREATE_MUTATION, {
            input: {
                email,
                password,
                firstName,
                lastName,
            },
        });
        return data.customerCreate;
    } catch (error) {
        console.error('createCustomer error:', error);
        throw error;
    }
}
