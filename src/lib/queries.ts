export const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  descriptionHtml
  shippingMetafield: metafield(namespace: "custom", key: "shipping_and_returns") {
    value
  }
  careMetafield: metafield(namespace: "custom", key: "care_instructions") {
    value
  }
  testimonialsMetafield: metafield(namespace: "custom", key: "testimonials") {
    value
  }
  sizeChartMetafield: metafield(namespace: "custom", key: "size_chart") {
    value
  }
  fabricMetafield: metafield(namespace: "custom", key: "fabric_details") {
    value
  }
  tags
  featuredImage {
    url(transform: {maxWidth: 1000, preferredContentType: WEBP})
    altText
  }
  images(first: 5) {
    edges {
      node {
        url(transform: {maxWidth: 1000, preferredContentType: WEBP})
        altText
      }
    }
  }
  options {
    name
    values
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  variants(first: 10) {
    edges {
      node {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  availableForSale
`;

export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`;

export const GET_COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url(transform: {maxWidth: 600, preferredContentType: WEBP})
            altText
          }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

export const NEWSLETTER_SIGNUP_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        acceptsMarketing
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const GET_PRODUCTS_BY_COLLECTION_QUERY = `
  query getCollectionByHandle($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: $first) {
        edges {
          node {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = `
  query searchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

export const GET_NEW_ARRIVALS_QUERY = `
  query getNewArrivals($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

export const GET_STORE_TESTIMONIALS_QUERY = `
  query getStoreTestimonials {
    metaobjects(type: "testimonial", first: 10) {
      edges {
        node {
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_BEST_SELLERS_QUERY = `
  query getBestSellers($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING, reverse: false) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

export const GET_PRODUCT_RECOMMENDATIONS_QUERY = `
  query productRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ${PRODUCT_FIELDS}
    }
  }
`;
