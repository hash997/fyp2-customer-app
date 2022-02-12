export const onOfferCreated = /* GraphQL */ `
  subscription onOfferCreated($customerId: ID!) {
    onOfferCreated(customerId: $customerId) {
      id
      jobId
      customerId
      workerId
      sentAt
      price
      status
      suggestedTime
      jobRequest {
        city
        completedAt
        customerId
        description
        id
        speciality
        sentAt
        status
        title
        totalCost
      }
    }
  }
`;

export const onJobUpdated = /* GraphQL */ `
  subscription onJobUpdated($customerId: ID!) {
    onJobUpdated(customerId: $customerId) {
      id
      customerId
      location {
        id
        customerId
        lng
        lat
        state
        city
        address
      }
      city
      status
      title
      description
      totalCost
      offers {
        id
        customerId
        workerId
        jobId
        price
        sentAt
        status
      }
      sentAt
      completedAt
    }
  }
`;
