import { gql } from 'apollo-boost';

// TEST QUERY
const visitorsV2 = gql`query ($pageNo: Int!, $size:Int!, $startDate:  String!,  $filter: String!){
  visitors(pageNo: $pageNo, size: $size, startDate: $startDate,  filter: $filter){
    visits {
      _id
      ipAddress
      device
      createdAt
    }
    totalPage
    currentPage
  }
}`;

// TEST MUTATION
const visitors = gql`mutation ($pageNo: Int!, $size:Int!, $startDate:  String!,  $filter: String!){
  visitorsV2(pageNo: $pageNo, size: $size, startDate: $startDate,  filter: $filter){
    visits {
      _id
      ipAddress
      device
      createdAt
    }
    totalPage
    currentPage
  }
}`;

const createVisit = gql`mutation ($ip:  String!,  $device: String!){
  createVisit(ip:$ip, device: $device){
    _id
    ipAddress
    device
    createdAt
    updatedAt
  }
}`;


export { visitors, createVisit, visitorsV2};
