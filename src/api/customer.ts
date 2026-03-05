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

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const GET_CUSTOMER_QUERY = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      acceptsMarketing
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

export async function createCustomerAccessToken(email, password) {
    try {
        const data = await storefrontClient.request(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
            input: {
                email,
                password,
            },
        });
        return data.customerAccessTokenCreate;
    } catch (error) {
        console.error('createCustomerAccessToken error:', error);
        throw error;
    }
}

export async function getCustomer(accessToken) {
    try {
        const data = await storefrontClient.request(GET_CUSTOMER_QUERY, {
            customerAccessToken: accessToken,
        });
        return data.customer;
    } catch (error) {
        console.error('getCustomer error:', error);
        return null;
    }
}
