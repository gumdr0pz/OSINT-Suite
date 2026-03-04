import { parsePhoneNumberWithError, isValidPhoneNumber } from 'libphonenumber-js';

export async function checkPhone(number: string) {
  try {
    const phoneNumber = parsePhoneNumberWithError(number);
    const isValid = isValidPhoneNumber(number);
    
    return {
      isValid,
      country: phoneNumber.country,
      countryCallingCode: phoneNumber.countryCallingCode,
      nationalNumber: phoneNumber.nationalNumber,
      formatInternational: phoneNumber.formatInternational(),
      formatNational: phoneNumber.formatNational(),
      uri: phoneNumber.getURI(),
      type: phoneNumber.getType()
    };
  } catch (error: any) {
    throw new Error('Phone number validation failed: ' + error.message);
  }
}
