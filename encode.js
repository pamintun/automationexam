import { faker } from '@faker-js/faker';
import axios from 'axios';

function generateEncodedDataLink(studioId , dynamicData){
    const jsonData = JSON.stringify(dynamicData);
    const base64Encoded = Buffer.from(jsonData).toString('base64');
  
    const baseUrl = 'https://www.sit.orangetheory.com/en-us/membership-agreement';
    const testUrl = `${baseUrl}?studioid=${studioId}&data=${base64Encoded}`;
  
    return testUrl;
  }
  
  // Example usage:
  const studioId = faker.string.uuid(); // Dynamically generate studio ID (or choose from a pool if needed)
  
  const dynamicPayload = {
    person_id: faker.string.uuid(),
    member_email: "Tester"+faker.internet.email({provider: 'outliant.com'}),
    member_first_name: faker.person.firstName()+"Tester",
    member_last_name: faker.person.lastName() +"Tester",
    member_phone_number: faker.phone.number('###-###-####').replace(/-/g, ''),
    studio_id: studioId,
    mbo_studio_id: faker.number.int({ min: 1000000, max: 9999999 }).toString(),
    mbo_client_id: faker.number.int({ min: 10000, max: 99999 }).toString(),
    mbo_contract_id: faker.number.int({ min: 1000, max: 9999 }).toString(),
    mbo_client_contract_id: faker.number.int({ min: 1000, max: 9999 }).toString(),
    member_street_address: faker.location.streetAddress(),
    member_city: 'Boston',
    member_state: 'MA',
    member_zip: faker.location.zipCode('#####'),
    credit_card_last4: faker.finance.creditCardNumber().slice(-4),
    credit_card_type: 'DISCOVER',
    product_name: 'Online Elite Family Membership',
    product_type: 'Membership',
    product_category: 'Elite',
    has_promotion: true,
    add_on: {
      type: 'FAMILY',
      value: faker.person.fullName()
    },
    check_id: true,
    contract_start_date: faker.date.future({ years: 5 }).toISOString().split('T')[0] + 'T00:00:00'
  };

  console.log(dynamicPayload)

  const testLink = generateEncodedDataLink(studioId, dynamicPayload);
  console.log(testLink);

  async function validatePayload(encoded) {
    const response = await axios.fetch(
      'https://api.dev.orangetheory.io/v1/courier/document/ic/validate',
      { data: encoded },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  
    console.log(response.data);
  }

  validatePayload(testLink)