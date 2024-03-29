/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      id
      fName
      lName
      email
      # phoneNo
      # postalZipCode
      # jobRequests {
      #   id
      #   customerId
      #   city
      #   status
      #   title
      #   description
      #   totalCost
      #   sentAt
      #   completedAt
      # }
      # appointments {
      #   id
      #   customerId
      #   workerId
      #   offerId
      #   time
      #   status
      # }
    }
  }
`;
export const createWorker = /* GraphQL */ `
  mutation CreateWorker($createWorkerInput: CreateWorkerInput!) {
    createWorker(createWorkerInput: $createWorkerInput) {
      id
      fName
      lName
      email
      icNo
      phoneNo
      speciality
      offers {
        id
        customerId
        workerId
        jobId
        price
        sentAt
        status
      }
      appointments {
        id
        customerId
        workerId
        offerId
        time
        status
      }
    }
  }
`;
export const createJobRequest = /* GraphQL */ `
  mutation CreateJobRequest($createJobRequestInput: CreateJobRequestInput!) {
    createJobRequest(createJobRequestInput: $createJobRequestInput) {
      id
      city
      completedAt
      customerId
      description

      location {
        address
        city
        customerId
        id
        lat
        lng
        state
      }
      offers {
        id
        customerId
        jobId
        price
        sentAt
        status
        suggestedTime
        workerId
      }
      sentAt
      speciality
      status
      totalCost
      title
      isUrgent
      preferedTime
    }
  }
`;

export const createJobRequestToWorker = /* GraphQL */ `
  mutation createJobRequestToWorker(
    $createJobRequestToWorkerInput: CreateJobRequestToWorkerInput!
  ) {
    createJobRequestToWorker(
      createJobRequestToWorkerInput: $createJobRequestToWorkerInput
    ) {
      id
      customerId
      workerId
      location {
        id
        customerId
        lng
        lat
        state
        city
        address
      }
      # city
      status
      title
      description
      time
    }
  }
`;
export const createOffer = /* GraphQL */ `
  mutation CreateOffer($createOfferInput: CreateOfferInput!) {
    createOffer(createOfferInput: $createOfferInput) {
      id
      customerId
      workerId
      jobId
      price
      sentAt
      status
    }
  }
`;

// mutation MyMutation {
//   createAppointment(createAppointmentInput: {status: UPCOMING, offerId: "", customerId: "", workerId: ""}) {
//     customerId
//     id
//     offerId
//     status
//     time
//     workerId
//     worker {
//       email
//       fName
//     }
//   }
// }

export const createAppointment = /* GraphQL */ `
  mutation createAppointment($createAppointmentInput: CreateAppointmentInput!) {
    createAppointment(createAppointmentInput: $createAppointmentInput) {
      customerId
      id
      offerId
      status
      time
      workerId
      worker {
        email
        fName
      }
    }
  }
`;

export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer($updateCustomerInput: UpdateCustomerInput!) {
    updateCustomer(updateCustomerInput: $updateCustomerInput) {
      id
      fName
      lName
      email
      phoneNo
      postalZipCode
      jobRequests {
        id
        customerId
        city
        status
        title
        description
        totalCost
        sentAt
        completedAt
      }
      appointments {
        id
        customerId
        workerId
        offerId
        time
        status
      }
    }
  }
`;
export const updateWorker = /* GraphQL */ `
  mutation UpdateWorker($updateWorkerInput: UpdateWorkerInput!) {
    updateWorker(updateWorkerInput: $updateWorkerInput) {
      id
      fName
      lName
      email
      icNo
      phoneNo
      speciality
      offers {
        id
        customerId
        workerId
        jobId
        price
        sentAt
        status
      }
      appointments {
        id
        customerId
        workerId
        offerId
        time
        status
      }
    }
  }
`;
export const updateJobRequest = /* GraphQL */ `
  mutation UpdateJobRequest($updateJobRequestInput: UpdateJobRequestInput!) {
    updateJobRequest(updateJobRequestInput: $updateJobRequestInput) {
      id
      customerId
      preferedTime
      isUrgent
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
export const updateOffer = /* GraphQL */ `
  mutation UpdateOffer($updateOfferInput: UpdateOfferInput!) {
    updateOffer(updateOfferInput: $updateOfferInput) {
      id
      customerId
      workerId
      jobId
      price
      sentAt
      status
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
      fName
      lName
      email
      phoneNo
      postalZipCode
      jobRequests {
        id
        customerId
        city
        status
        title
        description
        totalCost
        sentAt
        completedAt
      }
      appointments {
        id
        customerId
        workerId
        offerId
        time
        status
      }
    }
  }
`;
export const deleteWorker = /* GraphQL */ `
  mutation DeleteWorker($id: ID!) {
    deleteWorker(id: $id) {
      id
      fName
      lName
      email
      icNo
      phoneNo
      speciality
      offers {
        id
        customerId
        workerId
        jobId
        price
        sentAt
        status
      }
      appointments {
        id
        customerId
        workerId
        offerId
        time
        status
      }
    }
  }
`;
export const deleteJobRequest = /* GraphQL */ `
  mutation DeleteJobRequest($id: ID!) {
    deleteJobRequest(id: $id) {
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
export const deleteOffer = /* GraphQL */ `
  mutation DeleteOffer($id: ID!) {
    deleteOffer(id: $id) {
      id
      customerId
      workerId
      jobId
      price
      sentAt
      status
    }
  }
`;
