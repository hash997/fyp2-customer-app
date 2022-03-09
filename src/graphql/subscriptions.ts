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
        preferedTime
      }
    }
  }
`;

export const onJobToWorkerUpdated = /* GraphQL */ `
  subscription onJobToWorkerUpdated($customerId: ID!) {
    onJobToWorkerUpdated(customerId: $customerId) {
      id
      customerId
      workerId
      # location {
      #   id
      #   customerId
      #   lng
      #   lat
      #   state
      #   city
      #   address
      # }
      # city
      status
      title
      description
    }
  }
`;
