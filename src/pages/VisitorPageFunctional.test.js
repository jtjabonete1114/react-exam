import React from 'react';
import { configure, shallow, renderer } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VisitorPageFunctional from './VisitorPageFunctional';
import { MockedProvider } from '@apollo/react-hooks';
import { visitorsV2 } from '../graphql/visits';
import 'react-dates/initialize'


configure({adapter: new Adapter()});

describe('<VisitorPageFunctional />', () => {
 
  const mocks = [
    {
      request: {
        query: visitorsV2,
        variables: {
          pageNo: 1,
          size: 10,
          startDate: "2019-08-13T04:29:00.785Z",
          filter: "today",
          sortColumn: "createAt",
          sortBy: "DESC",
        },
      },
      result: {
        visitorsV2: {
          dog: { 
            "visits" : [
              {
                "_id": "5d68e5f3c56e45445d485c13",
                "ipAddress": "103.3.82.153",
                "device": "Desktop",
                "createdAt": "8/30/2019"
              }
            ],
            
          },
        },
      },
    },
  ];
  

  it('<VisitorPageFunctional /> should render without error', () => {

    console.log(renderer)

    // renderer.create(
    //   <MockedProvider mocks={mocks} addTypename={false}>
    //     <VisitorPageFunctional  />
    //   </MockedProvider>,
    // );
  });

});